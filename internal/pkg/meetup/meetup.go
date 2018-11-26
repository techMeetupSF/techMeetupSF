package meetup

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/techMeetupSF/techMeetupSF/internal/pkg/db"
)

var database db.Database

//APIResponse contains the raw response from the API
type APIResponse struct {
	Results Meetups
}

//Meetups holds a slice of Meetup
type Meetups []Meetup

//Meetup contains meetup details
type Meetup struct {
	Name        string `json:"name"`
	Group       Group  `json:"group"`
	Venue       Venue  `json:"venue"`
	Description string `json:"description"`
	RsvpCount   int    `json:"yes_rsvp_count"`
	Time        int64  `json:"time"`
	URL         string `json:"event_url"`
}

//Venue is the meetup.com's venue model
type Venue struct {
	Name         string `json:"name"`
	AddressLine1 string `json:"address_1"`
	AddressLine2 string `json:"address_2"`
	AddressLine3 string `json:"address_3"`
}

//Group holds the meetup.com's group name
type Group struct {
	Name string `json:"name"`
}

var secretKey = os.Getenv("MEETUP_API_KEY")

var requestURL = fmt.Sprintf("https://api.meetup.com/2/open_events?key=%s&photo-host=public&category=34&status=upcoming&page=150&zip=94102&radius=5&text_format=plain", secretKey)

//FetchMeetups fetches new meetups from the API
func FetchMeetups() []Meetup {

	var err error

	resp, err := http.Get(requestURL)

	if err != nil {
		log.Print(err)
	}

	log.Print("Request sent to Meetup.com, response code: ", resp.StatusCode)

	defer resp.Body.Close()

	var r APIResponse

	err = json.NewDecoder(resp.Body).Decode(&r)

	if err != nil {
		log.Print(err)
	}

	log.Printf("Recived %d Meetups from the API", len(r.Results))
	return r.Results
}
