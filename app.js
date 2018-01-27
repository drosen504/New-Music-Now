'use strict';

// Get the hash of the url
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
 
// Set token
let _token = hash.access_token;
console.log(`token is ${_token}`);

//auth related variables
const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = '5f795f8bb8c14d94bafa6dcd2ed3038b';
const redirectUri = 'http://localhost:8888/index';

//API call
// const baseUrl: 'https://api.spotify.com/v1/';

// Make a call using the token
// $.ajax({
//   url: 'https://api.spotify.com/v1/me/top/artists',
//   type: 'GET',
//   beforeSend: function(xhr){
//     xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
//   success: function(data) { 
//     // Do something with the returned data
//     data.items.map(function(artist) {
//       let item = $('<li>' + artist.name + '</li>');
//       item.appendTo($('#top-artists'));
//     });
//   }
// });

const getArtistDataFromApi = function(query, endpoint, callback) {
  const url = new URL(`https://api.spotify.com/v1/${endpoint}/`);
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${_token}`);
  //   headers.set('Content-Type', 'application/json');
//   $.getJSON(url, headers, callback);
  console.log(getArtistDataFromApi);
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
      getArtistDataFromApi(query, 'search', fetchTrackId); //need to add third argument to trigger callback
    }
  });
}

function fetchTrackId(data) {
  const results = data.items.map(data);
}

$(watchSubmit);
