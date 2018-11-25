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

//QueryResult is the returned struct when querying the meetups
type QueryResult struct {
	Meetups         *TechMeetups
	Showing         int
	Total           int
	UnfilteredTotal int
	UniqueTags      []string
}

//Query a slice of TechMeetup
func (tms *TechMeetups) Query(q Query) QueryResult {

	totalLen := len(*tms)

	ftms := filterTechMeetups(tms, q)

	totalFilteredLen := len(*ftms)

	*ftms = page(ftms, q.PageSize, q.PageNumber)

	pageLen := len(*ftms)

	tags := findUniqueTags(ftms)

	qr := QueryResult{
		Meetups:         ftms,
		Showing:         pageLen,
		Total:           totalFilteredLen,
		UnfilteredTotal: totalLen,
		UniqueTags:      tags,
	}

	return qr
}

func filterTechMeetups(tms *TechMeetups, q Query) *TechMeetups {
	ftms := filterByMinRSVP(tms, q.MinRSVP)
	ftms = filterByTags(tms, q.Tags)

	return ftms
}

func filterByTags(tms *TechMeetups, tags []string) *TechMeetups {
	ftms := TechMeetups{}

	tagsMap := map[string]bool{}

	for _, tag := range tags {
		tagsMap[tag] = true
	}

	for _, tm := range *tms {
		for _, tag := range tm.Tags {
			if _, ok := tagsMap[tag]; ok {
				ftms = append(ftms, tm)
				break
			}
		}
	}

	return &ftms
}

func findUniqueTags(tms *TechMeetups) []string {
	uniqueTags := map[string]bool{}

	for _, tm := range *tms {
		for _, tag := range tm.Tags {
			uniqueTags[tag] = true
		}
	}

	tags := []string{}

	for utag := range uniqueTags {
		tags = append(tags, utag)
	}

	return tags
}

func filterByMinRSVP(tms *TechMeetups, minRSVP int) *TechMeetups {

	ftms := TechMeetups{}

	for _, tm := range *tms {
		if tm.RsvpCount >= minRSVP {
			ftms = append(ftms, tm)
		}
	}

	return &ftms
}

func page(tms *TechMeetups, size int, number int) TechMeetups {

	if size == 0 {
		size = 1
	}

	if number == 0 {
		number = 1
	}

	first := size * number
	last := (first + size) - 1
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
