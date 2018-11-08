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
var DB database

//DB holds an instance of the database connection
type database struct {
	instance *sql.DB
}

func (db *database) connect() error {

	dbi, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))

	if err != nil {
		log.Fatalf("Error opening database: %q", err)
	}

	db.instance = dbi

	return err
}
