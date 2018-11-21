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

//Query describes filters, paging and sorting requirments
type Query struct {
	Tags       []string
	MinRSVP    int
	PageSize   int
	PageNumber int
	SortBy     string
	Time       time.Time
}

//Query a slice of TechMeetup
func (tms *TechMeetups) Query(q Query) *TechMeetups {
	ftms := TechMeetups{}

	ftms = filterByMinRSVP(tms, q.MinRSVP)
	ftms = page(&ftms, q.PageSize, q.PageNumber)

	return &ftms
}

func filterByMinRSVP(tms *TechMeetups, minRSVP int) TechMeetups {

	ftms := TechMeetups{}

	for _, tm := range *tms {
		if tm.RsvpCount >= minRSVP {
			ftms = append(ftms, tm)
		}
	}

	return ftms
}

func page(tms *TechMeetups, size int, number int) TechMeetups {

	if size == 0 {
		size = 1
	}

	if number == 0 {
		number = 1
	}

	first := size * number
	last := first + size
	tmsLastItem := len(*tms) - 1

	if tmsLastItem < first {
		return TechMeetups{}
	}

	if tmsLastItem < last {
		last = tmsLastItem
	}

	return (*tms)[first : last+1]

}

//Get will update the current list in techmeetup
func Get() TechMeetups {

	ms := meetup.FetchMeetups()

	tms := meetupsToTechMeetups(ms)

	return tms
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
