package models

import "time"

type Category struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"createdAt"`
}

// NewCategory creates a new category with auto-generated timestamp
// ID will be set by the storage layer
func NewCategory(name string) Category {
	return Category{
		Name:      name,
		CreatedAt: time.Now().Format(time.RFC3339),
	}
}

// NewCategoryWithID creates a new category with specified ID (used internally by storage)
func NewCategoryWithID(id int, name, createdAt string) Category {
	return Category{
		ID:        id,
		Name:      name,
		CreatedAt: createdAt,
	}
}