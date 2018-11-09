package techmeetup

import (
	"regexp"
	"time"

	"github.com/techMeetupSF/techMeetupSF/internal/pkg/db"
	"github.com/techMeetupSF/techMeetupSF/internal/pkg/meetup"
	"github.com/techMeetupSF/techMeetupSF/internal/pkg/venue"
)

var database db.Database

var tagsRegex map[string]*regexp.Regexp

func init() {
	tagsRegex = map[string]*regexp.Regexp{
		"Food":   regexp.MustCompile("(?i)food|meal"),
		"Pizza":  regexp.MustCompile("(?i)pizza"),
		"Booz":   regexp.MustCompile("(?i)booz|drinks|alcohol"),
		"React":  regexp.MustCompile("(?i)react"),
		"Golang": regexp.MustCompile("(?i)go|golang"),
	}
}

// func techMeetupEndpointHandler(w http.ResponseWriter, r *http.Request) {
// 	v := r.URL.Query()

// 	rsvpMin, err := strconv.Atoi(v["rsvpMin"][0])

// 	if err != nil {
// 		log.Print(err)
// 	}

// 	pageNumber, err := strconv.Atoi(v["pageNumber"][0])

// 	if err != nil {
// 		log.Print(err)
// 	}

// 	pageSize, err := strconv.Atoi(v["pageSize"][0])

// 	if err != nil {
// 		log.Print(err)
// 	}

// 	mq := techMeetupQuery{
// 		tags:       v["tags"],
// 		rsvpMin:    rsvpMin,
// 		pageSize:   pageSize,
// 		pageNumber: pageNumber,
// 		sortBy:     v["sortBy"][0],
// 	}

// 	w.Write()

// }

//TechMeetup holds everything related to a tech meetup
type TechMeetup struct {
	Venue     venue.Venue
	Name      string
	Datetime  time.Time
	RsvpCount int
	Tags      []string
}

//TechMeetups holds the result list of meetups
type TechMeetups []TechMeetup

type techMeetupQuery struct {
	tags       []string
	rsvpMin    int
	pageSize   int
	pageNumber int
	sortBy     string
	time       time.Time
}

//UpdateTechMeetups will update the current list in techmeetup
func UpdateTechMeetups() {

	ms := meetup.FetchMeetups()

	tms := meetupsToTechMeetups(ms)

	println(len(tms))

}

func meetupsToTechMeetups(ms meetup.Meetups) TechMeetups {

	tms := TechMeetups{}

	for _, m := range ms {
		tm := TechMeetup{}

		tm.Name = m.Name
		tm.RsvpCount = m.RsvpCount
		tm.Datetime = milisecondToTime(m.Time)
		tm.Tags = findTagsInMeetup(&m)
		tm.Venue = venue.FromMeetupVenue(m.Venue)

		tms = append(tms, tm)
	}

	return tms
}

func milisecondToTime(mili int64) time.Time {
	t := time.Unix(0, mili*int64(time.Millisecond))

	return t
}

func findTagsInMeetup(m *meetup.Meetup) []string {

	tagsFound := []string{}

	for tagName := range tagsRegex {
		matched := tagsRegex[tagName].MatchString(m.Description)

		if matched {
			tagsFound = append(tagsFound, tagName)
		}
	}

	return tagsFound
}
