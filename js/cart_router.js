"use strict";

window.APP = window.APP || {};
APP.CartRouter = Backbone.Router.extend({

  $cart: $('#cart'),
  $search: $('#search'),

  initialize: function () {
    this.collection = new APP.CartCollection();
    this.collection.fetch({ajaxSync: false});
    this.index();
    Backbone.history.start();
  },

  index: function () {
    var search = new APP.SearchView({collection: this.collection});
    this.$search.html(search.render().el);
    var cart = new APP.CartView({
      collection: this.collection,
      model: new APP.CartModel()
    });
    this.$cart.html(cart.render().el);
  }
});
