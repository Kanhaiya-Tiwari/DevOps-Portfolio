package routes

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gorilla/mux"
)

type assistantRequest struct {
	Page     string `json:"page"`
	Question string `json:"question"`
}

type geminiTextPart struct {
	Text string `json:"text"`
}

type geminiContent struct {
	Parts []geminiTextPart `json:"parts"`
}

type geminiCandidate struct {
	Content geminiContent `json:"content"`
}

type geminiResponse struct {
	Candidates []geminiCandidate `json:"candidates"`
}

func RegisterAssistantRoutes(r *mux.Router) {
	r.HandleFunc("/assistant", AssistantSuggestion).Methods("POST")
	r.HandleFunc("/assistant/stream", AssistantSuggestionStream).Methods("POST")
}

func AssistantSuggestion(w http.ResponseWriter, r *http.Request) {
	var req assistantRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	tip := fallbackResponse(req)
	if candidate, err := callGemini(r.Context(), buildPrompt(req)); err == nil && strings.TrimSpace(candidate) != "" {
		tip = candidate
	}

	json.NewEncoder(w).Encode(map[string]string{"tip": tip})
}

func AssistantSuggestionStream(w http.ResponseWriter, r *http.Request) {
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming unsupported", http.StatusInternalServerError)
		return
	}

	var req assistantRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	answer := fallbackResponse(req)
	if candidate, err := callGemini(r.Context(), buildPrompt(req)); err == nil && strings.TrimSpace(candidate) != "" {
		answer = candidate
	}

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	words := strings.Fields(answer)
	if len(words) == 0 {
		fmt.Fprint(w, "data: [DONE]\n\n")
		flusher.Flush()
		return
	}

	for i, token := range words {
		select {
		case <-r.Context().Done():
			return
		default:
		}

		chunk := token
		if i < len(words)-1 {
			chunk += " "
		}
		fmt.Fprintf(w, "data: %s\n\n", chunk)
		flusher.Flush()
		time.Sleep(38 * time.Millisecond)
	}

	fmt.Fprint(w, "data: [DONE]\n\n")
	flusher.Flush()
}

func callGemini(ctx context.Context, prompt string) (string, error) {
	apiKey := os.Getenv("GEMINI_API_KEY")
	if strings.TrimSpace(apiKey) == "" {
		return "", fmt.Errorf("missing GEMINI_API_KEY")
	}

	payload := map[string]any{
		"contents": []map[string]any{
			{
				"parts": []map[string]string{{"text": prompt}},
			},
		},
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}

	url := "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, url, bytes.NewBuffer(body))
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 8 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		return "", fmt.Errorf("gemini status %d", resp.StatusCode)
	}

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var gemini geminiResponse
	if err := json.Unmarshal(respBody, &gemini); err != nil {
		return "", err
	}

	if len(gemini.Candidates) > 0 && len(gemini.Candidates[0].Content.Parts) > 0 {
		return strings.TrimSpace(gemini.Candidates[0].Content.Parts[0].Text), nil
	}

	return "", fmt.Errorf("empty gemini response")
}

func buildPrompt(req assistantRequest) string {
	question := strings.TrimSpace(req.Question)
	if question == "" {
		return fmt.Sprintf("Give one short and friendly navigation tip (max 24 words) for a portfolio visitor on page '%s'. Keep it practical and professional.", req.Page)
	}

	return fmt.Sprintf(
		"You are the portfolio assistant for Kanhaiya Tiwari, a DevOps and Cloud Engineer. Answer the visitor question in 2-3 short sentences, professional and clear. If the question asks for unavailable details, say that politely and suggest using Contact. Visitor question: %s",
		question,
	)
}

func fallbackResponse(req assistantRequest) string {
	if strings.TrimSpace(req.Question) != "" {
		return fallbackResumeAnswer(req.Question)
	}

	return fallbackTip(req.Page)
}

func fallbackResumeAnswer(question string) string {
	q := strings.ToLower(question)

	if strings.Contains(q, "skill") || strings.Contains(q, "tech") {
		return "Kanhaiya focuses on DevOps and cloud skills, including Linux, containers, CI/CD, and infrastructure automation."
	}
	if strings.Contains(q, "experience") || strings.Contains(q, "intern") {
		return "You can review practical internship and project experience in the Experience and Projects sections for role-specific details."
	}
	if strings.Contains(q, "education") || strings.Contains(q, "study") || strings.Contains(q, "college") {
		return "Kanhaiya is a 4th year B.Tech Computer Science Engineering student at AKS University Satna."
	}
	if strings.Contains(q, "location") || strings.Contains(q, "where") {
		return "Kanhaiya is based in Jabalpur, India, and is open to professional opportunities and collaborations."
	}

	return "You can ask about skills, projects, experience, education, or contact details. For deeper discussion, please use the Contact page."
}

func fallbackTip(page string) string {
	switch page {
	case "/projects":
		return "Open project cards to compare technologies, then jump to Contact for collaboration."
	case "/skills":
		return "Use this page to highlight strengths, then open Summary for a quick recruiter-friendly recap."
	case "/contact":
		return "Use direct links or the form for quick outreach and next-step discussions."
	case "/experience":
		return "Expand each experience entry to review achievements and practical impact."
	default:
		return "Use the top menu or robot quick links to move across sections quickly."
	}
}
