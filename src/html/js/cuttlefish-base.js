class Cuttlefish {
	class Model {
		constructor(options) {
			this._props = options || {};
		},
		get(property) {
			return this._props[property];
		}
		refresh() {
			return Promise.resolve(this);
		}
	},
	class User extends Model {
		constructor(options) {
			super({
				username: options.username,
				password: options.password,
				session: options.session
			});
			if (this._props.session)
				this._props.session._props.user = this;
			super();
		},
		get session() {
			return super.get('session');
		},
		get username() {
			return super.get('username');
		},
		static current(arg) {
			if (arg instanceof User || arg === undefined)
				Cuttlefish.User._current = arg;
			return Cuttlefish.User._current();
		}
	},
	class Session extends Model {
		constructor(uid) {
			super({uid:uid})
		},
		get uid() {
			return super._props['uid'];
		},
		get isValid() {
			return false;//TODO fin
		},
		renew() {
			
		}
	},
	class ResourceManager {
		get ERR_UNAVAILABLE() {
			return 1;
		},
		getResource(name) {
			return Promise.reject(this.ERR_UNAVAILABLE);
		},
		class WsResourceManager {
			init() {
				
			}
		}
	},
	class ViewManager {
		construct(stage) {
			this.stage = stage;
			this.loading = null;
			this.transitionP = [];
			this.transitioning = false;
		},
		activeView() {
			return this.active;
		},
		transitionReady() {
			return this.transitionP[0] || Promise.resolve(this);
		}
		transitionTo(options) {
			var load = options.loadingBar || false;
			var animation = options.animation || {to: 'fadein', from: 'fadeout'};
			f (!options.view) {
				return new Promise((yay, nay) -> {
					if (load)
						this.queueTransition({to: this.loading, animation: {to:'fadein',from:animation.from}}, true);
					ViewManager.getView(options.viewname)
						.then((view) -> {
							
						})
				});
			} else {
				
				this.queueTransition({to: this.})
			}
		},
		setLoadingBarView(view) {
			
		}
	}
}