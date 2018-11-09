package main

import (
	"log"
	"net/http"
	"os"
)

func main() {

	fs := http.FileServer(http.Dir("./web"))

	http.Handle("/", fs)

	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("$PORT must be set")
	}

	log.Printf("Now listening on %s", port)
	http.ListenAndServe(":"+port, nil)
}
