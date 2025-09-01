package handlers

import (
	"net/http"
	"strconv"
	"todo-backend/storage"

	"github.com/gin-gonic/gin"
)

type CategoryHandler struct {
	storage *storage.MemoryStorage
}

func NewCategoryHandler(storage *storage.MemoryStorage) *CategoryHandler {
	return &CategoryHandler{storage: storage}
}

// CreateCategoryRequest represents the request body for creating a category
type CreateCategoryRequest struct {
	Name string `json:"name" binding:"required"`
}

// UpdateCategoryRequest represents the request body for updating a category
type UpdateCategoryRequest struct {
	Name string `json:"name" binding:"required"`
}

// GetAllCategories returns all categories
func (ch *CategoryHandler) GetAllCategories(c *gin.Context) {
	categories := ch.storage.GetAllCategories()
	c.JSON(http.StatusOK, categories)
}

// GetCategory returns a single category by ID
func (ch *CategoryHandler) GetCategory(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid category ID"})
		return
	}

	category, err := ch.storage.GetCategoryByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	c.JSON(http.StatusOK, category)
}

// CreateCategory creates a new category
func (ch *CategoryHandler) CreateCategory(c *gin.Context) {
	var request CreateCategoryRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	category, err := ch.storage.CreateCategory(request.Name)
	if err != nil {
		if err == storage.ErrCategoryNameRequired {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Category name is required"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create category"})
		}
		return
	}

	c.JSON(http.StatusCreated, category)
}

// UpdateCategory updates an existing category
func (ch *CategoryHandler) UpdateCategory(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid category ID"})
		return
	}

	var request UpdateCategoryRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	category, err := ch.storage.UpdateCategory(id, request.Name)
	if err != nil {
		if err == storage.ErrCategoryNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		} else if err == storage.ErrCategoryNameRequired {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Category name is required"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update category"})
		}
		return
	}

	c.JSON(http.StatusOK, category)
}

// DeleteCategory deletes a category by ID
func (ch *CategoryHandler) DeleteCategory(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid category ID"})
		return
	}

	err = ch.storage.DeleteCategory(id)
	if err != nil {
		if err == storage.ErrCategoryNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		} else if err == storage.ErrCategoryHasTasks {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Cannot delete category with existing tasks"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete category"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Category deleted successfully"})
}

// GetCategoryTasks returns all tasks for a specific category
func (ch *CategoryHandler) GetCategoryTasks(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid category ID"})
		return
	}

	tasks, err := ch.storage.GetTasksByCategory(id)
	if err != nil {
		if err == storage.ErrCategoryNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get category tasks"})
		}
		return
	}

	c.JSON(http.StatusOK, tasks)
}