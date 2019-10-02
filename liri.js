require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
const axios = require('axios');
var moment = require('moment');
var spotify = new Spotify(keys.spotify);
var userInput = process.argv.slice(3).join(" ");
var term = process.argv[2];

if (term == "spotify-this-song") {
  if (userInput == true) {
  spotify.search({ type: 'track', query: userInput }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else
      (console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name +
        " - " + data.tracks.items[0].name)));  // logs the artist name - track
    console.log("This song is on album: " + data.tracks.items[0].album.name)  // logs the album of the track
    console.log("Click the link to hear a preview of the track! " + data.tracks.items[0].preview_url)  // logs the preview link of the track
  });
} else {
  spotify.search({ type: 'track', query: "the sign" }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else 
    (console.log(datatracks.items[0].album.artists[0].name))
  })
}} else if (term == "concert-this") {
  if (userInput == true) {
  axios.get('https://rest.bandsintown.com/artists/' + userInput + '/events?app_id=' + keys.bandsintownkey + '&date=upcoming')
    .then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        console.log("Name: " + response.data[i].venue.name + "\nCity: " + response.data[i].venue.city + "\nCountry: " + response.data[i].venue.country + "\nTime: " + moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm a')); // string version - all in one line doesn't look nice = console.log(JSON.stringify("Name: " + response.data[i].venue.name + " City: " + response.data[i].venue.city + " Country: " + response.data[i].venue.country + " Time: " + moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a')));
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  } else {
    console.log("Search an artist or band!")
  }
} else if (term == "movie-this") {
  if (userInput == true) {
    axios.get('https://www.omdbapi.com/?t=' + userInput + '&apikey=trilogy') //+ keys.omdbkey)
      .then(function (response) {
        console.log("Title: " + response.data.Title + "\nDate released: " + response.data.Released + "\nProduced in: " + response.data.Country + "\nLanguages: " + response.data.Language
          + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
        // Can't add this inside above console.log. it comes up as [object Object] ???
        console.log(response.data.Ratings[0]);
        console.log(response.data.Ratings[1]);
      })
      .catch(function (error) {
        console.log(error);
      })
  } else {
  axios.get('https://www.omdbapi.com/?t=mr+nobody&apikey=trilogy')
  .then(function (response) {
    console.log("If you haven't watched " + response.data.Title + " then you should: http://www.imdb.com/title/tt0485947/") // omdb api does not provide an imdb link to grab from response.data
  })
  .catch(function (error) {
    console.log(error);
  })
  }
} 