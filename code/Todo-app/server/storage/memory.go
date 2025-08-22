package storage

import "todo-backend/models"

type CategoryStorage struct {
	categories []models.Category
}

type TaskStorage struct {
	tasks []models.Task
}
func NewTaskStorage() *TaskStorage {
	return &TaskStorage{
		tasks: []models.Task{},
	}
}

func (ts *TaskStorage) AddTask(task models.Task) {
	ts.tasks = append(ts.tasks, task)
}

func NewCategoryStorage() *CategoryStorage {
	return &CategoryStorage{
		categories: []models.Category{},
	}
}

func (cs *CategoryStorage) AddCategory(category models.Category) {
	cs.categories = append(cs.categories, category)
}