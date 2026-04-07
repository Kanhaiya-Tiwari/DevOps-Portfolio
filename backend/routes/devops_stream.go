package routes

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

type devopsMetrics struct {
	Timestamp      string            `json:"timestamp"`
	PipelineStages map[string]string `json:"pipelineStages"`
	Cluster        clusterState      `json:"cluster"`
	Monitoring     monitoringState   `json:"monitoring"`
	Log            string            `json:"log"`
}

type clusterState struct {
	Pods        int `json:"pods"`
	ReadyPods   int `json:"readyPods"`
	Deployments int `json:"deployments"`
}

type monitoringState struct {
	CPU     float64 `json:"cpu"`
	Memory  float64 `json:"memory"`
	Latency float64 `json:"latency"`
	Error   float64 `json:"error"`
}

var wsUpgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func RegisterDevOpsRoutes(r *mux.Router) {
	r.HandleFunc("/devops/ws", DevOpsWebsocket)
}

func DevOpsWebsocket(w http.ResponseWriter, r *http.Request) {
	conn, err := wsUpgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}
	defer conn.Close()

	rng := rand.New(rand.NewSource(time.Now().UnixNano()))
	ticker := time.NewTicker(1200 * time.Millisecond)
	defer ticker.Stop()

	logs := []string{
		"[INFO] Rolling deployment started on cluster eu-prod-1",
		"[INFO] Terraform plan validated: +2 resources, ~1 change",
		"[WARN] Pod api-gateway-7f94 delayed readiness by 2.1s",
		"[INFO] GitHub Actions artifact uploaded successfully",
		"[INFO] Prometheus scrape completed for 24 targets",
		"[INFO] ALB healthy targets: 6/6",
		"[INFO] Canary release traffic split moved to 35%",
	}

	stages := []string{"queued", "running", "passed"}

	for {
		select {
		case <-r.Context().Done():
			return
		case <-ticker.C:
			payload := devopsMetrics{
				Timestamp: time.Now().Format(time.RFC3339),
				PipelineStages: map[string]string{
					"Build":  stages[(rng.Intn(100)+15)%len(stages)],
					"Test":   stages[(rng.Intn(100)+33)%len(stages)],
					"Scan":   stages[(rng.Intn(100)+52)%len(stages)],
					"Deploy": stages[(rng.Intn(100)+74)%len(stages)],
				},
				Cluster: clusterState{
					Pods:        18 + rng.Intn(6),
					ReadyPods:   16 + rng.Intn(7),
					Deployments: 7 + rng.Intn(3),
				},
				Monitoring: monitoringState{
					CPU:     42 + rng.Float64()*38,
					Memory:  48 + rng.Float64()*35,
					Latency: 140 + rng.Float64()*95,
					Error:   rng.Float64() * 2.1,
				},
				Log: logs[rng.Intn(len(logs))],
			}

			blob, err := json.Marshal(payload)
			if err != nil {
				continue
			}
			if err := conn.WriteMessage(websocket.TextMessage, blob); err != nil {
				return
			}
			if err := conn.WriteMessage(websocket.TextMessage, []byte(fmt.Sprintf("{\"heartbeat\":\"%d\"}", time.Now().UnixMilli()))); err != nil {
				return
			}
		}
	}
}
