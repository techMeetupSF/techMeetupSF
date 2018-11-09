package venue

import (
	"os/user"

	"github.com/techMeetupSF/techMeetupSF/internal/pkg/db"
	"github.com/techMeetupSF/techMeetupSF/internal/pkg/meetup"
)

var database db.Database

// func init() {
// 	database = db.GetDatabase()
// 	_, err := database.Instance.Exec(`CREATE TABLE venues IF NOT EXISTS (
// 		id integer SERIAL PRIMARY KEY,
// 		name text UNIQUE,
// 		address_1 text,
// 		address_2 text,
// 		address_3 text,
// 	   );`)

// 	if err != nil {
// 		log.Fatal("Could not create table \"venues\" in database")
// 	}
// }

//Venue contains venue details
type Venue struct {
	Name string
}

//Rating holds a rating from 1-5 given to a venue
type Rating struct {
	Venue  *Venue
	rating int
	user   user.User
}

//Save will put or update the venue in the database
// func (v *Venue) Save() error {
// 	var err error
// 	_, err = database.Instance.Exec(`INSERT INTO venues (address_1, address_2, address_3, name) VALUES (%s, %s, %s, %s) ON CONFLICT ON CONSTRAINT nodups DO NOTHING;`)

// 	if err != nil {
// 		log.Fatalf("failed to save venue to database: %s", err)
// 	}

// 	return err
// }

//FromMeetupVenue returns a venue from meeup.com's venue
func FromMeetupVenue(mv meetup.Venue) Venue {
	tmv := Venue{}

	tmv.Name = mv.Name

	return tmv
}
