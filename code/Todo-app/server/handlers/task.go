package handlers

import (
	"net/http"
	"strconv"
	"todo-backend/storage"

	"github.com/gin-gonic/gin"
)

type TaskHandler struct {
	storage *storage.MemoryStorage
}

func NewTaskHandler(storage *storage.MemoryStorage) *TaskHandler {
	return &TaskHandler{storage: storage}
}

// CreateTaskRequest represents the request body for creating a task
type CreateTaskRequest struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
	Priority    string `json:"priority"`
	CategoryID  *int   `json:"categoryId"`
}

// UpdateTaskRequest represents the request body for updating a task
type UpdateTaskRequest struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
	Priority    string `json:"priority"`
	CategoryID  *int   `json:"categoryId"`
}

// GetAllTasks returns all tasks
func (th *TaskHandler) GetAllTasks(c *gin.Context) {
	tasks := th.storage.GetAllTasks()
	c.JSON(http.StatusOK, tasks)
}

// GetTask returns a single task by ID
func (th *TaskHandler) GetTask(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
		return
	}

	task, err := th.storage.GetTaskByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	c.JSON(http.StatusOK, task)
}

// CreateTask creates a new task
func (th *TaskHandler) CreateTask(c *gin.Context) {
	var request CreateTaskRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	task, err := th.storage.CreateTask(request.Title, request.Description, request.Priority, request.CategoryID)
	if err != nil {
		if err == storage.ErrCategoryNotFound {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Category not found"})
		} else if err == storage.ErrTaskTitleRequired {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Task title is required"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create task"})
		}
		return
	}

	c.JSON(http.StatusCreated, task)
}

// UpdateTask updates an existing task
func (th *TaskHandler) UpdateTask(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
		return
	}

	var request UpdateTaskRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	task, err := th.storage.UpdateTask(id, request.Title, request.Description, request.Priority, request.CategoryID)
	if err != nil {
		if err == storage.ErrTaskNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		} else if err == storage.ErrCategoryNotFound {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Category not found"})
		} else if err == storage.ErrTaskTitleRequired {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Task title is required"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update task"})
		}
		return
	}

	c.JSON(http.StatusOK, task)
}

// DeleteTask deletes a task by ID
func (th *TaskHandler) DeleteTask(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
		return
	}

	err = th.storage.DeleteTask(id)
	if err != nil {
		if err == storage.ErrTaskNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete task"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task deleted successfully"})
}

// ToggleTask toggles the completion status of a task
func (th *TaskHandler) ToggleTask(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
		return
	}

	task, err := th.storage.ToggleTask(id)
	if err != nil {
		if err == storage.ErrTaskNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to toggle task"})
		}
		return
	}

	c.JSON(http.StatusOK, task)
}