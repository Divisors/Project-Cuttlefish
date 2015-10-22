$(function() {
	var pressTime = 500;
	function applyDynamic (element, action, _target) {
		var target = $(_target || element);
		switch (action) {
			case 'modal':
			case 'modal-toggle':
				target.modal('toggle');
				break;
			case 'modal-show':
				target.modal('show');
				break;
			case 'modal-hide':
				target.modal('hide');
				break;
			case 'dropdown':
			case 'dropdown-toggle':
				target.dropdown('toggle');
				break;
			case 'dropdown-show':
				target.dropdown('show');
				break;
			case 'dropdown-hide':
				target.dropdown('hide');
				break;
			case 'tab':
			case 'tab-show':
				target.tab('show');
				break;
			case 'collapse':
				target.collapse();
				break;
			case 'carousel-next':
				target.carousel('next');
				break;
			case 'carousel-prev':
				target.carousel('prev');
				break;
			case 'carousel-cycle':
				target.carousel('cycle');
				break;
		}
	}
	var cTouches = new Array(), mouseDisabled = false;
	$(document).on('touchstart',function(_e) {
		var e = _e.originalEvent;
		//console.log('ts',e);
		Array.prototype.slice.call(e.changedTouches).forEach(function(touch) {
			cTouches[touch.identifier] = {
				id: touch.identifier,
				pageX: touch.pageX,
				pageY: touch.pageY,
				clientX: touch.clientX,
				clientY: touch.clientY,
				start: performance.now(),
				timer: setTimeout(function(target) {
					$(target).trigger('touch.press');
					console.log('touch.press');
				}, pressTime, touch.target),
				target: touch.target};
		});
		$(e.currentTarget).trigger('touch.start');
		mouseDisabled = true;
	}).on('touchend', function(_e) {
		var e = _e.originalEvent;
		//e.preventDefault();
		//console.log('te',e);
		Array.prototype.slice.call(e.changedTouches).forEach(function(touch) {
			var touch = cTouches[touch.identifier];
			window.clearTimeout(touch.timer);
			if (performance.now() - touch.start < pressTime) {
				$(touch.target).trigger('touch.tap').trigger('touch.click');console.log('touch.click', touch.target, touch.start - (new Date()).getMilliseconds());
			} else
				console.log('long');
			delete cTouches[touch.identifier];
		});
		$(e.currentTarget).trigger('touch.stop');
	}).on('touchmove', function(_e) {
		var e = _e.originalEvent;
		e.preventDefault();
		//console.log('tm',e);
		Array.prototype.slice.call(e.changedTouches).forEach(function(touch) {
			if (! cTouches.hasOwnProperty(touch.identifier)) {
				console.log('what?', touch);
				return;
			}
			var cp = cTouches[touch.identifier];
			cp.pageX = touch.pageX;
			cp.pageY = touch.pageY;
			cp.clientX = touch.clientX;
			cp.clientY = touch.clientY;
		});
		$(e.currentTarget).trigger('touch.move');
	}).on('touchcancel', function(_e) {
		var e = _e.originalEvent;
		//e.preventDefault();
		console.log('tc',e);
		Array.prototype.slice.call(e.changedTouches).forEach(function(touch) {
			delete cTouches[touch.identifier];
		});
		$(e.currentTarget).trigger('touch.off');
	}).on('click', function(_e, a) {
		console.log('md',_e);
		if (mouseDisabled && (!a)) {
			console.log('nope');
			_e.originalEvent.preventDefault();
			_e.originalEvent.stopImmediatePropagation();
			mouseDisabled=false;
			return;
		}
		$(_e.target).trigger('touch.click');console.log('touch.click');
	});
});