"use strict";
APP.CartModel = Backbone.Model.extend({
  defaults: {
    "img":"https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
    "artist":"none",
    "name":"none",
    "url":"none"
  }
});

APP.CartCollection = Backbone.Collection.extend({
  localStorage: new Backbone.LocalStorage("Cart"),
  model: APP.CartModel,
});
