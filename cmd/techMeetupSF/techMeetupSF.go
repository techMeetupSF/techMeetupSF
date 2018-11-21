package main

import (
	"log"
	"net/http"
	"os"

	techmeetupapi "github.com/techMeetupSF/techMeetupSF/internal/pkg/techMeetupAPI"
)

func main() {

	fs := http.FileServer(http.Dir("./web"))

	http.Handle("/", fs)
	http.HandleFunc("/meetups", techmeetupapi.Handler)

	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("$PORT must be set")
	}

	log.Printf("Now listening on %s", port)
	http.ListenAndServe(":"+port, nil)
}
