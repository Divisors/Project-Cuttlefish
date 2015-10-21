var ClassInfo = Class.extend({
	construct: function(data) {
		
	}
});
var ClassScheduleView = View.extend({
	construct: function(schedule) {
		this.schedule = schedule;
	},
	init: function(parent) {
		return this._super.apply(this, arguments);
	},
	enable: function(parent) {
		return new Promise(function(yay, nay) {
			var table = ($('.view.view-student.view-student-schedule').addClass('active')).find('table>tbody').empty();
			for (var i in this.schedule) {
				var classinfo = this.schedule[i];
				table.append('<tr><td>'+classinfo.from + '-' + classinfo.to + '</td><td>'+classinfo.name+'</td><td>'+classinfo.teacher+'</td></tr>');
			}
			yay();
		});
	},
	disable: function(parent) {
		($('.view.view-student.view-student-schedule').removeClass('active')).find('table>tbody').empty();
		return this._super.apply(this, arguments);
	},
	dispose: function(parent) {
		$('.view.view-student.view-student-schedule').remove();
		return this._super.apply(this, arguments);
	}
});
var LoginScheduleView = View.extend({
	construct: function() {
		
	},
	init: function(parent) {
		
	}
});