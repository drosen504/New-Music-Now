'use strict';
/* global $ */

const api = function() {
  return {
    getArtistDataFromApi: function (endpoint, query = {}) {
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
    },
    initialArtistSearch: function (name) {
      return api.getArtistDataFromApi('search', {
        q: name,
        limit: 1,
        type: 'artist'
      })
        .then(data => {
          artistData = data.artists.items[0];
          console.log(artistData);
          return api.getArtistDataFromApi(`artists/${artistData.id}/related-artists`);
        }) 
        .then(data => {
          let randomArtistIndexNumber = randomInteger(10);
          relatedArtistId = data.artists[randomArtistIndexNumber].id;
          relatedArtistData = data.artists[randomArtistIndexNumber];
          console.log(relatedArtistData);
          return api.getArtistDataFromApi(`artists/${relatedArtistId}/top-tracks?country=US`);
        })
        .then(data => {
          let suggestedTrackId = data.tracks[randomInteger(5)].id;
          generator.handlePlayerWidget(suggestedTrackId);
        })
        .catch(error => console.log(error));
    }
  };
}();  