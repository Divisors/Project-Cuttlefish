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
$(function() {
	var scheduleView = new StudentScheduleView(schedule);
	var assignmentsView = new StudentAssignmentView(assignments);
	var loginView = new LoginView();
	window.views = [loginView, scheduleView, assignmentsView];
	$(window).on('popstate',function() {
		var hash = window.location.hash;
		console.log('popstate',hash);
		if (hash.length <= 1) {
			hash = null;
		} else {
			hash = hash.substring(1);
		}
		views.forEach(function(view) {
			view.disable();
		});
		if ('stage' in window)
			stage.showView(hash);
		window.location._page = hash;
	}).trigger('popstate');//to initialize w/ current hash
});