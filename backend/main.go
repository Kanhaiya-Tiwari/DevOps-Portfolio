package main

import (
	"log"
	"net/http"

	"your_project/backend/db"
	"your_project/backend/routes"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	// In containers, env vars are injected directly; .env is optional.
	if err := godotenv.Load(); err != nil {
		log.Printf("No .env file loaded, using environment variables: %v", err)
	}

	db.InitDB()
	r := mux.NewRouter()
	routes.RegisterContactRoutes(r)
	routes.RegisterAssistantRoutes(r)
	routes.RegisterDevOpsRoutes(r)
	// CORS middleware
	handler := func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			if req.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}
			h.ServeHTTP(w, req)
		})
	}
	log.Println("Server started at :8080")
	if err := http.ListenAndServe(":8080", handler(r)); err != nil {
		log.Fatal(err)
	}
}
