package techmeetupapi

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	techmeetup "github.com/techMeetupSF/techMeetupSF/internal/pkg/techMeetup"
)

var tmsCache techmeetup.TechMeetups

func init() {
	tmsCache = techmeetup.Get()
}

//Handler will handle queries for techMeeups
func Handler(w http.ResponseWriter, r *http.Request) {

	tmq := getQueryFromRequest(r)

	tms := tmsCache.Query(tmq)

	jsonb, err := json.Marshal(tms)

	if err != nil {
		log.Fatal(err)
	}

	w.Write(jsonb)

}

func getQueryFromRequest(r *http.Request) techmeetup.Query {

	v := r.URL.Query()

	rsvpMin, err := strconv.Atoi(v["rsvpMin"][0])

	if err != nil {
		log.Print(err)
	}

	pageNumber, err := strconv.Atoi(v["pageNumber"][0])

	if err != nil {
		log.Print(err)
	}

	pageSize, err := strconv.Atoi(v["pageSize"][0])

	if err != nil {
		log.Print(err)
	}

	mq := techmeetup.Query{
		Tags:       v["tags"],
		MinRSVP:    rsvpMin,
		PageSize:   pageSize,
		PageNumber: pageNumber,
		SortBy:     v["sortBy"][0],
	}

	return mq
}
