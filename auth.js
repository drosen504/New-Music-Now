'use strict';
/* global $ */

const authorization = function() {
  return {
    authEndpoint: 'https://accounts.spotify.com/authorize',
    clientId: '5f795f8bb8c14d94bafa6dcd2ed3038b',
    redirectUri: 'http://localhost:8888/index'
  };
  // {
  //   decodeURL: function() {  
  //     const hash = window.location.hash
  //       .substring(1)
  //       .split('&')
  //       .reduce(function (initial, item) {
  //         if (item) {
  //           var parts = item.split('=');
  //           initial[parts[0]] = decodeURIComponent(parts[1]);
  //         }
  //         return initial;
  //       }, {});
  //     return hash;
  //   },
    
  // }; 
}();