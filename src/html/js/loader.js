window.ComponentLoader = Class.extend({
	loaded: {},
	has: function(name) {
		if (typeof name !== 'string') {
			for (var i in name)
				if (!this.has(name[i]))
					return false;
			return true;
		}
		return $('link[rel="import"][href="'+name+'"]').length > 0 || (name in this.loaded);
	},
	requirePath: function(name) {
		var self = this;
		if (this.has(name))
			return Promise.resolve('was already loaded');
		if (typeof name !== 'string')
			return new Promise(function(yay, nay) {
				var head = $('head');
				var loaded = 0;
				for (var i in name)
					head.append($(ce('link'))
					.attr('rel','import')
					.attr('href',name[i])
					.one('load',function() {
						for (var j in name)
							self.loaded[j] = true;
						loaded++;
						if (loaded == name.length)
							yay();
					}).one('error',nay));
			});
		return new Promise(function(yay, nay) {
			$('head').append($(ce('link'))
				.attr('rel','import')
				.attr('href',name)
				.one('load',function() {
					self.loaded[name] = true;
					yay.apply(yay, arguments);
				}).one('error',nay));
		});
	},
	require: function(name) {
		console.log('loading',name);
		if (typeof name !== 'string') {
			var mapped = [];
			for (var i in name)
				mapped[i] = this.mapName(name[i]);
			return this.requirePath(mapped);
		} else {
			return this.requirePath(this.mapName(name));
		}
	},
	mapName: function(name) {
		return '/components/'+name.substr(0,name.indexOf('-'))+'/'+name+'/'+name+'.html';
	}
});
ComponentLoader.instance = new ComponentLoader();
window.ResourceLoader = Class.extend({
	construct: function() {
		this._cache = {};
	},
	save: function() {
		window.localstorage['resourcecache']=JSON.stringify(this._cache);
		return this;
	},
	load: function() {
		this._cache = JSON.parse(window.localstorage['resourcecache']);
		return this;
	},
	cache: function(name, expiration, data) {
		this._cache[name] = {name: name, expry: expiration, data: data};
	},
	clean: function() {
		var time = Date.now();
		for (var i in this._cache)
			if (i.expry < time) {
				console.log('deleting '+i);
				delete cache[i];
			}
		return this;
	},
	getImmediate: function(name) {
		if (name in this._cache)
			return this._cache[name].data;
		return undefined;
	},
	require: function(name) {
		if (name in this._cache && this.cache[name].expry >= Date.now())
			return Promise.resolve(this._cache[name].data);
		var self = this;
		return new Promise(function(yay, nay) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', '/data/'+name+'.json', true);
			xhr.onload=function(e) {
				var result = JSON.parse(xhr.responseText);
				self.cache(name, Date.now()+60000, result);
				yay(result);
			};
			xhr.onerror = function(e) {
				console.warn(xhr, e);
				nay(e);
			};
			xhr.send();
		});
	}
});
ResourceLoader.instance = new ResourceLoader();