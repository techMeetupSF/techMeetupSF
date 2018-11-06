package main

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

type db struct {
	instance *sql.DB
}

func (d *db) connect() error {
	var err error

	dbURL, ok := os.LookupEnv("DATABASE_URL")

	if !ok {
		log.Fatalln("$DATABASE_URL is required")
	}

	if err != nil {
		log.Fatalf("Connection error: %s", err.Error())
	}

	port, ok := os.LookupEnv("PORT")

	if !ok {
		port = "8080"
	}

	db, err := sql.Open("postgres", dbURL)

	err = db.Ping()

	if err != nil {
		return err
	}

	_, err = db.Exec(`
    CREATE TABLE IF NOT EXISTS users (
      id       SERIAL,
      username VARCHAR(64) NOT NULL UNIQUE,
      CHECK (CHAR_LENGTH(TRIM(username)) > 0)
    );
  `)

	if err != nil {
		return err
	}

	d.instance = db

	return err
}
