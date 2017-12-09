var NoCronTask = require("./no-cron-task"),
	NoAlarmTask = require("./alarm");

module.exports = (function () {
	function NoCron() {
		var _tasks = [],
			_timeout;

		this.addSchedule = function _newTask(name, schedule, jobFn, isAlarm) {
			var task;

			if (typeof (name) === "string" && typeof (schedule) === "object" && typeof (jobFn) === "function") {
				task = isAlarm ? new NoAlarmTask(name, schedule, jobFn) : new NoCronTask(name, schedule, jobFn);
			} else if (typeof (name) === "object" && typeof (schedule) === "function") {
				task = name.type === "NoAlarmJob" ? new NoAlarmTask(name.name, name.schedule, schedule) : new NoCronTask(name.name, name.schedule, schedule);
			}


			if (task instanceof NoCronTask)
				console.log("Scheduled %s to run every %s%s", task._name, task._schedule.duration, task._schedule.unit);
			else
				console.log("Scheduled %s to every day at %s", task._name, (task._schedule.weekday ? task._schedule.weekday + " at " : ""), task._schedule.time);

			_tasks.push(task);

			// if(startNow) task.run();

			return task;
		}

		function _tick() {
			var promises = _tasks.map(function (task) {
				task.run();
				if (task.skipped) { //This will happen for parallel tasks also.
					return Promise.resolve(false)
				} else {

					return task.promise;
				}
			});

			//console.log("Running %s tasks.", promises.length);
			Promise.all(promises)
				.then(function (results) {
					//console.log("Completed %s tasks.", results.length);
					//console.log(results);
					results.forEach(function (r) {
						if (!!r) console.log(r);
					});

					_timeout = setTimeout(_tick, 1000);
				});
		}

		function _start() {
			_timeout = setTimeout(_tick, 1000);
		}

		function _stop() {
			clearTimeout(_timeout);
		}

		this.start = _start;
		this.stop = _stop;
		//_tick();
	}



	return new NoCron();
})();
