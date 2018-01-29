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

// const getArtistDataFromApi = function(query, endpoint, callback) {
//   const url = new URL(`https://api.spotify.com/v1/${endpoint}/`);
//   let headers = {
//     q: query,
//     Authorization: `Bearer${_token}`
//   };
//   // headers = `Authorization=Bearer${_token}`;
//   console.log(`headers is ${headers}`);
//   //   headers.set('Content-Type', 'application/json');
//   $.getJSON(url, headers, callback);
// };

const getArtistDataFromApi = function (endpoint, query = {}) {
  const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
  console.log(`API call URL is ${url}`)
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

let artist;

const getArtist = function (name) {
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
      let relatedArtistId = data.artists[2].id;
      return getArtistDataFromApi(`artist/${data.artists[2].id}/top-tracks?country=US`);
    })
    .then(tracks => {
      console.log();
    })
        
   

    .catch(error => console.log(error));
};


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
      getArtist(query);
    }
  });
}

function fetchTrackId(data) {
  const results = data.items.map(data);
}

$(watchSubmit);
