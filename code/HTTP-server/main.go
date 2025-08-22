package main

import (
	"log"
	"net/http"
	
)

func main() {
	server := &PlayerServer{}
	log.Println("Starting server on :5000")
	log.Fatal(http.ListenAndServe(":5000", server))
}