var schedule = [
	{
		name: 'Class 1',
		block: '1',
		id: 123456,
		from: '7:30',
		to: '8:00',
		teacher: 'Mr. Smith'
	},
	{
		name: 'Class 2',
		block: '2',
		id: 789012,
		from: '8:03',
		to: '11:50',
		teacher: 'Ms. Jones'
	}
];
$(function() {
	$.material.init();
	//setup navbar
	$('.navbar-page-button-schedule a:not(.virtual)').on('click',function(e,a) {
		if (a)
			return;
		console.log('intercepted',a);
		e.preventDefault();
		$('.navbar-page-button-schedule a.virtual').click();
	}).on('touch.hold contextmenu', function(e){
		$(this).trigger('click',true);
	});
	var schedule = new ClassScheduleView(schedule);
	$(window).on('hashchange',function() {
		var hash = window.location.hash;
		if (hash.length <= 1) {
			$('[data-active-hash=\'\'],[data-active-hash=\'#\']').addClass('hash-active');
			$('.hash-active:not([data-active-hash=\'\']):not([data-active-hash=\'#\'])').removeClass('hash-active');
			hash = null;
		} else {
			$('[data-active-hash=\''+hash+'\']').addClass('hash-active');
			$('.hash-active:not([data-active-hash=\''+hash+'\']').removeClass('hash-active');
			hash = hash.substring(1);
		}
		switch(hash) {
			case "schedule":
				schedule.init().then(function(){schedule.enable();});
				break;
		}
	}).trigger('hashchange');//to initialize w/ current hash
});