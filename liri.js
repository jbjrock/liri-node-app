require("dotenv").config();

//Require data from axios nmp package
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var userInput = process.argv[2];

var userCommand = process.argv.slice(3).join(" ");

// Switch case
var switchCase = function (userInput, userCommand) {
    switch (userInput) {
        case "concert-this":
            var queryUrl = "https://rest.bandsintown.com/artists/" + userCommand + "/events?app_id=codingbootcamp";
            axios.get(queryUrl)
                .then(function (response) {
                    for (var i = 0; i < response.data.length; i++) {
                        console.log("Venue Name: " + response.data[i].venue.name);
                        console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                        console.log("Event Date: " + response.data[i].datetime);
                        console.log("----------------------");
                    }
                });

            break;

        case "spotify-this-song":
            spotify
                .search({
                    type: 'track',
                    query: userCommand,
                    limit: 2
                }, function (err, data) {
                    if (err) {
                        return console.log("Error occurred: " + err);
                    }
                    var song = data.tracks.items;
                    for (var i = 0; i < song.length; i++) {
                        console.log("Artist: " + song[i].artists[0].name);
                        console.log("Song Name: " + song[i].name);
                        console.log("Preview: " + song[i].preview_url);
                        console.log("Album: " + song[i].album.name);
                        console.log("-----------------");
                    }
                });

            break;

        case "movie-this":
            var queryUrl = "http://www.omdbapi.com/?t=" + userCommand + "&y=&plot=short&apikey=trilogy";
            axios.get(queryUrl)
                .then(function (response) {
                    console.log("Title: " + response.data.Title);
                    console.log("Release Year: " + response.data.Year);
                    console.log("IMDB Rating: " + response.data.Ratings[0].Value);
                    console.log("Rotten Tomatoes Ratings: " + response.data.Ratings[1].Value);
                    console.log("Country Produced: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Plot: " + response.data.Plot);
                    console.log("Actors: " + response.data.Actors);

                });

            break;

        case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function (error, data) {
                if (error) {
                    return console.log(error)
                };
                console.log(data);
                var dataArr = data.split(",");
                console.log(dataArr)
            });


    }
};

switchCase(userInput, userCommand);

