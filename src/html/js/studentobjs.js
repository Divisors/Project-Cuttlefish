var ClassInfo = Class.extend({
	construct: function(data) {
		
	}
});
var StudentScheduleView = View.extend({
	name: 'student.schedule',
	construct: function(schedule) {
		this.schedule = schedule;
	},
	enable: function(parent) {
		var self = this;
		return new Promise(function(yay, nay) {
			var table = (self.getElement().addClass('active')).find('table>tbody').empty();
			for (var i in this.schedule) {
				var classinfo = this.schedule[i];
				table.append('<tr><td>'+classinfo.from + '-' + classinfo.to + '</td><td>' + classinfo.block + '</td><td>'+classinfo.name+'</td><td>'+classinfo.teacher+'</td></tr>');
			}
			yay();
		});
	},
	disable: function(parent) {
		(this.getElement().removeClass('active')).find('table>tbody').empty();
		return this._super.apply(this, arguments);
	},
	dispose: function(parent) {
		this.getElement().remove();
		return this._super.apply(this, arguments);
	}
});
var StudentAssignmentView = View.extend({
	name: 'student.assignments',
	construct: function(assignments) {
		this.assignments = assignments;
	},
	enable: function(parent) {
		var self = this;
		return new Promise(function(yay, nay) {
			var table = (self.getElement().addClass('active')).find('table>tbody').empty();
			for (var i in this.assignments) {
				var assignment = this.assignments[i];
				table.append('<tr><td>'+assignment.className + '</td><td>' + assignment.type + '</td><td>' + assignment.name + '</td><td>' + assignment.assigned + '</td><td>' + assignment.due + '</td><td>' + assignment.status + '</td></tr>');
			}
			yay();
		});
	},
	disable: function(parent) {
		(this.getElement().removeClass('active')).find('table>tbody').empty();
		return this._super.apply(this, arguments);
	},
	dispose: function(parent) {
		this.getElement().remove();
		return this._super.apply(this, arguments);
	}
});
var LoginScheduleView = View.extend({
	construct: function() {
		
	},
	init: function(parent) {
		
	}
});