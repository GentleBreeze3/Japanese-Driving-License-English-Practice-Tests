package service

import (
	"driving-exam/internal/domain"
)

// ExamService handles the business logic for exams
type ExamService struct {
	// In the future, we might add a repository here for persistence
}

// NewExamService creates a new exam service
func NewExamService() *ExamService {
	return &ExamService{}
}

// GetExam returns a new exam with questions
func (s *ExamService) GetExam() *domain.Exam {
	// TODO: In the future, this could load questions from a database
	return &domain.Exam{
		ID:          "japanese-driving-exam",
		TimeLimit:   30, // 30 minutes
		TotalScore:  100,
		PassingScore: 70,
		Questions:   getSampleQuestions(),
	}
}

// CalculateResult calculates the exam result based on submission
func (s *ExamService) CalculateResult(exam *domain.Exam, submission *domain.ExamSubmission) *domain.ExamResult {
	correctAnswers := 0
	wrongAnswers := []int{}

	for _, question := range exam.Questions {
		if answer, exists := submission.Answers[question.ID]; exists {
			if answer == question.CorrectAnswer {
				correctAnswers++
			} else {
				wrongAnswers = append(wrongAnswers, question.ID)
			}
		}
	}

	score := float64(correctAnswers) / float64(len(exam.Questions)) * 100
	timeTaken := submission.SubmitTime - submission.StartTime

	return &domain.ExamResult{
		ExamID:         exam.ID,
		TotalQuestions: len(exam.Questions),
		CorrectAnswers: correctAnswers,
		Score:          score,
		Passed:         score >= float64(exam.PassingScore),
		WrongAnswers:   wrongAnswers,
		TimeTaken:      timeTaken,
	}
}

// getSampleQuestions returns a list of sample questions
func getSampleQuestions() []domain.Question {
	return []domain.Question{
		{
			ID:      1,
			Text:    "What does a red traffic light mean?",
			Options: []string{"Stop", "Go", "Proceed with caution", "Speed up"},
			CorrectAnswer: 0,
		},
		{
			ID:      2,
			Text:    "What is the speed limit in residential areas?",
			Options: []string{"30 km/h", "40 km/h", "50 km/h", "60 km/h"},
			CorrectAnswer: 2,
		},
		// Add more sample questions here
	}
} 