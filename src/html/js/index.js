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
var assignments = [
	{
		name: 'Test assignment',
		className: 'Class 1',
		type: 'Homework',
		assigned: '10/23/2015',
		due: '10/27/2015',
		status: 'Overdue'
	}
];
window.ce = function(x){return document.createElement(x)};
$(function() {
	$(window).on('popstate',function() {
		var hash = window.location.hash, page='', args=[];
		console.log('popstate',hash);
		if (hash.length <= 1) {
			page = hash = null;
		} else {
			page = hash = hash.substring(1);
			if (hash.indexOf('/')>0) {
				page = hash.substring(0,hash.indexOf('/'));
				args = hash.split('/').slice(1);
			}
		}
		if ('stage' in window)
			stage.showView(page,args);
	});
	$('pc-stage').on('ready',function(){$(window).trigger('popstate');});//to initialize w/ current hash
});