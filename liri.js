require("dotenv").config();

var request = require("request");
var fs = require("fs");
var keys = require("./keys");
var Spotify = require();
var spotify = new Spotify();
var liriReturn = process.argv[2]; 
var movieName = process.argv[3];


switch (liriReturn) {
    case "concert-this":  //bands in town
    searchForBandsInTown(searchTerm);
    break;

    case "spotify-your-song": //spotify
    spotifyThisSong(searchTerm);
    break;

    case "movie-this": //omdbapi
    movieThis(searchTerm);
    break;
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
function spotifyThisSong(trackName) {
    var trackName = process.argv[3];
    if (!trackName) {
        trackName = "Your Song";
    };
    songRequest = trackName;
    spotify.search({
        type: "track",
        query: songRequest
    },
        function (err, data) {
            if (!err) {
                var trackInfo = data.tracks.items;
                for (var i = 0; i < 5; i++) {
                    if (trackInfo[i] != undefined) {
                        var spotifyResults =
                            "Artist: " + trackInfo[i].artists[0].name + "\n" +
                            "Song: " + trackInfo[i].name + "\n" +
                            "Preview URL: " + trackInfo[i].preview_url + "\n" +
                            "Album: " + trackInfo[i].album.name + "\n"

                        console.log(spotifyResults);
                        console.log(' ');
                    };
                };
            } else {
                console.log("error: " + err);
                return;
            };
        });
};
  
// OMDBAPI function
function movieThis() {

    //using name from var list at top
    var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";

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

function doWhatItSays() {

    fs.writeFile("random.txt", 'spotify-this-song,"Your Song"', function (err) {
        var song = "spotify-this-song 'Your Song'"
        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        };

        // Otherwise, it will print:
        console.log(song);
    });
};