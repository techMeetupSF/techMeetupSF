package techmeetup

import (
	"testing"

	"github.com/techMeetupSF/techMeetupSF/internal/pkg/meetup"
)

var meetups = meetup.Meetups{
	{Name: "vr meetup",
		Group:       meetup.Group{Name: "vr group"},
		Venue:       meetup.Venue{Name: "vr building", AddressLine1: "vrcity", AddressLine2: "", AddressLine3: ""},
		Description: " vr ",
		RsvpCount:   6,
		Time:        int64(1543206898255),
		URL:         "www.vr.vr"},
	{Name: "go meetup",
		Group:       meetup.Group{Name: "go group"},
		Venue:       meetup.Venue{Name: "go building", AddressLine1: "gotower", AddressLine2: "", AddressLine3: ""},
		Description: "golang is what we talk about here",
		RsvpCount:   6,
		Time:        int64(1543208898256),
		URL:         "www.go.vr"},
}

func TestFindTagsInMeetup(t *testing.T) {
	vrTags := findTagsInMeetup(&meetups[0])

	if vrTags[0] != "VR" {
		t.Error("did not find tag VR")
	}
}
