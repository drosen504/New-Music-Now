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
          events.handleNoFeedback(); //why can't i use this.handleNoFeedback?
          events.handleYesFeedback(); //why can't i use this.handleYesFeedback?
          events.handleRestartButton();
        }
      });
    },
    handleNoFeedback: function() {
      $('#no-button').click(event => {
        console.log('No button clicked');
        api.initialArtistSearch(query);
      });
    },
    handleYesFeedback: function() {
      $('#yes-button').click(event => {
        console.log(relatedArtistId);
        $('#artist-view').show();
        $('#feedback').hide();
        generator.postArtistInfo(relatedArtistData);
      });
    },
    handleRestartButton: function() {
      $('#restart-button').click(event => {
        console.log('restarted!');
        $('#song-view').hide();
        $('#feedback').hide();
        $('#artist-view').hide();
        $('#restart-nav').hide();
        $('#selection-view').show();
      });
    },

  };
}();    