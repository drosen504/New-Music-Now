'use strict';
/* global $ */

const events = function() {
  return {
    handleSpotifyLogin: function() {
      event.preventDefault();
      window.location = `${authorization.authEndpoint}?client_id=${authorization.clientId}&redirect_uri=${authorization.redirectUri}&response_type=token&show_dialog=true`;
    },  
    watchSubmit: function() {
      event.preventDefault();
      if (!_token) {
        window.location = `${authorization.authEndpoint}?client_id=${authorization.clientId}&redirect_uri=${authorization.redirectUri}&response_type=token&show_dialog=true`;
      } else {
        const queryBand = $(event.currentTarget).find('.js-query');
        query = queryBand.val();
        console.log(`You searched for ${query}`);  
        queryBand.val('');
        $('#selection-view').hide();
        $('#feedback').show();
        $('#restart-nav').show();
        $('#song-view').show();
        api.initialArtistSearch(query); 

      }
    },
    handleNoArtistFound: function() {
      generator.noArtistFoundMessage();
      $('#error-view').show();
      $('#feedback').hide();
      $('#restart-nav').show();
      $('#song-view').hide();
    },
    handleNoFeedback: function() {
      console.log(`query is currently ${query}`);
      api.initialArtistSearch(query);
    },
    handleYesFeedback: function() {
      $('#artist-view').show();
      $('#feedback').hide();
      generator.postArtistInfo(relatedArtistData);
    },
    handleRestartButton: function() {
      event.preventDefault();
      artistData = undefined;
      $('#song-view').hide();
      $('#feedback').hide();
      $('#artist-view').hide();
      $('#restart-nav').hide();
      $('#error-view').hide();
      $('#selection-view').show();
    },

  };
}();    