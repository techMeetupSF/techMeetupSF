package main

import (
	"net/http"
	"os"
)

func main() {
	fs := http.FileServer(http.Dir("static"))

	http.Handle("/", fs)

	port := os.Getenv("PORT")

	http.ListenAndServe(":"+port, nil)
}
