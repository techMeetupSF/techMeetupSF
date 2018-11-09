package db

import (
	"database/sql"
	"log"
	"os"

	//registers postres for sql db
	_ "github.com/lib/pq"
)

func init() {
	DB.connect()
}

//DB holds singlton database instance and functions
var DB Database

//GetDatabase returns the singelton instance of database
func GetDatabase() Database {
	return DB
}

//Database holds an instance of the database connection
type Database struct {
	Instance *sql.DB
}

func (db *Database) connect() error {

	dbi, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))

	if err != nil {
		log.Fatalf("Error opening database: %q", err)
	}

	db.Instance = dbi

	return err
}
