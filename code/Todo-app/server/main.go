package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"todo-backend/handlers"
	"todo-backend/storage"
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
	router := gin.Default()

	// Add CORS middleware
	router.Use(setupCORS())

	// Initialize unified storage
	memoryStorage := storage.NewMemoryStorage()

	// Initialize handlers
	taskHandler := handlers.NewTaskHandler(memoryStorage)
	categoryHandler := handlers.NewCategoryHandler(memoryStorage)

	// Health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "healthy",
			"message": "Todo API is running",
		})
	})

	// API routes
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
		api.GET("/categories/:id/tasks", categoryHandler.GetCategoryTasks)
	}

	// Start server
	log.Println("Starting server on :8081")
	if err := router.Run(":8081"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
