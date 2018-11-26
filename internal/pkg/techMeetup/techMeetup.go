package techmeetup

import (
	"log"
	"math"
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
		"Food":       regexp.MustCompile("(?i)food|meal"),
		"Pizza":      regexp.MustCompile("(?i)pizza"),
		"Booz":       regexp.MustCompile("(?i)booz|drinks| alcohol"),
		"React":      regexp.MustCompile("(?i)react"),
		"Angular":    regexp.MustCompile("(?i)angular "),
		"Docker":     regexp.MustCompile("(?i)docker "),
		"VR":         regexp.MustCompile("(?i) vr |virtual reality"),
		"Kubernetes": regexp.MustCompile("(?i)kubernetes"),
		"Golang":     regexp.MustCompile("((?i)golang)|Go"),
		"Blockchain": regexp.MustCompile("(?i)blockchain|bitcoin|cryptocurrency"),
	}
}

//TechMeetup holds everything related to a tech meetup
type TechMeetup struct {
	Venue     venue.Venue
	Name      string
	Datetime  time.Time
	RsvpCount int
	Tags      []string
	URL       string
	GroupName string
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
	Meetups    *TechMeetups
	Page       Page
	UniqueTags []string
}

//Page has page number, total pages and more
type Page struct {
	PageLength   int
	PageNumber   int
	TotalPages   int
	TotalMeetups int
}

//Query a slice of TechMeetup
func (tms *TechMeetups) Query(q Query) QueryResult {

	ftms := filterTechMeetups(tms, q)

	ftms, p := page(ftms, q.PageSize, q.PageNumber)

	tags := findUniqueTags(ftms)

	qr := QueryResult{
		Meetups:    ftms,
		Page:       p,
		UniqueTags: tags,
	}

	return qr
}

func filterTechMeetups(tms *TechMeetups, q Query) *TechMeetups {

	ftms := tms

	if q.MinRSVP > 0 {
		ftms = filterByMinRSVP(tms, q.MinRSVP)
	}

	if len(q.Tags) > 0 {
		ftms = filterByTags(ftms, q.Tags)
	}

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

func page(tms *TechMeetups, size int, number int) (*TechMeetups, Page) {

	if size == 0 {
		size = 40
	}

	if number == 0 {
		number = 1
	}

	last := size * number
	first := last - size
	tmsLastItem := len(*tms)

	if tmsLastItem < first {
		return &TechMeetups{}, Page{}
	}

	if tmsLastItem < last {
		last = tmsLastItem
	}

	ptms := (*tms)[first:last]

	pageLength := len(ptms)
	totalMeeups := len(*tms)
	totalPages := int(math.Ceil(float64(totalMeeups) / float64(size)))

	p := Page{
		PageLength:   pageLength,
		PageNumber:   number,
		TotalPages:   totalPages,
		TotalMeetups: totalMeeups,
	}

	return &ptms, p

}

//Get will update the current list in techmeetup
func Get() (TechMeetups, error) {

	ms, err := meetup.FetchMeetups()

	if err != nil {
		log.Print("Error when fetching meetups :", err)
	}

	tms := meetupsToTechMeetups(ms)

	return tms, err
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
		tm.URL = m.URL
		tm.GroupName = m.Group.Name

		tms = append(tms, tm)
	}

	return tms
}

func milisecondToTime(mili int64) time.Time {
	nanoseconds := milisecondsToNanoseconds(mili)
	t := time.Unix(0, nanoseconds)

	return t
}

func milisecondsToNanoseconds(mili int64) int64 {
	return mili * 1000000
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
