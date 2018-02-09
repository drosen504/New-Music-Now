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
        $('#selection-view').attr('aria-hidden', 'true').hide();
        $('#feedback').attr('aria-hidden', 'false').show();
        $('#restart-nav').attr('aria-hidden', 'false').show();
        $('#song-view').attr('aria-hidden', 'false').show();
        api.initialArtistSearch(query); 

      }
    },
    handleNoArtistFound: function() {
      generator.noArtistFoundMessage();
      $('#error-view').attr('aria-hidden', 'false').show();
      $('#feedback').attr('aria-hidden', 'true').hide();
      $('#restart-nav').attr('aria-hidden', 'false').show();
      $('#song-view').attr('aria-hidden', 'true').hide();
    },
    handleNoFeedback: function() {
      console.log(`query is currently ${query}`);
      api.initialArtistSearch(query);
    },
    handleYesFeedback: function() {
      $('#artist-view').attr('aria-hidden', 'false').show();
      $('#feedback').attr('aria-hidden', 'true').hide();
      generator.postArtistInfo(relatedArtistData);
    },
    handleRestartButton: function() {
      event.preventDefault();
      artistData = undefined;
      $('#song-view').attr('aria-hidden', 'true').hide();
      $('#feedback').attr('aria-hidden', 'true').hide();
      $('#artist-view').attr('aria-hidden', 'true').hide();
      $('#restart-nav').attr('aria-hidden', 'true').hide();
      $('#error-view').attr('aria-hidden', 'true').hide();
      $('#selection-view').attr('aria-hidden', 'false').show();
    },

  };
}();    