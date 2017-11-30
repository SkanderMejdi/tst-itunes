"use strict";
APP.SearchView = Backbone.View.extend({

  events: {
    "keypress input": "search"
  },

  template: _.template($('#searchTemplate').html()),

  initialize: function(params) {
    this.collection = params.collection;
  },

  fillResult: function(results) {

    var self = this;

    function doSetTimeout(html, n) {
      setTimeout(function() {
        self.$el.find('#track-list').append(html);
      }, 20 * n);
    }
    for (var n in results) {
      var trackView = new APP.TrackView({
        track: results[n],
        collection: self.collection
      });
      doSetTimeout($(trackView.render().el)[0].innerHTML, n);
    }
  },

  search: function(event) {

    if (event.keyCode == 13) {
      event.stopPropagation();
      event.preventDefault();

      var search = $('input').val();
      var api = new APP.ItunesCollection({search: search});
      var req = api.fetch();
      var self = this;
      self.$el.find('#track-list').html('<img src="giphy.webp" alt="loading" />');

      req.onreadystatechange = function() {
        if (req.readyState == 4) {
          if (req.status == 200) {
            let results = JSON.parse(req.responseText).results;
            self.$el.find('#track-list').html('');
            if (results.length == 0) {
              self.$el.find('#track-list')
              .html('<img src="no-music.png" class="animated bounceIn" alt="no-media">');
            } else {
              self.fillResult(results);
            }
          }
        }
      }
    };
  },

  // populate the html to the dom
  render: function () {
    this.$el.html(
      this.template()
    );
    return this;
  }
});
