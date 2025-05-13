package domain

// Question represents a single exam question
type Question struct {
	ID            int      `json:"id"`
	Text          string   `json:"text"`
	Options       []string `json:"options"`
	CorrectAnswer int      `json:"correctAnswer"`
	ImageURL      string   `json:"imageUrl,omitempty"`
}

// Exam represents a complete exam
type Exam struct {
	ID          string     `json:"id"`
	Questions   []Question `json:"questions"`
	TimeLimit   int        `json:"timeLimit"` // in minutes
	TotalScore  int        `json:"totalScore"`
	PassingScore int       `json:"passingScore"`
}

// ExamSubmission represents a user's exam submission
type ExamSubmission struct {
	ExamID     string         `json:"examId"`
	Answers    map[int]int    `json:"answers"` // questionID -> selectedOption
	StartTime  int64          `json:"startTime"`
	SubmitTime int64          `json:"submitTime"`
}

// ExamResult represents the result of an exam
type ExamResult struct {
	ExamID         string  `json:"examId"`
	TotalQuestions int     `json:"totalQuestions"`
	CorrectAnswers int     `json:"correctAnswers"`
	Score          float64 `json:"score"`
	Passed         bool    `json:"passed"`
	WrongAnswers   []int   `json:"wrongAnswers"` // IDs of questions answered incorrectly
	TimeTaken      int64   `json:"timeTaken"`    // in seconds
} 