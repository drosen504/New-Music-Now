'use strict';
/* global $ */

const events = function() {
  return {
    watchSubmit: function() {
      $('.js-artist-search').submit(event => {
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
          handleNoFeedback();
          handleYesFeedback();
          handleRestartButton();
        }
      });
    },
    handleYesFeedback: function() {

    },
    handleNoFeedback: function() {

    },

  };
}();    