require("dotenv").config();

var request = require("request");
var fs = require("fs");
var keys = require("./keys");
var Spotify = require("node-Spotify-API");
var spotify = new Spotify(keys.spotify);
var liriReturn = process.argv[2]; 
var movieName = process.argv[3];

function mySwitch(liriReturn) {
    
switch (liriReturn) {
    case "concert-this":  //bands in town
    searchForBandsInTown(searchTerm);
    break;

    case "spotify-your-song": //spotify
    getSpotify();
    break;

    case "movie-this": //omdbapi
    movieThis(searchTerm);
    break;
}
}
//bands in town api function//
function searchForBandsInTown(artist) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function(response) {
            if(response.data[0].venue !=  undefined) {
                console.log("Event Veunue: " + response.data[0].venue.name);
                console.log("Event Location: " + response.data[0].venue.city);
                var eventDateTime = moment(response.data[0].datetime);
                console.log("Event Date & Time: " + eventDateTime.format("dddd, MMMM Do YYYY"));
            }
            else {
                console.log("No results found.");
            }
        }
    ).catch(function (error) {
        console.log (error);
  });
}

//SPOTIFY API function
var getSpotify = function (trackName) {
    if (trackName === undefined) {
        trackName = "Your Song";
    };

    spotify.search({
        type: "track",
        query: trackName
    },
        function (err, data) {
            if (!err) {
                console.log("Error Occurred: " + err);
                return;
            }
             
            
                var songName = data.tracks.items;
                for (var i = 0; i < songName.length; i++) {
                            console.log(i);
                            console.log("Artist: " + songName[i].artists[0].name);
                            console.log("Song: " + songName[i].name);
                            console.log("Preview URL: " + songName[i].preview_url);
                            console.log("Album: " + songName[i].album.name);
                    
                }
            
        })
};
  
// OMDBAPI function
function movieThis() {

    //using name from var list at top
    var queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var myMovieData = JSON.parse(body);
            var queryUrlResults =
                "Title: " + myMovieData.Title + "\n" +
                "Year: " + myMovieData.Year + "\n" +
                "IMDB Rating: " + myMovieData.Ratings[0].Value + "\n" +
                "Rotten Tomatoes Rating: " + myMovieData.Ratings[1].Value + "\n" +
                "Origin Country: " + myMovieData.Country + "\n" +
                "Language: " + myMovieData.Language + "\n" +
                "Plot: " + myMovieData.Plot + "\n" +
                "Actors: " + myMovieData.Actors + "\n"

            console.log(queryUrlResults);
        } else {
            console.log("error: " + err);
            return;
        };
    });
};

