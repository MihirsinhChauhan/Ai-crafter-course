package models

import "time"

type Task struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Priority    string `json:"priority"`
	CategoryID  *int   `json:"categoryId"`
	IsComplete  bool   `json:"isComplete"`
	CreatedAt   string `json:"createdAt"`
}

// NewTask creates a new task with auto-generated timestamp
// ID will be set by the storage layer
func NewTask(title, description, priority string, categoryID *int) Task {
	return Task{
		Title:       title,
		Description: description,
		Priority:    priority,
		CategoryID:  categoryID,
		IsComplete:  false,
		CreatedAt:   time.Now().Format(time.RFC3339),
	}
}

// NewTaskWithID creates a new task with specified ID (used internally by storage)
func NewTaskWithID(id int, title, description, priority string, categoryID *int, isComplete bool, createdAt string) Task {
	return Task{
		ID:          id,
		Title:       title,
		Description: description,
		Priority:    priority,
		CategoryID:  categoryID,
		IsComplete:  isComplete,
		CreatedAt:   createdAt,
	}
}