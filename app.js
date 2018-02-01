'use strict';
/* global $ */

//decode hash to extract token

function decodeURL() {  
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
  return hash;
}
const hash = decodeURL();
window.location.hash = '';
 
// Set token. grab from URI hash
let _token = hash.access_token;
console.log(`token is ${_token}`);

let relatedArtistId;
let relatedArtistData;
let artistData;
let query;

// function handleSpotifyLogin() {
//   $('#js-login-button').click(event => {
//     console.log('login button clicked');
//     event.preventDefault();
//     window.location = `${authorization.authEndpoint}?client_id=${authorization.clientId}&redirect_uri=${authorization.redirectUri}&response_type=token&show_dialog=true`;
//   });
// }

$(generator.initializePage);
$(events.watchSubmit);
$(events.handleSpotifyLogin);

