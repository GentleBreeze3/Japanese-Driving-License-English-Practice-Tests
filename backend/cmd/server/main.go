package main

import (
	exanthandler "driving-exam/internal/handler/http"
	"driving-exam/internal/service"
	"log"
	"net/http"
	"time"
)

func main() {
	// Create services
	examService := service.NewExamService()

	// Create handlers
	examHandler := exanthandler.NewExamHandler(examService)

	// Create a new mux router
	mux := http.NewServeMux()

	// Add routes
	mux.HandleFunc("/api/exam/start", examHandler.StartExam)
	mux.HandleFunc("/api/exam/submit", examHandler.SubmitExam)

	// Configure server
	server := &http.Server{
		Addr:         ":8080",
		Handler:      mux,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	// Start server
	log.Printf("Server starting on port 8080")
	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
