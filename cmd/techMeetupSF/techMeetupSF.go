package techMeetupSF

import (
	"net/http"
	"os"
)

func main() {
	fs := http.FileServer(http.Dir("../../client/static"))

	http.Handle("/", fs)

	port, ok := os.LookupEnv("PORT")

	if !ok {
		port = ":8080"
	}

	http.ListenAndServe(port, nil)
}
