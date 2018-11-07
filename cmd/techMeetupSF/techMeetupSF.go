package main

import (
	"net/http"
	"os"
)

func main() {
	fs := http.FileServer(http.Dir("../../client/static"))

	http.Handle("/", fs)

        port := os.Getenv("PORT")

        if port == "" {
          log.Fatal("$PORT must be set")
        }

        http.ListenAndServe(":" + port, nil)
}
