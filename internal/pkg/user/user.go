package user

import (
	"log"

	"github.com/techMeetupSF/techMeetupSF/internal/pkg/db"
)

var database db.Database

func init() {
	database = db.GetDatabase()
	_, err := database.Instance.Exec(`CREATE TABLE users IF NOT EXISTS (
		id integer SERIAL PRIMARY KEY,
		name text UNIQUE,
		//Oath key
	   );`)

	if err != nil {
		log.Fatal("Could not create table \"venues\" in database")
	}
}

//User holds name and other user related fields
type User struct {
	name string
	//key string?
}

//Save the user to db
func (u *User) Save() error {
	var err error
	_, err = database.Instance.Exec(`INSERT INTO users (address_1, address_2, address_3, name) VALUES (%s, %s, %s, %s) ON CONFLICT ON CONSTRAINT nodups DO NOTHING;`)

	if err != nil {
		log.Fatalf("failed to save venue to database: %s", err)
	}

	return err
}
