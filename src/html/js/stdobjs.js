var View = Class.extend({
	construct: function() {
	},
	getElement: function() {
		return $('pc-view[name="'+this.name+'"]');
	},
	init: function(parent) {
		return Promise.resolve();
	},
	enable: function(parent) {
		return Promise.resolve();
	},
	disable: function(parent) {
		return Promise.resolve();
	},
	dispose: function(parent) {
		return Promise.resolve();
	}
});
var LoginView = View.extend({
	enable: function(parent) {
		return new Promise(function(yay,nay) {
			$('.view-login').addClass('active');
			yay();
		});
	},
	disable: function(parent) {
		return new Promise(function(yay,nay) {
			$('.view-login').removeClass('active');
			yay();
		});
	}
});