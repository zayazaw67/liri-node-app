require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
const axios = require('axios');
console.log(keys)

var spotify = new Spotify(keys.spotify);
var userInput = process.argv.slice(3).join(" ");
var term = process.argv[2];

if (term == "spotify-this-song") {

spotify.search({ type: 'track', query: userInput }, function(err, data) { 
  if (err) {
    return console.log('Error occurred: ' + err);
  } else 
  (
  // combine these later, separate lines with \n
  console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name)));  // logs the artist name
  // console.log(data.tracks.items[0].name)  // logs the track name
  // console.log(data.tracks.items[0].album.name)  // logs the album of the track
  // console.log(data.tracks.items[0].preview_url)  // logs the preview link of the track
});
}