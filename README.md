Node.js Liri App.
Demo video:
https://drive.google.com/file/d/1ZuGQHyufPtC9h3apFC874LODHlWNFhIG/view

Liri is the budget Siri, where you can type in one of four commands: 
- concert-this
- spotify-this-song
- movie-this
- do-what-it-says
and it will provide you with information based on what you gave it. 

concert-this (Requires User Input):
typing in $node liri.js concert-this (Your Input Here), provides you a list of upcoming concerts based on the band you provided, and information on the venue and date.

spotify-this-song (Requires User Input):
typing in $node liri.js spotify-this-song (Your Input Here), provides you a list of songs by that name (up to 20 queries), and information on each one.

movie-this (Requires User Input):
typing in $node liri.js movie-this (Your Input Here), provides you with information from OMDB based on the movie title. If you don't provide an input, it will automatically send you to "Mr. Nobody", and give you information on that. If the input you provided is not a movie title, it tells you that the movie does not exist.

do-what-it-says:
typing in $node liri.js do-what-it-says, runs one of the three functions above based on the random.txt file included in the folder. Based on the input written inside the document, it will then give back the information. 
