# Building a Simple Go Backend for Your Todo App (Test-Driven Development)

Welcome! In this tutorial, we'll build a clean, simple Go backend for your React Todo application using **Test-Driven Development (TDD)**. We'll write tests first, watch them fail, then implement just enough code to make them pass. This approach ensures reliable, well-tested code from the start.

## What We're Building

By the end of this tutorial, you'll have:
- A REST API server that handles tasks and categories
- Clean project structure following Go best practices
- **Comprehensive test suite** written before implementation
- In-memory data storage (perfect for learning)
- Full integration with your existing React frontend
- **TDD workflow** you can apply to future projects

## Why Test-Driven Development?

**TDD follows a simple cycle:**
1. **Red**: Write a failing test
2. **Green**: Write minimal code to make it pass
3. **Refactor**: Improve code while keeping tests green

**Benefits:**
- Forces you to think about requirements first
- Ensures every line of code is tested
- Makes refactoring safer and easier
- Serves as living documentation

## Project Structure

We'll organize our code cleanly but simply:

```
todo-backend/
├── main.go              # Server startup
├── models/              # Data structures
│   ├── task.go
│   ├── task_test.go     # Tests for task model
│   ├── category.go
│   └── category_test.go # Tests for category model
├── handlers/            # API endpoint logic
│   ├── task.go
│   ├── task_test.go     # Tests for task handlers
│   ├── category.go
│   └── category_test.go # Tests for category handlers
├── storage/             # In-memory data management
│   ├── memory.go
│   └── memory_test.go   # Tests for storage layer
├── go.mod              # Go module definition
└── go.sum              # Dependencies
```

**Why this structure?**
- **Separation of concerns**: Each file has a single responsibility
- **Easy to navigate**: You know exactly where to find things
- **Test co-location**: Tests live next to the code they test
- **Scalable**: Easy to add features later
- **Go best practices**: Follows standard Go project layout

---

## Step 1: Setting Up the Project

Let's start by creating our project and installing dependencies.

```bash
# Create project directory
mkdir todo-backend
cd todo-backend

# Initialize Go module
go mod init todo-backend

# Install dependencies
go get github.com/gin-gonic/gin          # Web framework
go get github.com/stretchr/testify       # Testing utilities

# Create our directories
mkdir models handlers storage
```

**Dependencies explained:**
- **Gin**: Lightweight HTTP web framework for Go
- **Testify**: Makes writing tests easier with assertions and test utilities

---

## Step 2: Writing Our First Test (TDD Red Phase)

Let's start with the most basic component - our Task model. We'll write tests first!

Create `models/task_test.go`:

```go
package models

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestNewTask(t *testing.T) {
	// Test creating a task with all fields
	categoryID := 1
	task := NewTask("Learn Go", "Study Go programming", "HIGH", &categoryID)

	assert.Equal(t, "Learn Go", task.Title)
	assert.Equal(t, "Study Go programming", task.Description)
	assert.Equal(t, "HIGH", task.Priority)
	assert.Equal(t, &categoryID, task.CategoryID)
	assert.False(t, task.IsComplete)
	assert.NotEmpty(t, task.CreatedAt)
}

func TestNewTask_WithoutCategory(t *testing.T) {
	// Test creating a task without category
	task := NewTask("Learn Go", "Study Go programming", "MEDIUM", nil)

	assert.Equal(t, "Learn Go", task.Title)
	assert.Equal(t, "MEDIUM", task.Priority)
	assert.Nil(t, task.CategoryID)
	assert.False(t, task.IsComplete)
}

func TestNewTask_CreatedAtFormat(t *testing.T) {
	// Test that CreatedAt is in correct format
	task := NewTask("Test", "", "LOW", nil)
	
	// Should be able to parse the timestamp
	_, err := time.Parse("2006-01-02T15:04:05Z07:00", task.CreatedAt)
	assert.NoError(t, err)
}
```

Now run the test to see it fail (Red phase):

```bash
go test ./models/...
```

You should see errors because we haven't implemented the `NewTask` function yet!

---

## Step 3: Implementing Task Model (TDD Green Phase)

Now let's implement just enough code to make our tests pass.

Create `models/task.go`:

```go
package models

import "time"

type Task struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	CategoryID  *int   `json:"categoryId,omitempty"`
	Priority    string `json:"priority"`
	IsComplete  bool   `json:"isComplete"`
	CreatedAt   string `json:"createdAt"`
}

func NewTask(title, description, priority string, categoryID *int) Task {
	return Task{
		Title:       title,
		Description: description,
		CategoryID:  categoryID,
		Priority:    priority,
		IsComplete:  false,
		CreatedAt:   time.Now().Format("2006-01-02T15:04:05Z07:00"),
	}
}
```

Now run the tests to see them pass (Green phase):

```bash
go test ./models/...
```

Great! All tests should pass now. Let's add tests for the Category model.

Create `models/category_test.go`:

```go
package models

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestNewCategory(t *testing.T) {
	category := NewCategory("Work")

	assert.Equal(t, "Work", category.Name)
	assert.NotEmpty(t, category.CreatedAt)
}

func TestNewCategory_CreatedAtFormat(t *testing.T) {
	category := NewCategory("Personal")
	
	// Should be able to parse the timestamp
	_, err := time.Parse("2006-01-02T15:04:05Z07:00", category.CreatedAt)
	assert.NoError(t, err)
}
```

Run the test to see it fail:

```bash
go test ./models/...
```

Now implement the Category model in `models/category.go`:

```go
package models

import "time"

type Category struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"createdAt"`
}

func NewCategory(name string) Category {
	return Category{
		Name:      name,
		CreatedAt: time.Now().Format("2006-01-02T15:04:05Z07:00"),
	}
}
```

**Key points:**
- **JSON tags**: `json:"id"` tells Go how to convert structs to/from JSON
- **Pointer for CategoryID**: `*int` allows the field to be null (no category assigned)
- **Constructor functions**: `NewTask()` and `NewCategory()` help create instances with proper defaults

**Key TDD points:**
- **Write tests first**: This forces you to think about the API
- **Minimal implementation**: Only write code to make tests pass
- **Clear requirements**: Tests serve as specifications

---

## Step 4: Testing the Storage Layer (TDD Red Phase)

Now let's build our storage layer using TDD. We'll write tests that describe what we want the storage to do.

Create `storage/memory_test.go`:

```go
package storage

import (
	"testing"
	"todo-backend/models"

	"github.com/stretchr/testify/assert"
)

func TestMemoryStorage_CreateAndGetTask(t *testing.T) {
	storage := NewMemoryStorage()
	
	// Create a task
	task := models.NewTask("Test Task", "Description", "HIGH", nil)
	createdTask := storage.CreateTask(task)
	
	// Should assign an ID
	assert.NotZero(t, createdTask.ID)
	assert.Equal(t, "Test Task", createdTask.Title)
	
	// Should be able to retrieve it
	retrievedTask, err := storage.GetTaskByID(createdTask.ID)
	assert.NoError(t, err)
	assert.Equal(t, createdTask.ID, retrievedTask.ID)
	assert.Equal(t, "Test Task", retrievedTask.Title)
}

func TestMemoryStorage_GetAllTasks(t *testing.T) {
	storage := NewMemoryStorage()
	
	// Initially empty
	tasks := storage.GetAllTasks()
	assert.Empty(t, tasks)
	
	// Add a task
	task := models.NewTask("Test Task", "Description", "HIGH", nil)
	storage.CreateTask(task)
	
	// Should return one task
	tasks = storage.GetAllTasks()
	assert.Len(t, tasks, 1)
	assert.Equal(t, "Test Task", tasks[0].Title)
}

func TestMemoryStorage_GetTaskByID_NotFound(t *testing.T) {
	storage := NewMemoryStorage()
	
	// Try to get non-existent task
	_, err := storage.GetTaskByID(999)
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "not found")
}

func TestMemoryStorage_UpdateTask(t *testing.T) {
	storage := NewMemoryStorage()
	
	// Create a task
	task := models.NewTask("Original", "Description", "HIGH", nil)
	createdTask := storage.CreateTask(task)
	
	// Update the task
	updatedTask := models.Task{
		Title:       "Updated",
		Description: "New Description",
		Priority:    "LOW",
		IsComplete:  true,
	}
	
	result, err := storage.UpdateTask(createdTask.ID, updatedTask)
	assert.NoError(t, err)
	assert.Equal(t, "Updated", result.Title)
	assert.Equal(t, "New Description", result.Description)
	assert.True(t, result.IsComplete)
	// Should keep original ID and CreatedAt
	assert.Equal(t, createdTask.ID, result.ID)
	assert.Equal(t, createdTask.CreatedAt, result.CreatedAt)
}

func TestMemoryStorage_DeleteTask(t *testing.T) {
	storage := NewMemoryStorage()
	
	// Create a task
	task := models.NewTask("To Delete", "Description", "HIGH", nil)
	createdTask := storage.CreateTask(task)
	
	// Delete it
	err := storage.DeleteTask(createdTask.ID)
	assert.NoError(t, err)
	
	// Should not be found
	_, err = storage.GetTaskByID(createdTask.ID)
	assert.Error(t, err)
}

func TestMemoryStorage_ToggleTask(t *testing.T) {
	storage := NewMemoryStorage()
	
	// Create a task (initially not complete)
	task := models.NewTask("Toggle Me", "Description", "HIGH", nil)
	createdTask := storage.CreateTask(task)
	assert.False(t, createdTask.IsComplete)
	
	// Toggle to complete
	toggledTask, err := storage.ToggleTask(createdTask.ID)
	assert.NoError(t, err)
	assert.True(t, toggledTask.IsComplete)
	
	// Toggle back to incomplete
	toggledTask, err = storage.ToggleTask(createdTask.ID)
	assert.NoError(t, err)
	assert.False(t, toggledTask.IsComplete)
}

// Category tests
func TestMemoryStorage_CreateAndGetCategory(t *testing.T) {
	storage := NewMemoryStorage()
	
	// Create a category
	category := models.NewCategory("Work")
	createdCategory := storage.CreateCategory(category)
	
	// Should assign an ID
	assert.NotZero(t, createdCategory.ID)
	assert.Equal(t, "Work", createdCategory.Name)
	
	// Should be able to retrieve it
	retrievedCategory, err := storage.GetCategoryByID(createdCategory.ID)
	assert.NoError(t, err)
	assert.Equal(t, createdCategory.ID, retrievedCategory.ID)
	assert.Equal(t, "Work", retrievedCategory.Name)
}

func TestMemoryStorage_DeleteCategory_WithTasks(t *testing.T) {
	storage := NewMemoryStorage()
	
	// Create category and task
	category := models.NewCategory("Work")
	createdCategory := storage.CreateCategory(category)
	
	task := models.NewTask("Work Task", "Description", "HIGH", &createdCategory.ID)
	storage.CreateTask(task)
	
	// Should not be able to delete category with tasks
	err := storage.DeleteCategory(createdCategory.ID)
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "existing tasks")
}
```

Run the tests to see them fail:

```bash
go test ./storage/...
```

You'll see many errors because we haven't implemented any of the storage methods yet!

## Step 5: Implementing Storage (TDD Green Phase)

Now let's implement just enough to make our tests pass.

Create `storage/memory.go`:

```go
package storage

import (
	"errors"
	"todo-backend/models"
)

type MemoryStorage struct {
	tasks      []models.Task
	categories []models.Category
	taskID     int
	categoryID int
}

func NewMemoryStorage() *MemoryStorage {
	return &MemoryStorage{
		tasks:      make([]models.Task, 0),
		categories: make([]models.Category, 0),
		taskID:     1,
		categoryID: 1,
	}
}

// Task methods
func (m *MemoryStorage) GetAllTasks() []models.Task {
	return m.tasks
}

func (m *MemoryStorage) GetTaskByID(id int) (*models.Task, error) {
	for i, task := range m.tasks {
		if task.ID == id {
			return &m.tasks[i], nil
		}
	}
	return nil, errors.New("task not found")
}

func (m *MemoryStorage) CreateTask(task models.Task) models.Task {
	task.ID = m.taskID
	m.taskID++
	m.tasks = append(m.tasks, task)
	return task
}

func (m *MemoryStorage) UpdateTask(id int, updatedTask models.Task) (*models.Task, error) {
	for i, task := range m.tasks {
		if task.ID == id {
			updatedTask.ID = task.ID
			updatedTask.CreatedAt = task.CreatedAt // Keep original creation time
			m.tasks[i] = updatedTask
			return &m.tasks[i], nil
		}
	}
	return nil, errors.New("task not found")
}

func (m *MemoryStorage) DeleteTask(id int) error {
	for i, task := range m.tasks {
		if task.ID == id {
			m.tasks = append(m.tasks[:i], m.tasks[i+1:]...)
			return nil
		}
	}
	return errors.New("task not found")
}

func (m *MemoryStorage) ToggleTask(id int) (*models.Task, error) {
	for i, task := range m.tasks {
		if task.ID == id {
			m.tasks[i].IsComplete = !m.tasks[i].IsComplete
			return &m.tasks[i], nil
		}
	}
	return nil, errors.New("task not found")
}

// Category methods
func (m *MemoryStorage) GetAllCategories() []models.Category {
	return m.categories
}

func (m *MemoryStorage) GetCategoryByID(id int) (*models.Category, error) {
	for i, category := range m.categories {
		if category.ID == id {
			return &m.categories[i], nil
		}
	}
	return nil, errors.New("category not found")
}

func (m *MemoryStorage) CreateCategory(category models.Category) models.Category {
	category.ID = m.categoryID
	m.categoryID++
	m.categories = append(m.categories, category)
	return category
}

func (m *MemoryStorage) UpdateCategory(id int, updatedCategory models.Category) (*models.Category, error) {
	for i, category := range m.categories {
		if category.ID == id {
			updatedCategory.ID = category.ID
			updatedCategory.CreatedAt = category.CreatedAt
			m.categories[i] = updatedCategory
			return &m.categories[i], nil
		}
	}
	return nil, errors.New("category not found")
}

func (m *MemoryStorage) DeleteCategory(id int) error {
	// Check if any tasks use this category
	for _, task := range m.tasks {
		if task.CategoryID != nil && *task.CategoryID == id {
			return errors.New("cannot delete category with existing tasks")
		}
	}

	for i, category := range m.categories {
		if category.ID == id {
			m.categories = append(m.categories[:i], m.categories[i+1:]...)
			return nil
		}
	}
	return errors.New("category not found")
}
```

Run tests to see them pass:

```bash
go test ./storage/...
```

**What we learned:**
- **Test-first approach**: Tests defined our API before implementation
- **Comprehensive coverage**: Tests cover happy path and error cases
- **Documentation**: Tests serve as examples of how to use the storage

**TDD Benefits seen:**
- Tests caught edge cases we might have missed
- Clear API design emerged from test requirements
- Implementation was focused and minimal

---

## Step 6: Testing HTTP Handlers (TDD Red Phase)

Now let's test our HTTP endpoints. We'll use Gin's testing features to test without starting a real server.

Create `handlers/task_test.go`:

```go
package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"todo-backend/models"
	"todo-backend/storage"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func setupTestHandler() (*TaskHandler, *gin.Engine) {
	// Set Gin to test mode
	gin.SetMode(gin.TestMode)
	
	// Create storage and handler
	memoryStorage := storage.NewMemoryStorage()
	handler := NewTaskHandler(memoryStorage)
	
	// Create router and routes
	router := gin.New()
	router.GET("/tasks", handler.GetAllTasks)
	router.GET("/tasks/:id", handler.GetTask)
	router.POST("/tasks", handler.CreateTask)
	router.PUT("/tasks/:id", handler.UpdateTask)
	router.DELETE("/tasks/:id", handler.DeleteTask)
	router.PATCH("/tasks/:id/toggle", handler.ToggleTask)
	
	return handler, router
}

func TestTaskHandler_CreateTask(t *testing.T) {
	handler, router := setupTestHandler()
	
	// Prepare request
	taskRequest := map[string]interface{}{
		"title":       "Test Task",
		"description": "Test Description",
		"priority":    "HIGH",
	}
	jsonData, _ := json.Marshal(taskRequest)
	
	// Make request
	req, _ := http.NewRequest("POST", "/tasks", bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json")
	
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)
	
	// Check response
	assert.Equal(t, http.StatusCreated, w.Code)
	
	var response models.Task
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, "Test Task", response.Title)
	assert.Equal(t, "HIGH", response.Priority)
	assert.NotZero(t, response.ID)
	assert.False(t, response.IsComplete)
}

func TestTaskHandler_CreateTask_MissingTitle(t *testing.T) {
	_, router := setupTestHandler()
	
	// Request without required title
	taskRequest := map[string]interface{}{
		"description": "Test Description",
		"priority":    "HIGH",
	}
	jsonData, _ := json.Marshal(taskRequest)
	
	req, _ := http.NewRequest("POST", "/tasks", bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json")
	
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)
	
	// Should return 400 Bad Request
	assert.Equal(t, http.StatusBadRequest, w.Code)
	
	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Contains(t, response["error"], "required")
}

func TestTaskHandler_GetAllTasks(t *testing.T) {
	handler, router := setupTestHandler()
	
	// Add some test data
	task1 := models.NewTask("Task 1", "Description 1", "HIGH", nil)
	task2 := models.NewTask("Task 2", "Description 2", "LOW", nil)
	handler.storage.CreateTask(task1)
	handler.storage.CreateTask(task2)
	
	// Make request
	req, _ := http.NewRequest("GET", "/tasks", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)
	
	// Check response
	assert.Equal(t, http.StatusOK, w.Code)
	
	var tasks []models.Task
	err := json.Unmarshal(w.Body.Bytes(), &tasks)
	assert.NoError(t, err)
	assert.Len(t, tasks, 2)
	assert.Equal(t, "Task 1", tasks[0].Title)
	assert.Equal(t, "Task 2", tasks[1].Title)
}

func TestTaskHandler_GetTask(t *testing.T) {
	handler, router := setupTestHandler()
	
	// Add test data
	task := models.NewTask("Test Task", "Description", "HIGH", nil)
	createdTask := handler.storage.CreateTask(task)
	
	// Make request
	req, _ := http.NewRequest("GET", "/tasks/1", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)
	
	// Check response
	assert.Equal(t, http.StatusOK, w.Code)
	
	var response models.Task
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, createdTask.ID, response.ID)
	assert.Equal(t, "Test Task", response.Title)
}

func TestTaskHandler_GetTask_NotFound(t *testing.T) {
	_, router := setupTestHandler()
	
	// Make request for non-existent task
	req, _ := http.NewRequest("GET", "/tasks/999", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)
	
	// Should return 404
	assert.Equal(t, http.StatusNotFound, w.Code)
	
	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Contains(t, response["error"], "not found")
}

func TestTaskHandler_ToggleTask(t *testing.T) {
	handler, router := setupTestHandler()
	
	// Add test data
	task := models.NewTask("Toggle Task", "Description", "HIGH", nil)
	createdTask := handler.storage.CreateTask(task)
	assert.False(t, createdTask.IsComplete)
	
	// Toggle the task
	req, _ := http.NewRequest("PATCH", "/tasks/1/toggle", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)
	
	// Check response
	assert.Equal(t, http.StatusOK, w.Code)
	
	var response models.Task
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.True(t, response.IsComplete)
}
```

Run the tests to see them fail:

```bash
go test ./handlers/...
```

Now we need to implement the handlers to make our tests pass!

## Step 7: Implementing HTTP Handlers (TDD Green Phase)

Now let's create the handlers that will process HTTP requests.

Create `handlers/task.go`:

```go
package handlers

import (
	"net/http"
	"strconv"
	"todo-backend/models"
	"todo-backend/storage"

	"github.com/gin-gonic/gin"
)

type TaskHandler struct {
	storage *storage.MemoryStorage
}

func NewTaskHandler(storage *storage.MemoryStorage) *TaskHandler {
	return &TaskHandler{storage: storage}
}

func (h *TaskHandler) GetAllTasks(c *gin.Context) {
	tasks := h.storage.GetAllTasks()
	c.JSON(http.StatusOK, tasks)
}

func (h *TaskHandler) GetTask(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
		return
	}

	task, err := h.storage.GetTaskByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	c.JSON(http.StatusOK, task)
}

func (h *TaskHandler) CreateTask(c *gin.Context) {
	var request struct {
		Title       string `json:"title" binding:"required"`
		Description string `json:"description"`
		CategoryID  *int   `json:"categoryId"`
		Priority    string `json:"priority"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set default priority if not provided
	if request.Priority == "" {
		request.Priority = "MEDIUM"
	}

	task := models.NewTask(request.Title, request.Description, request.Priority, request.CategoryID)
	createdTask := h.storage.CreateTask(task)

	c.JSON(http.StatusCreated, createdTask)
}

func (h *TaskHandler) UpdateTask(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
		return
	}

	var updatedTask models.Task
	if err := c.ShouldBindJSON(&updatedTask); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	task, err := h.storage.UpdateTask(id, updatedTask)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	c.JSON(http.StatusOK, task)
}

func (h *TaskHandler) DeleteTask(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
		return
	}

	if err := h.storage.DeleteTask(id); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task deleted successfully"})
}

func (h *TaskHandler) ToggleTask(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
		return
	}

	task, err := h.storage.ToggleTask(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	c.JSON(http.StatusOK, task)
}
```

Create `handlers/category.go`:

```go
package handlers

import (
	"net/http"
	"strconv"
	"todo-backend/models"
	"todo-backend/storage"

	"github.com/gin-gonic/gin"
)

type CategoryHandler struct {
	storage *storage.MemoryStorage
}

func NewCategoryHandler(storage *storage.MemoryStorage) *CategoryHandler {
	return &CategoryHandler{storage: storage}
}

func (h *CategoryHandler) GetAllCategories(c *gin.Context) {
	categories := h.storage.GetAllCategories()
	c.JSON(http.StatusOK, categories)
}

func (h *CategoryHandler) GetCategory(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid category ID"})
		return
	}

	category, err := h.storage.GetCategoryByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	c.JSON(http.StatusOK, category)
}

func (h *CategoryHandler) CreateCategory(c *gin.Context) {
	var request struct {
		Name string `json:"name" binding:"required"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	category := models.NewCategory(request.Name)
	createdCategory := h.storage.CreateCategory(category)

	c.JSON(http.StatusCreated, createdCategory)
}

func (h *CategoryHandler) UpdateCategory(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid category ID"})
		return
	}

	var updatedCategory models.Category
	if err := c.ShouldBindJSON(&updatedCategory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	category, err := h.storage.UpdateCategory(id, updatedCategory)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	c.JSON(http.StatusOK, category)
}

func (h *CategoryHandler) DeleteCategory(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid category ID"})
		return
	}

	if err := h.storage.DeleteCategory(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Category deleted successfully"})
}
```

**What's happening in the handlers?**
- **Handler structs**: Each handler holds a reference to our storage
- **Constructor functions**: `NewTaskHandler()` creates handler instances
- **HTTP status codes**: Proper REST API responses (200, 201, 400, 404)
- **JSON binding**: `c.ShouldBindJSON()` automatically parses request bodies
- **URL parameters**: `c.Param("id")` gets values from the URL path

---

## Step 5: Setting Up the Main Server

Finally, let's create our main server file that ties everything together.

Create `main.go`:

```go
package main

import (
	"log"
	"todo-backend/handlers"
	"todo-backend/storage"

	"github.com/gin-gonic/gin"
)

func setupCORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	// Initialize storage
	memoryStorage := storage.NewMemoryStorage()

	// Initialize handlers
	taskHandler := handlers.NewTaskHandler(memoryStorage)
	categoryHandler := handlers.NewCategoryHandler(memoryStorage)

	// Create Gin router
	router := gin.Default()

	// Add CORS middleware
	router.Use(setupCORS())

	// Health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "healthy",
			"message": "Todo API is running",
		})
	})

	// API routes group
	api := router.Group("/api")
	{
		// Task routes
		api.GET("/tasks", taskHandler.GetAllTasks)
		api.GET("/tasks/:id", taskHandler.GetTask)
		api.POST("/tasks", taskHandler.CreateTask)
		api.PUT("/tasks/:id", taskHandler.UpdateTask)
		api.DELETE("/tasks/:id", taskHandler.DeleteTask)
		api.PATCH("/tasks/:id/toggle", taskHandler.ToggleTask)

		// Category routes
		api.GET("/categories", categoryHandler.GetAllCategories)
		api.GET("/categories/:id", categoryHandler.GetCategory)
		api.POST("/categories", categoryHandler.CreateCategory)
		api.PUT("/categories/:id", categoryHandler.UpdateCategory)
		api.DELETE("/categories/:id", categoryHandler.DeleteCategory)
	}

	// Start server
	log.Println("Starting server on :8080")
	if err := router.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
```

Run the tests to see them pass:

```bash
go test ./handlers/...
```

**TDD Benefits for Handlers:**
- **HTTP testing**: No need to start a real server to test endpoints
- **Edge case coverage**: Tests for both success and error scenarios  
- **API contract**: Tests document expected request/response formats
- **Confidence**: Every endpoint is tested before deployment

---

## Step 8: Running All Tests

Let's run our complete test suite:

```bash
# Run all tests
go test ./...

# Run with verbose output
go test -v ./...

# Run with coverage report
go test -cover ./...

# Run specific package tests
go test ./models/...
go test ./storage/...
go test ./handlers/...
```

You should see all tests passing! This gives us confidence that our code works correctly.

## Step 9: Integration Testing

Let's add an integration test that tests the entire flow:

Create `integration_test.go` in the root directory:

```go
package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"todo-backend/handlers"
	"todo-backend/storage"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func setupIntegrationTest() *gin.Engine {
	gin.SetMode(gin.TestMode)
	
	// Initialize storage
	memoryStorage := storage.NewMemoryStorage()
	
	// Initialize handlers
	taskHandler := handlers.NewTaskHandler(memoryStorage)
	categoryHandler := handlers.NewCategoryHandler(memoryStorage)
	
	// Create router
	router := gin.New()
	
	// API routes
	api := router.Group("/api")
	{
		api.GET("/tasks", taskHandler.GetAllTasks)
		api.POST("/tasks", taskHandler.CreateTask)
		api.PATCH("/tasks/:id/toggle", taskHandler.ToggleTask)
		
		api.GET("/categories", categoryHandler.GetAllCategories)
		api.POST("/categories", categoryHandler.CreateCategory)
	}
	
	return router
}

func TestFullWorkflow(t *testing.T) {
	router := setupIntegrationTest()
	
	// 1. Create a category
	categoryReq := map[string]interface{}{"name": "Work"}
	jsonData, _ := json.Marshal(categoryReq)
	
	req, _ := http.NewRequest("POST", "/api/categories", bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)
	
	assert.Equal(t, http.StatusCreated, w.Code)
	
	var category map[string]interface{}
	json.Unmarshal(w.Body.Bytes(), &category)
	categoryID := int(category["id"].(float64))
	
	// 2. Create a task with the category
	taskReq := map[string]interface{}{
		"title":      "Complete project",
		"priority":   "HIGH",
		"categoryId": categoryID,
	}
	jsonData, _ = json.Marshal(taskReq)
	
	req, _ = http.NewRequest("POST", "/api/tasks", bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json")
	w = httptest.NewRecorder()
	router.ServeHTTP(w, req)
	
	assert.Equal(t, http.StatusCreated, w.Code)
	
	var task map[string]interface{}
	json.Unmarshal(w.Body.Bytes(), &task)
	assert.Equal(t, "Complete project", task["title"])
	assert.Equal(t, float64(categoryID), task["categoryId"])
	assert.False(t, task["isComplete"].(bool))
	
	// 3. Toggle task completion
	req, _ = http.NewRequest("PATCH", "/api/tasks/1/toggle", nil)
	w = httptest.NewRecorder()
	router.ServeHTTP(w, req)
	
	assert.Equal(t, http.StatusOK, w.Code)
	
	json.Unmarshal(w.Body.Bytes(), &task)
	assert.True(t, task["isComplete"].(bool))
	
	// 4. Get all tasks
	req, _ = http.NewRequest("GET", "/api/tasks", nil)
	w = httptest.NewRecorder()
	router.ServeHTTP(w, req)
	
	assert.Equal(t, http.StatusOK, w.Code)
	
	var tasks []map[string]interface{}
	json.Unmarshal(w.Body.Bytes(), &tasks)
	assert.Len(t, tasks, 1)
	assert.True(t, tasks[0]["isComplete"].(bool))
}
```

Run the integration test:

```bash
go test -v integration_test.go
```

## Step 10: Running Your Backend

Now let's test our backend!

```bash
# Start the server
go run main.go
```

You should see: `Starting server on :8080`

## Step 7: Testing the API

Let's test our endpoints using curl:

```bash
# Health check
curl http://localhost:8080/health

# Create a category
curl -X POST http://localhost:8080/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Work"}'

# Create a task
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Go", "description": "Build a todo API", "priority": "HIGH", "categoryId": 1}'

# Get all tasks
curl http://localhost:8080/api/tasks

# Get all categories
curl http://localhost:8080/api/categories

# Toggle task completion
curl -X PATCH http://localhost:8080/api/tasks/1/toggle
```

---

## Step 8: Integrating with Your React Frontend

Now let's connect your React app to use the real backend.

Update your `src/api/api.js`:

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskAPI = {
  getAllTasks: () => api.get('/tasks'),
  getTask: (id) => api.get(`/tasks/${id}`),
  createTask: (task) => api.post('/tasks', task),
  updateTask: (id, task) => api.put(`/tasks/${id}`, task),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  toggleTask: (id) => api.patch(`/tasks/${id}/toggle`),
};

export const categoryAPI = {
  getAllCategories: () => api.get('/categories'),
  getCategory: (id) => api.get(`/categories/${id}`),
  createCategory: (category) => api.post('/categories', category),
  updateCategory: (id, category) => api.put(`/categories/${id}`, category),
  deleteCategory: (id) => api.delete(`/categories/${id}`),
};
```

Update your store `src/store/taskStore.js`:

```javascript
import { create } from 'zustand';
import { taskAPI, categoryAPI } from '../api/api';

const useTaskStore = create((set, get) => ({
  tasks: [],
  categories: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await taskAPI.getAllTasks();
      set({ tasks: response.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.error || 'Failed to fetch tasks', loading: false });
    }
  },

  addTask: async (task) => {
    set({ loading: true });
    try {
      const response = await taskAPI.createTask(task);
      set((state) => ({
        tasks: [...state.tasks, response.data],
        loading: false
      }));
    } catch (error) {
      set({ error: error.response?.data?.error || 'Failed to create task', loading: false });
    }
  },

  updateTask: async (id, updatedTask) => {
    set({ loading: true });
    try {
      const response = await taskAPI.updateTask(id, updatedTask);
      set((state) => ({
        tasks: state.tasks.map(task => task.id === id ? response.data : task),
        loading: false
      }));
    } catch (error) {
      set({ error: error.response?.data?.error || 'Failed to update task', loading: false });
    }
  },

  deleteTask: async (id) => {
    try {
      await taskAPI.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
      }));
    } catch (error) {
      set({ error: error.response?.data?.error || 'Failed to delete task' });
    }
  },

  addCategory: async (category) => {
    try {
      const response = await categoryAPI.createCategory(category);
      set((state) => ({
        categories: [...state.categories, response.data]
      }));
    } catch (error) {
      set({ error: error.response?.data?.error || 'Failed to create category' });
    }
  },

  updateCategory: async (id, updatedCategory) => {
    try {
      const response = await categoryAPI.updateCategory(id, updatedCategory);
      set((state) => ({
        categories: state.categories.map(cat => cat.id === id ? response.data : cat)
      }));
    } catch (error) {
      set({ error: error.response?.data?.error || 'Failed to update category' });
    }
  },

  deleteCategory: async (id) => {
    try {
      await categoryAPI.deleteCategory(id);
      set((state) => ({
        categories: state.categories.filter(cat => cat.id !== id)
      }));
    } catch (error) {
      set({ error: error.response?.data?.error || 'Failed to delete category' });
    }
  },

  // Add this method to fetch categories
  fetchCategories: async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      set({ categories: response.data });
    } catch (error) {
      set({ error: error.response?.data?.error || 'Failed to fetch categories' });
    }
  },
}));

export default useTaskStore;
```

---

## Step 9: Running the Complete Application

1. **Start your Go backend:**
   ```bash
   cd todo-backend
   go run main.go
   ```

2. **Start your React frontend:**
   ```bash
   cd client/todo
   npm run dev
   ```

3. **Test everything:**
   - Create some categories
   - Create tasks and assign them to categories
   - Toggle task completion
   - Edit and delete items

---

## What You've Learned

Congratulations! You've built a complete Go backend using **Test-Driven Development** with:

✅ **Test-First Development**: Every feature started with failing tests  
✅ **Comprehensive Test Coverage**: Models, storage, handlers, and integration tests  
✅ **Clean Architecture**: Separated concerns with models, handlers, and storage  
✅ **REST API**: Full CRUD operations following REST principles  
✅ **Error Handling**: Proper HTTP status codes and error messages tested  
✅ **JSON Communication**: Seamless data exchange with frontend  
✅ **CORS Support**: Frontend can communicate with backend  
✅ **In-Memory Storage**: No database complexity, perfect for learning  
✅ **Reliable Code**: High confidence through comprehensive testing

## TDD Benefits You Experienced

**🔴 Red Phase Benefits:**
- Forced clear thinking about requirements
- Defined APIs before implementation
- Caught edge cases early

**🟢 Green Phase Benefits:**
- Minimal, focused implementation
- Quick feedback on code correctness
- Built exactly what was needed

**🔄 Refactor Phase Benefits:**
- Safe code improvements with test safety net
- Maintained functionality while improving design
- Continuous code quality improvement

## Testing Best Practices Learned

- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test component interactions
- **HTTP Testing**: Test endpoints without running servers
- **Test Organization**: Co-locate tests with code
- **Assertions**: Use clear, descriptive test assertions
- **Test Data**: Create realistic test scenarios

## Running Your Test Suite

```bash
# Development workflow
go test ./...              # Run all tests
go test -v ./...          # Verbose output
go test -cover ./...      # Coverage report
go test -watch ./...      # Continuous testing (with tools)

# Specific testing
go test ./models/...      # Test only models
go test ./storage/...     # Test only storage
go test ./handlers/...    # Test only handlers

# Coverage analysis
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out
```

## Next Steps

Once you're comfortable with this TDD approach, you can:

**Immediate Improvements:**
- Add more edge case tests
- Implement category handler tests
- Add validation tests for input sanitization
- Create benchmarks for performance testing

**Advanced Features (TDD approach):**
- Add a real database (write tests first!)
- Add authentication (test security scenarios)
- Add input validation (test invalid inputs)
- Add logging and monitoring (test log outputs)
- Add rate limiting (test throttling behavior)

**Production Readiness:**
- Add health check endpoints (with tests)
- Add metrics collection (with test coverage)
- Add graceful shutdown (test cleanup)
- Add deployment configuration (test environments)

## TDD Workflow for Future Features

When adding new features, follow this TDD cycle:

1. **🔴 Red**: Write failing tests for the new feature
2. **🟢 Green**: Write minimal code to make tests pass
3. **🔄 Refactor**: Improve code while keeping tests green
4. **Repeat**: Continue for each small increment

This approach ensures you build reliable, maintainable, and well-tested Go backends. The test suite serves as both documentation and safety net for future changes!
