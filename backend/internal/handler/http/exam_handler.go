package http

import (
	"driving-exam/internal/domain"
	"driving-exam/internal/service"
	"encoding/json"
	"net/http"
	"time"
)

// ExamHandler handles HTTP requests for exams
type ExamHandler struct {
	examService *service.ExamService
}

// NewExamHandler creates a new exam handler
func NewExamHandler(examService *service.ExamService) *ExamHandler {
	return &ExamHandler{
		examService: examService,
	}
}

// StartExam handles the exam start request
func (h *ExamHandler) StartExam(w http.ResponseWriter, r *http.Request) {
	exam := h.examService.GetExam()
	
	// Set response headers
	w.Header().Set("Content-Type", "application/json")
	
	// Return the exam
	if err := json.NewEncoder(w).Encode(exam); err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
}

// SubmitExam handles the exam submission
func (h *ExamHandler) SubmitExam(w http.ResponseWriter, r *http.Request) {
	var submission domain.ExamSubmission
	if err := json.NewDecoder(r.Body).Decode(&submission); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Get the exam
	exam := h.examService.GetExam()
	
	// Set submission time if not set
	if submission.SubmitTime == 0 {
		submission.SubmitTime = time.Now().Unix()
	}

	// Calculate result
	result := h.examService.CalculateResult(exam, &submission)

	// Set response headers
	w.Header().Set("Content-Type", "application/json")
	
	// Return the result
	if err := json.NewEncoder(w).Encode(result); err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
} 