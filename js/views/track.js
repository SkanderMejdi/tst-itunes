"use strict";
var _ifndef = true;

APP.TrackView = Backbone.View.extend({

	$cart: $('#cart'),

	template: _.template($('#trackTemplate').html()),

  initialize: function(params) {
    this.track = params.track;
  },

	cart: function () {
    var cart = new APP.CartView({
      collection: this.collection,
      model: new APP.CartModel()
    });
    this.$cart.html(cart.render().el);
  },

  add: function(event) {
    var infos = $($(event.target)[0]);
    var track = this.collection.find({
      url: infos.attr('data-url')
    });
    if (track == undefined) {
      this.model = new APP.CartModel()
      this.model.set({
        artist: infos.attr('data-artist'),
        img: infos.attr('data-img'),
        name: infos.attr('data-name'),
        url: infos.attr('data-url')
      });

      this.collection.add(this.model);
      this.model.save();
			this.cart();
    }
  },

  render: function () {

    var self = this;
    if (_ifndef) {
      _ifndef = false;
      $(document).on('click', '.add', function(e) {
        self.add(e);
      });
    }
    this.$el.html(
    	this.template({track: this.track})
    );
    return this;
  }
});
