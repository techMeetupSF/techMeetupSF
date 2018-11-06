package main

//MeetupResponse contains the raw response from the API
type MeetupResponse struct {
	Results []Meetup
}

//Meetup contains meetup details
type Meetup struct {
	Name  string `json:"name"`
	Venue Venue  `json:"venue"`
}

func (m *Meetup) save() error {
	//save to database
}

//Venue contains venue details
type Venue struct {
	Name         string `json:"name"`
	AddressLine1 string `json:"address_1"`
	AddressLine2 string `json:"address_2"`
	AddressLine3 string `json:"address_3"`
}
