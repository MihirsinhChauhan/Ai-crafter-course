package storage

import (
	"errors"
	"sync"
	"todo-backend/models"
)

// Common errors
var (
	ErrTaskNotFound              = errors.New("task not found")
	ErrCategoryNotFound         = errors.New("category not found")
	ErrCategoryHasTasks         = errors.New("cannot delete category with existing tasks")
	ErrInvalidTaskID            = errors.New("invalid task ID")
	ErrInvalidCategoryID        = errors.New("invalid category ID")
	ErrCategoryNameRequired     = errors.New("category name is required")
	ErrTaskTitleRequired        = errors.New("task title is required")
)

// MemoryStorage provides a unified, thread-safe in-memory storage for tasks and categories
type MemoryStorage struct {
	mu         sync.RWMutex
	tasks      []models.Task
	categories []models.Category
	nextTaskID int
	nextCatID  int
}

// NewMemoryStorage creates a new unified memory storage instance
func NewMemoryStorage() *MemoryStorage {
	return &MemoryStorage{
		tasks:      make([]models.Task, 0),
		categories: make([]models.Category, 0),
		nextTaskID: 1,
		nextCatID:  1,
	}
}

// === TASK OPERATIONS ===

// GetAllTasks returns all tasks
func (ms *MemoryStorage) GetAllTasks() []models.Task {
	ms.mu.RLock()
	defer ms.mu.RUnlock()
	
	// Return a copy to prevent external modification
	tasksCopy := make([]models.Task, len(ms.tasks))
	copy(tasksCopy, ms.tasks)
	return tasksCopy
}

// GetTaskByID returns a task by its ID
func (ms *MemoryStorage) GetTaskByID(id int) (*models.Task, error) {
	ms.mu.RLock()
	defer ms.mu.RUnlock()
	
	for _, task := range ms.tasks {
		if task.ID == id {
			taskCopy := task
			return &taskCopy, nil
		}
	}
	return nil, ErrTaskNotFound
}

// CreateTask creates a new task and returns it with the assigned ID
func (ms *MemoryStorage) CreateTask(title, description, priority string, categoryID *int) (*models.Task, error) {
	if title == "" {
		return nil, ErrTaskTitleRequired
	}
	
	ms.mu.Lock()
	defer ms.mu.Unlock()
	
	// Validate category exists if provided
	if categoryID != nil {
		found := false
		for _, cat := range ms.categories {
			if cat.ID == *categoryID {
				found = true
				break
			}
		}
		if !found {
			return nil, ErrCategoryNotFound
		}
	}
	
	// Create new task with ID
	task := models.NewTask(title, description, priority, categoryID)
	task.ID = ms.nextTaskID
	ms.nextTaskID++
	
	ms.tasks = append(ms.tasks, task)
	return &task, nil
}

// UpdateTask updates an existing task
func (ms *MemoryStorage) UpdateTask(id int, title, description, priority string, categoryID *int) (*models.Task, error) {
	if title == "" {
		return nil, ErrTaskTitleRequired
	}
	
	ms.mu.Lock()
	defer ms.mu.Unlock()
	
	// Validate category exists if provided
	if categoryID != nil {
		found := false
		for _, cat := range ms.categories {
			if cat.ID == *categoryID {
				found = true
				break
			}
		}
		if !found {
			return nil, ErrCategoryNotFound
		}
	}
	
	// Find and update task
	for i, task := range ms.tasks {
		if task.ID == id {
			ms.tasks[i].Title = title
			ms.tasks[i].Description = description
			ms.tasks[i].Priority = priority
			ms.tasks[i].CategoryID = categoryID
			
			updatedTask := ms.tasks[i]
			return &updatedTask, nil
		}
	}
	return nil, ErrTaskNotFound
}

// DeleteTask deletes a task by ID
func (ms *MemoryStorage) DeleteTask(id int) error {
	ms.mu.Lock()
	defer ms.mu.Unlock()
	
	for i, task := range ms.tasks {
		if task.ID == id {
			// Remove task from slice
			ms.tasks = append(ms.tasks[:i], ms.tasks[i+1:]...)
			return nil
		}
	}
	return ErrTaskNotFound
}

// ToggleTask toggles the completion status of a task
func (ms *MemoryStorage) ToggleTask(id int) (*models.Task, error) {
	ms.mu.Lock()
	defer ms.mu.Unlock()
	
	for i, task := range ms.tasks {
		if task.ID == id {
			ms.tasks[i].IsComplete = !ms.tasks[i].IsComplete
			updatedTask := ms.tasks[i]
			return &updatedTask, nil
		}
	}
	return nil, ErrTaskNotFound
}

// === CATEGORY OPERATIONS ===

// GetAllCategories returns all categories
func (ms *MemoryStorage) GetAllCategories() []models.Category {
	ms.mu.RLock()
	defer ms.mu.RUnlock()
	
	// Return a copy to prevent external modification
	categoriesCopy := make([]models.Category, len(ms.categories))
	copy(categoriesCopy, ms.categories)
	return categoriesCopy
}

// GetCategoryByID returns a category by its ID
func (ms *MemoryStorage) GetCategoryByID(id int) (*models.Category, error) {
	ms.mu.RLock()
	defer ms.mu.RUnlock()
	
	for _, category := range ms.categories {
		if category.ID == id {
			categoryCopy := category
			return &categoryCopy, nil
		}
	}
	return nil, ErrCategoryNotFound
}

// CreateCategory creates a new category and returns it with the assigned ID
func (ms *MemoryStorage) CreateCategory(name string) (*models.Category, error) {
	if name == "" {
		return nil, ErrCategoryNameRequired
	}
	
	ms.mu.Lock()
	defer ms.mu.Unlock()
	
	// Create new category with ID
	category := models.NewCategory(name)
	category.ID = ms.nextCatID
	ms.nextCatID++
	
	ms.categories = append(ms.categories, category)
	return &category, nil
}

// UpdateCategory updates an existing category
func (ms *MemoryStorage) UpdateCategory(id int, name string) (*models.Category, error) {
	if name == "" {
		return nil, ErrCategoryNameRequired
	}
	
	ms.mu.Lock()
	defer ms.mu.Unlock()
	
	for i, category := range ms.categories {
		if category.ID == id {
			ms.categories[i].Name = name
			updatedCategory := ms.categories[i]
			return &updatedCategory, nil
		}
	}
	return nil, ErrCategoryNotFound
}

// DeleteCategory deletes a category by ID (only if no tasks are associated with it)
func (ms *MemoryStorage) DeleteCategory(id int) error {
	ms.mu.Lock()
	defer ms.mu.Unlock()
	
	// Check if category exists
	categoryIndex := -1
	for i, category := range ms.categories {
		if category.ID == id {
			categoryIndex = i
			break
		}
	}
	if categoryIndex == -1 {
		return ErrCategoryNotFound
	}
	
	// Check if any tasks are associated with this category
	for _, task := range ms.tasks {
		if task.CategoryID != nil && *task.CategoryID == id {
			return ErrCategoryHasTasks
		}
	}
	
	// Remove category from slice
	ms.categories = append(ms.categories[:categoryIndex], ms.categories[categoryIndex+1:]...)
	return nil
}

// GetTasksByCategory returns all tasks for a specific category
func (ms *MemoryStorage) GetTasksByCategory(categoryID int) ([]models.Task, error) {
	ms.mu.RLock()
	defer ms.mu.RUnlock()
	
	// Verify category exists
	found := false
	for _, cat := range ms.categories {
		if cat.ID == categoryID {
			found = true
			break
		}
	}
	if !found {
		return nil, ErrCategoryNotFound
	}
	
	// Find all tasks for this category
	var categoryTasks []models.Task
	for _, task := range ms.tasks {
		if task.CategoryID != nil && *task.CategoryID == categoryID {
			categoryTasks = append(categoryTasks, task)
		}
	}
	
	return categoryTasks, nil
}