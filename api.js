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

  };
}();  