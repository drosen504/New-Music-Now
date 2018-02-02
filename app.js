'use strict';
/* global $ */

const hash = authorization.decodeURL();
window.location.hash = '';
 
// Set token. grab from URI hash
let _token = hash.access_token;
console.log(`token is ${_token}`);

let relatedArtistId;
let relatedArtistData;
let artistData;
let query;

$(generator.initializePage);
// $(events.watchSubmit);
$(events.handleSpotifyLogin);

$(function() {
  $('.js-artist-search').on('submit', events.watchSubmit);
  $('#no-button').on('click', events.handleNoFeedback);
});