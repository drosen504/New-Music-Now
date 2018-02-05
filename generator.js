'use strict';
/* global $ */

const generator = function() {
  return {
    handlePlayerWidget: function(trackId) {
      $('#song-view').html(`<iframe id="play-widget" src="https://open.spotify.com/embed?uri=spotify:track:${trackId}"
      frameborder="0" allowtransparency="true"></iframe>`);
    },
    postArtistInfo: function(relatedArtistData) {
      $('#artist-view').html(`<h2>Glad you enjoyed ${relatedArtistData.name}</h2>
      <a href="${relatedArtistData.external_urls.spotify}" target="_blank">Check them out on Spotify!</a>
      <p>or</p>`);
    },
    displayArtistConfirmation: function(artistInfo) {
      $('#confirm-view').html(``)
    } 
  
    initializePage: function() {
      console.log('Initial View Loaded');
      if (!_token) {
        $('#selection-view').hide();
        $('#song-view').hide();
        $('#feedback').hide();
        $('#artist-view').hide();
        $('#restart-nav').hide();
      } else {
        $('#landing-view').hide();
        $('#feedback').hide();
        $('#artist-view').hide();
        $('#restart-nav').hide();
      }
    }

  };
}();

