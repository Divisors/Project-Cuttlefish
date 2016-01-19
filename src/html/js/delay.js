function delay(fn, time) {
	return function(yay, nay) {
		var c;
		this.cancel = function() {
			clearTimeout(c);
			nay.apply(arguments);
		};
		c=setTimeout(function() {
			var r=fn();
			if(yay)yay(r);}, time);
	};
}
function delayGP(fn, time) {
	return () =>(new Promise(delay(fn, time)));
}