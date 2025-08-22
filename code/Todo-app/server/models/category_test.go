package models

import (
	"testing"
	"github.com/stretchr/testify/assert"
)

func TestNewCategory(t *testing.T) {

	category := NewCategory(1,"Learn Go", "2023-10-01T10:00:00Z")
	assert.Equal(t, "Learn Go", category.Name)
	assert.NotEmpty(t, category.CreatedAt)
}