'use strict';
/* global $ */

const hash = authorization.decodeURL();
window.location.hash = '';
 
// Set token. grab from URI hash
let _token = hash.access_token;

let relatedArtistId;
let relatedArtistData;
let artistData;
let query;

$(function() {
  $(generator.initializePage);
  $('#js-login-button').on('click', events.handleSpotifyLogin);
  $('.js-artist-search').on('submit', events.watchSubmit);
  $('#no-button').on('click', events.handleNoFeedback);
  $('#yes-button').on('click', events.handleYesFeedback);
  $('#restart-button').on('click', events.handleRestartButton); 
});