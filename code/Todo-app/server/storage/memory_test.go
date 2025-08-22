package storage

import (
	"todo-backend/models"
	"testing"
	"github.com/stretchr/testify/assert"
)

func TestNewCategoryStorage(t *testing.T) {
	category := models.NewCategory(1, "Test Category", "2023-10-01T10:00:00Z")
	storage := NewCategoryStorage()
	storage.AddCategory(category)
	assert.Equal(t, 1, len(storage.categories))
	assert.Equal(t, "Test Category", storage.categories[0].Name)
}

func TestNewTaskStorage(t *testing.T) {
	task := models.NewTask(1, "Test Task", "This is a test task", "HIGH", nil, false, "2023-10-01T10:00:00Z")
	storage := NewTaskStorage()
	storage.AddTask(task)
	assert.Equal(t, 1, len(storage.tasks))
	assert.Equal(t, "Test Task", storage.tasks[0].Title)
}	