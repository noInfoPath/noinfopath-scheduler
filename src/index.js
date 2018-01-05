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
				task = name.type === "alarm" ? new NoAlarmTask(name.name, name.schedule, schedule) : new NoCronTask(name.name, name.schedule, schedule);
			}


			if (task instanceof NoCronTask)
				console.log("[addSchedule] Scheduled as NoCronTask, %s to run every %s%s", task._name, task._schedule.duration, task._schedule.unit);
			else
				console.log("[addSchedule] Scheduled as NoAlarmTask, %s to every day at %s%s", task._name, (task._schedule.weekday ? task._schedule.weekday + " at " : ""), task._schedule.time);

			_tasks.push(task);

			// if(startNow) task.run();

			return task;
		}

		/**
		 * Removes job from the task scheduler.
		 * It will remove all the jobs with the matching name.
		 * @param {string} name Name of the job to remove.
		 * @return {undefined}
		 */
		this.removeSchedule = function (name) {
			_tasks = _tasks.filter(function (el) {
				if (el._name == name) {
					console.log('[index] Removing task %s', name);
					if (el._running) {
						console.log('[index] Notice: task we are removing is running at the moment.');
					}
				}
				return el._name !== name;
			});
		}

		/**
		 * Returns array of jobs currently in the scheduler.
		 * @return {array}
		 */
		this.getSchedules = function () {
			return _tasks;
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
