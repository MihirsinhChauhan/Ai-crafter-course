package handlers

import (
	"todo-backend/models"
	"todo-backend/storage"
	"testing"
	"github.com/stretchr/testify/assert"
)


func TestCreateTask(t *testing.T) {
	// Set up test storage
	taskStorage := storage.NewTaskStorage()
	taskHandler := NewTaskHandler(taskStorage)

	// Create a test task
	task := models.NewTask(1, "Test Task", "This is a test task", "HIGH", nil, false, "2023-10-01T10:00:00Z")

	// Call the CreateTask function	
	createdTask, err := taskHandler.CreateTask(task)
	assert.NoError(t, err)
	assert.Equal(t, task.Title, createdTask.Title)
	assert.Equal(t, task.Description, createdTask.Description)
	assert.Equal(t, task.Priority, createdTask.Priority)
	assert.Equal(t, task.CategoryID, createdTask.CategoryID)
	assert.Equal(t, task.IsComplete, createdTask.IsComplete)
	assert.Equal(t, task.CreatedAt, createdTask.CreatedAt)
}