require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
const axios = require('axios');
var moment = require('moment');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var userInput = process.argv.slice(3).join(" ");
var term = process.argv[2];
var termsArray = ["spotify-this-song","movie-this",'do-what-it-says',"concert-this"];
var randomSearch = termsArray[Math.floor(Math.random() * termsArray.length)];

function spotifySong(userInput) {
  if (!userInput) {
    // search defaults to lose yourself if nothing is entered
    userInput = "lose yourself";
  }
  spotify.search({ type: 'track', query: userInput }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
      console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name + " - " + data.tracks.items[0].name));  // logs the artist name - track
      console.log("This song is on album: " + data.tracks.items[0].album.name)  // logs the album of the track
      if (data.tracks.items[0].preview_url === null) {
        console.log("No preview found :(. Try another song.")
      } else {
        console.log("Click the link to hear a preview of the track! " + data.tracks.items[0].preview_url)  // logs the preview link of the track
      }
    }
  });
}

function movieThis(userInput) {
  if (!userInput) {
    // defaults to mr nobody if no input is entered
    userInput = "Mr Nobody"
  } axios.get('https://www.omdbapi.com/?t=' + userInput + '&apikey=trilogy') //+ keys.omdbkey)
    .then(function (response) {
      if (userInput == "Mr Nobody") {
        console.log("If you haven't watched " + response.data.Title + " then you should: http://www.imdb.com/title/tt0485947/" + "\nIt's on Netflix\n") // omdb api does not provide an imdb link to grab from response.data
      }
      console.log("Title: " + response.data.Title + "\nDate released: " + response.data.Released + "\nProduced in: " + response.data.Country + "\nLanguages: " + response.data.Language
        + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
      console.log(response.data.Ratings[0]);
      console.log(response.data.Ratings[1]);
    }).catch(function (error) {
      console.log(error);
    })
}

function concertThis(userInput) {
  if (userInput) {
    axios.get('https://rest.bandsintown.com/artists/' + userInput + '/events?app_id=' + keys.bandsintownkey + '&date=upcoming')
      .then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
          console.log("\nName: " + response.data[i].venue.name + "\nCity: " + response.data[i].venue.city + "\nCountry: " + response.data[i].venue.country + "\nTime: " + moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm a')); // string version - all in one line doesn't look nice = console.log(JSON.stringify("Name: " + response.data[i].venue.name + " City: " + response.data[i].venue.city + " Country: " + response.data[i].venue.country + " Time: " + moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a')));
        }
      }).catch(function (error) {
        console.log(error);
      })
  } else {
    console.log("Search an artist or band!")
  }
}

function readFile() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) { return console.log(error) };
    var newData = data.split(',')
    var term = newData[0];
    var userInput = newData[1]
    switchBoard(term, userInput)
  });
}

function switchBoard(term, userInput) {
  switch (term) {
    case "spotify-this-song":
    case "song":
    case "spotify":
      spotifySong(userInput);
      break;
    case "movie-this":
    case "movie":
      movieThis(userInput);
      break;
    case "concert-this":
    case "bands-in-town":
      concertThis(userInput);
      break;
    case "do-what-it-says":
      readFile();
      break;
    default:
      console.log("LIRI doesn't know what you want to do! Try " + randomSearch + "!")
  }
}

switchBoard(term, userInput);

