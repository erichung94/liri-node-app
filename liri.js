var fs = require('fs');
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var command = process.argv[2]
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");

switch(command){

case "concert-this":
var artist = process.argv.slice(3).join(" "); 
var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
axios({
    method: 'get',
    url: queryURL,
    responseType: 'JSON'
})
.then(function(response, err){
    console.log("\nVenue: " + response.data[0].venue.name);
    console.log("Located at " + response.data[0].venue.city + ", " + response.data[0].venue.region);
})

break;

//case "spotify-this-song":
//var songName = process.argv.slice(3).join(" ");



//break;

case "movie-this":
var movieName = process.argv.slice(3).join(" ");
var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieName;

axios({
    method: 'get',
    url: queryURL,
    responseType: 'JSON'
})
.then(function(response,err){
    var a = response.data;
    function printMovie(){
        console.log("\nMovie Title: " + a.Title + "\nYear Released: " + a.Year + 
        "\nIMDB Rating: " + a.Ratings[0].Value + "\nRotten Tomatos Rating: " + a.Ratings[1].Value +
        "\nProduced in: " + a.Country + "\nLanguage: " + a.Language +
        "\nPlot: " + a.Plot + "\nActors: " + a.Actors);
    }
    if (a.Response === "False"){
        var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=Mr.Nobody";
        axios({
            method: 'get',
            url: queryURL,
            responseType: 'JSON'
        })
        .then(function(response,err){
            printMovie();
    });
    }
    else {
    printMovie();
    }
})

break;

case "do-what-it-says":
//Runs the command on random.txt.

break;

default:
}