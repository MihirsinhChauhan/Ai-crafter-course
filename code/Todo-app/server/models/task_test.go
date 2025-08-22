package models


import (
	"testing"
	// "time"
	"github.com/stretchr/testify/assert"
)


func TestNewTask(t *testing.T) {
	// Test creating a task with all fields
	t.Run("Test creating a task with all fields", func(t *testing.T) {
		
	categoryID := 1
	task := NewTask(1, "Learn Go", "Study Go programming", "HIGH", &categoryID, false, "2023-10-01T10:00:00Z")


	assert.Equal(t, "Learn Go", task.Title)
	assert.Equal(t, "Study Go programming", task.Description)
	assert.Equal(t, "HIGH", task.Priority)
	assert.Equal(t, &categoryID, task.CategoryID)
	assert.False(t, task.IsComplete)
	assert.NotEmpty(t, task.CreatedAt)
	})

	// Test creating a task without CategoryID
	t.Run("Test creating a task without CategoryID", func(t *testing.T) { // NewTask is a function, not a type.
		task := NewTask(2, "Read a book", "Read 'The Go Programming Language'", "MEDIUM", nil, false, "2023-10-02T15:30:00Z")

		assert.Equal(t, "Read a book", task.Title)
		assert.Equal(t, "Read 'The Go Programming Language'", task.Description)
		assert.Equal(t, "MEDIUM", task.Priority)
		assert.Nil(t, task.CategoryID)
		assert.False(t, task.IsComplete)
		assert.NotEmpty(t, task.CreatedAt)
	})

}
