$(function() {
	var hoverables = $('[data-triggers^="hover"]').Hoverable();
	hoverables.bind('newHover2',function(e) {
		console.log(e);
	});
	return;
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
	var cTouches = new Array();
	$(document).on('touchstart',function(_e) {
		var e = _e.originalEvent;
		//e.preventDefault();
		console.log('ts',e);
		Array.prototype.slice.call(e.changedTouches).forEach(function(touch) {
			cTouches[touch.identifier] = {id: touch.identifier, pageX: touch.pageX, pageY: touch.pageY, clientX: touch.clientX, clientY: touch.clientY};
		});
	}).on('touchend', function(_e) {
		var e = _e.originalEvent;
		//e.preventDefault();
		console.log('te',e);
		Array.prototype.slice.call(e.changedTouches).forEach(function(touch) {
			delete cTouches[touch.identifier];
		});
	}).on('touchmove', function(_e) {
		var e = _e.originalEvent;
		e.preventDefault();
		console.log('tm',e);
		Array.prototype.slice.call(e.changedTouches).forEach(function(touch) {
			if (! cTouches.hasOwnProperty(touch.identifier)) {
				console.log('what?', touch);
				return;
			}
			cTouches[touch.identifier] = {id: touch.identifier, pageX: touch.pageX, pageY: touch.pageY, clientX: touch.clientX, clientY: touch.clientY};
		})
	}).on('touchcancel', function(_e) {
		var e = _e.originalEvent;
		//e.preventDefault();
		console.log('tc',e);
		Array.prototype.slice.call(e.changedTouches).forEach(function(touch) {
			delete cTouches[touch.identifier];
		});
	}).on('contextmenu', function(_e) {
		
	});
});