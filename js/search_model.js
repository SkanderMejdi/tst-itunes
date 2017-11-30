"use strict";
APP.ItunesCollection = Backbone.Collection.extend({

  urlRoot: 'https://itunes.apple.com/search',

  initialize: function(options) {
    if (options.search)
    this.search = options.search;
  },

  url: function() {
    return this.urlRoot
    + '?media=music'
    + '&country=FR'
    + '&limit=24'
    + '&entity=song'
    + '&term=' + encodeURI(this.search);
  },

  parse: function(response) {
    return response;
  },
});
