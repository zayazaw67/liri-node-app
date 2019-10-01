require("dotenv").config();
var Spotify = require('node-spotify-api');
var spotifyKeys = require("./keys.js");

console.log(spotifyKeys)
var spotify = new Spotify({
//   id: spotifyKeys.id,
//   secret: spotifyKeys.secret
});
 
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data); 
// });