'use strict';
/* global $ */

const generator = function() {
  return {
    handlePlayerWidget: function(trackId) {
      $('#song-view').html(`<iframe id="play-widget" src="https://open.spotify.com/embed?uri=spotify:track:${trackId}"
      frameborder="0" allowtransparency="true"></iframe>`);
    },
      


  };
}(); 