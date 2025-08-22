package main

import (
	"fmt"
	"net/http"
	"strings"
)
//server.go

type PlayerStore interface {
	GetPlayerScore(name string) int
}

type PlayerServer struct {
	store PlayerStore
}

func (p *PlayerServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	player := strings.TrimPrefix(r.URL.Path, "/players/")

	// w.WriteHeader(http.StatusNotFound)
	score := p.store.GetPlayerScore(player)
    if score == 0 {
        w.WriteHeader(http.StatusNotFound)
    } else {
        w.WriteHeader(http.StatusOK)
    }
	fmt.Fprint(w, p.store.GetPlayerScore(player))
}
func GetPlayerScore(name string) string {
	if name == "Pepper" {
		return "20"
	}

	if name == "Floyd" {
		return "10"
	}

	return ""
}