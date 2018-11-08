require ('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const secret = require('./api_key.js');
const constants = require('./constants.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const firstFetch = `https://api.meetup.com/2/open_events?key=${secret.key}&photo-host=public&category=34&status=upcoming&page=${constants.EVENTS_LOW}&zip=94102&radius=5&only=name,group.who,group.name,time,event_url,yes_rsvp_count,venue.name,description,venue.address_1,group.id`
const secondFetch = `https://api.meetup.com/2/open_events?key=${secret.key}&photo-host=public&category=34&status=upcoming&page=${constants.EVENTS_HIGH}&zip=94102&radius=5&only=name,group.who,group.name,time,event_url,yes_rsvp_count,venue.name,description,venue.address_1,group.id`
app.get('/api/twentyEvents', (req, res) => {
	const options = {
    url: firstFetch,
	  method: "GET",
	  json: true,
	};

	function callback(error, response, body) {
		if (response) {
			res.statusCode = response.statusCode;
			console.log(`API responded with ${response.statusCode}`);
		} else {
			res.statusCode = 404;
			console.log("Could not connect to API");
		}
	  res.setHeader('Content-Type', 'application/json');
	  res.send(response.body);
	}

	request(options, callback);
});



app.get('/api/twoHundredEvents', (req, res) => {
	const options = {
    url: secondFetch,
	  method: "GET",
	  json: true,
	};

	function callback(error, response, body) {
		if (response) {
			res.statusCode = response.statusCode;
			console.log(`API responded with ${response.statusCode}`);
		} else {
			res.statusCode = 404;
			console.log("Could not connect to API");
		}
	  res.setHeader('Content-Type', 'application/json');
	  res.send(response.body);
	}

	request(options, callback);
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
