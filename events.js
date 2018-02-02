'use strict';
/* global $ */

const events = function() {
  return {
    handleSpotifyLogin: function() {
      console.log('login button clicked');
      event.preventDefault();
      window.location = `${authorization.authEndpoint}?client_id=${authorization.clientId}&redirect_uri=${authorization.redirectUri}&response_type=token&show_dialog=true`;
    },  
    watchSubmit: function() {
      console.log('submit button clicked');
      event.preventDefault();
      if (!_token) {
        window.location = `${authorization.authEndpoint}?client_id=${authorization.clientId}&redirect_uri=${authorization.redirectUri}&response_type=token&show_dialog=true`;
      } else {
        const queryBand = $(event.currentTarget).find('.js-query');
        query = queryBand.val();
        console.log(`You searched for ${query}`);  
        queryBand.val('');
        api.initialArtistSearch(query);
        $('#selection-view').hide();
        $('#feedback').show();
        $('#restart-nav').show();
        $('#song-view').show();
      }
    },
    handleNoFeedback: function() {
      console.log(`query is currently ${query}`);
      api.initialArtistSearch(query);
    },
    handleYesFeedback: function() {
      console.log(relatedArtistId);
      $('#artist-view').show();
      $('#feedback').hide();
      generator.postArtistInfo(relatedArtistData);
    },
    handleRestartButton: function() {
      event.preventDefault();
      console.log('restarted!');
      $('#song-view').hide();
      $('#feedback').hide();
      $('#artist-view').hide();
      $('#restart-nav').hide();
      $('#selection-view').show();
    },

  };
}();    