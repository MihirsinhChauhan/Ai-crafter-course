package models

type Category struct {
	id int
	Name string `json:"name"`
	CreatedAt string `json:"created_at"`
}

func NewCategory(id int, name, createdAt string) Category {
	return Category{
		id: id,
		Name: name,
		CreatedAt: createdAt,
	}
}