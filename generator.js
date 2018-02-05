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
      $('#confirm-view').html(`<h3>Please confirm your artist selection:</h3>
      <div class="artist-container">
          <div class="artist1">
              <img src='${artistInfo.artists.items[0].images[2].url}'><br>
              <p>${artistInfo.artists.items[0].name}</p>
              <p>genre: ${artistInfo.artists.items[0].genres[0]}</p>
          </div>
          <div class="artist2">
              <img src='${artistInfo.artists.items[1].images[2].url}'>
              <p>${artistInfo.artists.items[1].name}</p>
              <p>genre: ${artistInfo.artists.items[1].genres[0]}</p>
          </div>
          <div class="artist3">
              <img src='${artistInfo.artists.items[2].images[2].url}'>
              <p>${artistInfo.artists.items[2].name}</p>
              <p>genre: ${artistInfo.artists.items[2].genres[0]}</p>
          </div>
      </div>`);
    }, 
  
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

