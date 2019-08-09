require("dotenv").config();

var request = require("request");
var fs = require("fs");
var keys = require("./keys");
var Spotify = require();
var spotify = new Spotify();
//vars to capture user inputs.
var liriReturn = process.argv[2]; 
var name = process.argv[3];


switch (liriReturn) {
    case "spotify-this-song":
    spotifyThisSong();
    break;

    case "movie-this":
    movieThis();
    break;
}


  

        