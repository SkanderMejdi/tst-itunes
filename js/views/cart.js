"use strict";
var ifndef = true;

APP.CartView = Backbone.View.extend({

	template: _.template($('#cartTemplate').html()),

	delete: function (event) {
		var infos = $($(event.target)[0]);
		var track = this.collection.get(infos.attr('data-id'));
		track.destroy();
		$(infos.parent().parent()).animate({height: 0}, 100, function() {
			$(this).remove();
		});
	},

	render: function () {
		var self = this;
		if (ifndef) {
			ifndef = false;
			this.model.on('sync', this.render, this);
			$(document).on('click', '.delete', function(e) {
				self.delete(e);
			});
		}
		this.$el.html(
			this.template({cart: this.collection.toJSON()})
		);
		return this;
	}
});
