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
(function() {
	window.ResourceLoader = Class.extend({
		construct: function() {
			this._cache = {};
			this.loading = [];
			if ('resourcecache' in window.localStorage)
				this._cache = JSON.parse(window.localStorage['resourcecache']);
		},
		clean: function() {
			var time = Date.now();
			for (var i in this._cache)
				if (i.expry < time) {
					console.log('deleting '+i);
					delete cache[i];
				}
			this.save();
			return this;
		},
		preload: function(options) {
			return Promise.reject('not supported');
		},
		srt:['','json','arraybuffer','blob','document','text'],
		require: function(options) {
			if (!('url' in options))
				options.url = '/data/'+options.name+'.json';
			if (!('method' in options))
				options.method = ('post' in options) ? 'POST' : 'GET';
			var xhr = new XMLHttpRequest();
			xhr.open(options.method, options.url, true);
			if ('type' in options) {
				var type = options.type.toLowerCase();
				if (this.srt.indexOf(type)>-1)
					xhr.responseType = type;
				else if(options.type.toUpperCase() == 'JSON')
					options.parser = (text)=>(JSON.parse(text));
			}
			var result = new Promise(function(yay, nay) {
				xhr.onload = function() {
					if (xhr.status < 600 && xhr.status >= 400)
						nay(xhr.statusText, xhr, options);
					if ('parser' in options)
						yay(options.parser(xhr.response), xhr, options);
					else
						yay(xhr.response, xhr, options);
				};
				xhr.onerror = function(e) {
					nay(e, xhr, options);
				};
				//send request
				if ('post' in options)
					xhr.send(options.post);
				else
					xhr.send();
			});
			result.cancel = function() {
				if (xhr.readyState == 4)
					return false;
				xhr.abort();
				return true;
			};
			return result;
		}
	});
	ResourceLoader.instance = new ResourceLoader();
	window.UAC = {
		login: function(options) {
			return ResourceLoader.instance.require({
				method:'POST',
				url:'/data/login.json',
				type:'json',
				post:JSON.stringify({username:options.username,password:options.password})
			}).then(function(result) {
				if (result.success == true) {
					UAC.username = result.username;
					UAC.expires = new Date(result.expires);
					UAC.save();
					return Promise.resolve(result);
				}
				return Promise.reject(result.msg);
			});
		},
		auth: function() {
			//TODO finish
		},
		save: function() {
			window.localStorage['uac'] = JSON.stringify({username:UAC.username,expires:UAC.expires});
		}
	};
})();