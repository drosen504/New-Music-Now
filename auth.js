'use strict';
/* global $ */

const authorization = function() {
  return {
    authEndpoint: 'https://accounts.spotify.com/authorize',
    clientId: '5f795f8bb8c14d94bafa6dcd2ed3038b',
    redirectUri: 'http://localhost:8888/index'
  }; 
}();