var ComponentLoader = Class.extend({
	has: function(name) {
		if (typeof name !== 'string') {
			for (var i in name)
				if (!this.has(name[i]))
					return false;
			return true;
		}
		return $('link[rel="import"][href="'+name+'"]').length > 0;
	},
	requirePath: function(name) {
		if (this.has(name))
			return Promise.resolve('was already loaded');
		if (typeof name !== 'string')
			return new Promise((yay, nay) => {
				var head = $('head');
				var loaded = 0;
				for (var i in name)
					head.append($('<link/>')
					.attr('rel','import')
					.attr('href',name[i])
					.one('load',() => {
						loaded++;
						if (loaded == name.length)
							yay();
					}).one('error',nay));
			});
		return new Promise((yay, nay) => {
			$('head').append($('<link/>')
				.attr('rel','import')
				.attr('href',name)
				.one('load',yay)
				.one('error',nay));
		});
	},
	require: function(name) {
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
ComponentLoader.getInstance = ()=>(ComponentLoader.instance);