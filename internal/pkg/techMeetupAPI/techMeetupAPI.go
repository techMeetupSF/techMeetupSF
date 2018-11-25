package techmeetupapi

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	techmeetup "github.com/techMeetupSF/techMeetupSF/internal/pkg/techMeetup"
)

var tmsCache techmeetup.TechMeetups

func init() {

	tmsCache = techmeetup.Get()

	go func() {
		t := time.NewTicker(time.Minute)

		for range t.C {
			log.Println("Next update to Meetups in two hours")
			tmsCache = techmeetup.Get()
		}
	}()

}

//Handler will handle queries for techMeeups
func Handler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	tmq := getQueryFromRequest(r)

	tms := tmsCache.Query(tmq)

	jsonb, err := json.Marshal(tms)

	if err != nil {
		log.Fatal(err)
	}

	w.Write(jsonb)

}

func getQueryFromRequest(r *http.Request) techmeetup.Query {

	err := r.ParseForm()

	if err != nil {
		log.Print(err)
	}

	tags := r.Form["tags"]

	sortBy := r.Form.Get("sortBy")

	rsvpMin, err := strconv.Atoi(r.Form.Get("rsvpMin"))

	if err != nil {
		log.Print(err)
	}

	pageNumber, err := strconv.Atoi(r.Form.Get("pageNumber"))

	if err != nil {
		log.Print(err)
	}

	pageSize, err := strconv.Atoi(r.Form.Get("pageSize"))

	if err != nil {
		log.Print(err)
	}

	mq := techmeetup.Query{
		Tags:       tags,
		MinRSVP:    rsvpMin,
		PageSize:   pageSize,
		PageNumber: pageNumber,
		SortBy:     sortBy,
	}

	return mq
}
