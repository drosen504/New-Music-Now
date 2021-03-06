'use strict';
/* global $ */

const api = function() {
  return {
    randomInteger: function(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },  
    getArtistDataFromApi: function (endpoint, query = {}) {
      const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
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
        limit: 3,
        type: 'artist'
      })
        .then(data => {
          artistData = data.artists.items[0];
          console.log(artistData);
          if (artistData === undefined) {
            events.handleNoArtistFound();
          } else {
            return api.getArtistDataFromApi(`artists/${artistData.id}/related-artists`);
          }
        }) 
        .then(data => {
          let randomArtistIndexNumber = this.randomInteger(10);
          relatedArtistId = data.artists[randomArtistIndexNumber].id;
          relatedArtistData = data.artists[randomArtistIndexNumber];
          console.log(relatedArtistData);
          return api.getArtistDataFromApi(`artists/${relatedArtistId}/top-tracks?country=US`);
        })
        .then(data => {
          let suggestedTrackId = data.tracks[this.randomInteger(5)].id;
          generator.handlePlayerWidget(suggestedTrackId);
        })
        .catch(error => console.log(error));
    },

  };
}();  