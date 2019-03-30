var fs = require('fs');
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var command = process.argv[2]
var input = process.argv.slice(3).join(" ");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");

userInputs(command, input);
function userInputs(command, input){
    switch(command){
        case "concert-this":
            concertInfo(input);
        break;
        
        case "spotify-this-song":
            spotifyInfo(input);
        break;
        
        case "movie-this":
            movieInfo(input);
        break;

        case "do-what-it-says":
            doWhatInfo();
        break;

        default: 
            console.log("Invalid option. Please type in valid option.");
        break;
    }
}

function concertInfo(input){ 
        var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
        var formattedDate = "";
        axios({
            method: 'get',
            url: queryURL,
            responseType: 'JSON'
        })
        .then(function(response, err){
            for (i=0; i<3; i++){
            formattedDate = moment(response.data[i].datetime).format('LL');
            console.log("--------------------------------------------------------------------------");
            console.log("\nVenue: " + response.data[i].venue.name);
            console.log("Located at " + response.data[i].venue.city + ", " + response.data[i].venue.region);
            console.log("Date: " + formattedDate + "\n");
            console.log("--------------------------------------------------------------------------");
            }
        })
}
function spotifyInfo(input){
    if (input == ""){
        input = "The Sign";
    }
    spotify.search(
        {
            type: "track",
            query: input
        },
        function (err, data){
        var songs = data.tracks.items;
            for (i=0;i<songs.length;i++){
            console.log("--------------------------------------------------------------------------");
            console.log(i);
            console.log("Artist(s): " + songs[i].artists[0].name);
            console.log("Name of the song: " + songs[i].name);
            console.log("Preview Link: " + songs[i].preview_url);
            console.log("Album: " + songs[i].album.name + "\n");
            console.log("--------------------------------------------------------------------------");  
            }
        }
    ) 
}

function movieInfo(input){
    if (input === ""){
        input = "Mr. Nobody";
        console.log("If you haven't watched Mr. Nobody, then you should!");
        console.log("Here's some info on it, it's on Netflix!");
    }

    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + input;
     axios({
        method: 'get',
        url: queryURL,
        responseType: 'JSON'
    })
    .then(function(response,err){
        var movie = response.data;
        if (movie.Ratings === undefined){
            console.log("\nNot a valid movie name!");
            return;
        }
        else{
            console.log("--------------------------------------------------------------------------");
            console.log("\nMovie Title: " + movie.Title + "\nYear Released: " + movie.Year + 
            "\nIMDB Rating: " + movie.Ratings[0].Value + "\nRotten Tomatos Rating: " + movie.Ratings[1].Value +
            "\nProduced in: " + movie.Country + "\nLanguage: " + movie.Language +
            "\nPlot: " + movie.Plot + "\nActors: " + movie.Actors +"\n");
            console.log("--------------------------------------------------------------------------");
        }

    })    
}
 
function doWhatInfo(){
    fs.readFile('random.txt', 'utf8', function(err, data){
        if (err){ 
            return console.log(err);
        }
        var dataArr = data.split(',');
        userInputs(dataArr[0], dataArr[1]);
    });
}