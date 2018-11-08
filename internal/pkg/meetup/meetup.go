package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

//MeetupResponse contains the raw response from the API
type MeetupResponse struct {
	Results []Meetup
}

//Meetup contains meetup details
type Meetup struct {
	Name  string `json:"name"`
	Venue Venue  `json:"venue"`
}

//Venue contains venue details
type Venue struct {
	Name         string `json:"name"`
	AddressLine1 string `json:"address_1"`
	AddressLine2 string `json:"address_2"`
	AddressLine3 string `json:"address_3"`
}

func (m *Meetup) save() error {
	//save to database
}

func (ms *[]Meetup) saveAll() error {
	//save to database
}

const secretKey = ""

var requestURL = fmt.Sprintf("https://api.meetup.com/2/open_events?key=%s&photo-host=public&category=34&status=upcoming&page=150&zip=94102&radius=5&only=name,group.who,group.name,time,event_url,yes_rsvp_count,venue,description", secretKey)

//GetMeetups fetches new meetups from the API
func GetMeetups() []Meetup {
	resp, err := http.Get(requestURL)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	var mr MeetupResponse
	json.NewDecoder(resp.Body).Decode(&mr)

	return mr.Results
}
