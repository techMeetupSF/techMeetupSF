package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func main() {
	getMeetups()
}

const secretKey = ""

var requestURL = fmt.Sprintf("https://api.meetup.com/2/open_events?key=%s&photo-host=public&category=34&status=upcoming&page=150&zip=94102&radius=5&only=name,group.who,group.name,time,event_url,yes_rsvp_count,venue,description", secretKey)

//SetUpMeetupRequests starts the refreshing cycle of meetups
func SetUpMeetupRequests() {

}

func refreshMeetups() {

}

func getMeetups() {
	resp, err := http.Get(requestURL)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	var mr MeetupResponse
	json.NewDecoder(resp.Body).Decode(&mr)

	print(mr.Results[0].Venue.Name)
}
