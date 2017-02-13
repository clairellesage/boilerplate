// A Library has a name and a creator (both strings)
var Library = function(playlist, tracks) {
  this.name = name
  this.creator = creator
  // A Library has many playlists (starts as an empty array)
  this.playlists = []
}

// Each Playlist has a name which is required upon creation
var Playlist = function(tracks) {
	this.name = name
	// A Playlist also has many tracks
	this.tracks = []
} 

// A Track has a title, a rating (an integer from 1 to 5) and a length (integer in seconds) 
//all of which are required when creating a new track
var Track = function() {
	this.title = title
	this.rating = rating
	this.length = length
}

// define a prototype (~instance) method
// Playlist objects can be added to an instance of a library
Library.prototype.newPlaylist = function(playlist) {
  this.playlists.push(playlist)
}

Playlist.prototype.newTrack = function(track) {
	// Each Playlist also has an overallRating function which will calculate the rating by averaging the rating of its tracks
	this.tracks.push(track)
}

Playlist.prototype.overallRating = function(track) {
	// Each Playlist also has an overallRating function which will calculate the rating by averaging the rating of its tracks
	let total = 0;
	for (var i = 0; i < this.track.length; i++) {
		total += this.track.rating;
	}
	let average = total/this.tracks.length;
	return average;
}

Playlist.prototype.totalDuration = function(track) {
	// Each Playlist also has a totalDuration function which will sum the duration of all of its tracks
	let total = 0;
	for (var i = 0; i < this.tracks.length; i++) {
		total += this.track.duration;
	}
	return total;
}

var myLibrary = new Library("Claire's Library", "Claire")
var myPlaylist = new Playlist("HYPE MUSIC")
// create a new object called `nikeShoe` with the SmartShoe constructor
// var nikeShoe = new SmartShoe(10, 'gray', 'sport edition');

// we call the prototype method recharge
// nikeShoe.recharge(50);







