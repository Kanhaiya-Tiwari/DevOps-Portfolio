package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"your_project/backend/db"
	"your_project/backend/email"
	"your_project/backend/models"

	"github.com/gorilla/mux"
)

func RegisterContactRoutes(r *mux.Router) {
	r.HandleFunc("/contact", CreateContact).Methods("POST")
}

func CreateContact(w http.ResponseWriter, r *http.Request) {
	var contact models.Contact
	if err := json.NewDecoder(r.Body).Decode(&contact); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Save contact to database
	err := db.DB.QueryRow(
		"INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id",
		contact.Name, contact.Email, contact.Message,
	).Scan(&contact.ID)
	if err != nil {
		http.Error(w, "Database error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Send email notification
	adminEmail := os.Getenv("ADMIN_EMAIL")
	if adminEmail == "" {
		http.Error(w, "ADMIN_EMAIL environment variable not set", http.StatusInternalServerError)
		return
	}

	subject := fmt.Sprintf("New Contact Form Submission from %s", contact.Name)
	body := fmt.Sprintf(`
		<html>
		<body>
			<h2>New Contact Form Submission</h2>
			<p><strong>Name:</strong> %s</p>
			<p><strong>Email:</strong> %s</p>
			<p><strong>Message:</strong></p>
			<p>%s</p>
		</body>
		</html>
	`, contact.Name, contact.Email, contact.Message)

	if err := email.SendEmail(adminEmail, subject, body); err != nil {
		// Log the error but still return success to the user if DB save was successful
		fmt.Printf("Failed to send email: %v\n", err)
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Message sent successfully!"})
}
