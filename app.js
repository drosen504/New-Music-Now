'use strict';
/* global $ */

//decode hash to extract token
const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = '';
 
// Set token. grab from URI hash
let _token = hash.access_token;
console.log(`token is ${_token}`);

//auth related variables
const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = '5f795f8bb8c14d94bafa6dcd2ed3038b';
const redirectUri = 'http://localhost:8888/index';

//API call
const getArtistDataFromApi = function (endpoint, query = {}) {
  const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
  console.log(`base API call URL is ${url}`);
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${_token}`);
  headers.set('Content-Type', 'application/json');
  const requestObject = {
    headers
  };

  Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
  return fetch(url, requestObject).then(function (response) {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();
        
  });
};
 
let relatedArtistId;
let artist;

const initialArtistSearch = function (name) {
  return getArtistDataFromApi('search', {
    q: name,
    limit: 1,
    type: 'artist'
  })
    .then(data => {
      artist = data.artists.items[0];
      console.log(`artist is ${artist.name}`);
      console.log(artist);
      return getArtistDataFromApi(`artists/${artist.id}/related-artists`);
    }) 
    .then(data => {
      relatedArtistId = data.artists[randomInteger(5)].id;
      return getArtistDataFromApi(`artists/${relatedArtistId}/top-tracks?country=US`);
    })
    .then(data => {
      let suggestedTrackId = data.tracks[randomInteger(5)].id;
      handlePlayerWidget(suggestedTrackId);
    })
    .catch(error => console.log(error));
};

// subsequent API call for retry
// const retryArtistSearch = function (name) {
//   return getArtistDataFromApi('search')
// };

function handlePlayerWidget(trackId) {
  $('#song-view').html(`<iframe id="play-widget" src="https://open.spotify.com/embed?uri=spotify:track:${trackId}"
  frameborder="0" allowtransparency="true"></iframe>`);
}

function handleSpotifyLogin() {
  $('#js-login-button').click(event => {
    console.log('login button clicked');
    event.preventDefault();
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;
  });
}

function watchSubmit() {
  $('.js-artist-search').submit(event => {
    console.log('submit button clicked');
    event.preventDefault();
    if (!_token) {
      window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;
    } else {
      const queryBand = $(event.currentTarget).find('.js-query');
      const query = queryBand.val();
      console.log(`You searched for ${query}`);  
      queryBand.val('');
      initialArtistSearch(query);
      $('#selection-view').hide();
      $('#feedback').show();
      handleNoFeedback();
      handleYesFeedback();
    }
  });
}

function handleNoFeedback() {
  $('#no-button').click(event => {
    console.log('No button clicked');
    // retryArtistSearch(query);
  });
}

function handleYesFeedback() {
  $('#yes-button').click(event => {
    console.log('Yes button clicked');
  });
}

function initializePage() {
  console.log('Initial View Loaded');
  if (!_token) {
    $('#selection-view').hide();
    $('#song-view').hide();
    $('#feedback').hide();
    $('#artist-view').hide();
  } else {
    $('#landing-view').hide();
    $('#feedback').hide();
    $('#artist-view').hide();
  }
}

//random number function
function randomInteger(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

$(initializePage);
$(watchSubmit);
$(handleSpotifyLogin);

