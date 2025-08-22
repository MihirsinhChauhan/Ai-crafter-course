package models


type Task struct {
	id 		int
	Title string `json:"title"`
	Description string `json:"description"`
	Priority string `json:"priority"`
	CategoryID *int `json:"category_id"`
	IsComplete bool `json:"is_complete"`
	CreatedAt string `json:"created_at"`

}

func NewTask(id int, title, description, priority string, categoryID *int, isComplete bool, createdAt string) Task {
	return Task{
		id: id,
		Title: title,
		Description: description,
		Priority: priority,
		CategoryID: categoryID,
		IsComplete: isComplete,
		CreatedAt: createdAt,
	}
}