var NoCronTask = require("./no-cron-task"),
	NoAlarmTask = require("./alarm");

module.exports = (function () {

	/**
	 * ### NoCron
	 *
	 * The actual task runner. Handles adding, removing, maintaining, and running no-cron and alarm tasks.
	 *
	 * **Parameters**
	 * |name|String|The name that will be used to refer to the task represented by the instance of the NoCronJob object|
	 *
	 * **Returns**
	 *
	 * Type: Promise <Object>
	 * None
	 */
	function NoCron() {
		var _tasks = [],
			_timeout;

		/**
		 * ### addSchedule
		 *
		 * adds a task to the NoCron task runner. Calls the constructor for an alarm or no-cron task to create a new task, and adds it to the task array so it will be checked on each 'tick'
		 *
		 * **Parameters>**
		 * |name|String|the name used to refer to the task|
		 * |schedule|Object|an object containing information on when/how often to run the task|
		 * |jobFn|function|The actual function to be called when the task is ran|
		 * |isAlarm|boolean|a flag to determine whether the task to be created is an alarm task(true) or no-cron task(false)|
		 *
		 * **Parameters<alternate #1>**
		 * |name|object|an object containing the name and schedule information for a task|
		 * |schedule|function|the function to be called when the task is ran|
		 *
		 * **Parameters<alternate #2>**
		 * |name|object|an object containing the name, schedule information, and callback function for a task|

		 * **Returns**
		 * Object - the newly created task object
		 *
		 */
		this.addSchedule = function _newTask(name, schedule, jobFn, isAlarm) {
			var task;

			if (typeof (name) === "string" && typeof (schedule) === "object" && typeof (jobFn) === "function") {
				task = isAlarm ? new NoAlarmTask(name, schedule, jobFn) : new NoCronTask(name, schedule, jobFn);
			} else if (typeof (name) === "object" && typeof (schedule) === "function") {
				task = name.type === "alarm" ? new NoAlarmTask(name.name, name.schedule, schedule) : new NoCronTask(name.name, name.schedule, schedule);
			} else if (typeof (name) === "object") {
				task = name.job.type === "alarm" ? new NoAlarmTask(name.job.name, name.job.schedule, name.fn) : new NoCronTask(name.job.name, name.job.schedule, name.fn);
			} else {
				throw new TypeError("addSchedule: Invalid parameters. `name` is a required parameter, and must be a String or Object.");
			}

			// console.log("[NoCron::debug] Mode=%s", this.debug);
			if (this._debug) {
				if (task instanceof NoCronTask)
					console.log("[addSchedule] Scheduled as NoCronTask, %s to run every %s%s", task._name, task._schedule.duration, task._schedule.unit);
				else
					console.log("[addSchedule] Scheduled as NoAlarmTask, %s to every day at %s%s", task._name, (task._schedule.weekday ? task._schedule.weekday + " at " : ""), task._schedule.time);
			}

			_tasks.push(task);

			// if(startNow) task.run();

			return task;
		}


		/**
		 * ### removeSchedule
		 *
		 * removes a job from the task runner
		 *
		 * **Parameters**
		 * |name|string|the name of the job to be removed|
		 *
		 * **Returns**
		 *
		 * Object - The removed task object
		 */
		this.removeSchedule = function (name) {
			_tasks = _tasks.filter(function (el) {
				if (el._name == name) {
					if (this.debug) console.log('[noinfopath-scheduler::removeSchedule] Removing task %s', name);

					if (el._running) {
						console.log('[noinfopath-scheduler::removeSchedule] Notice: task we are removing is running at the moment.');
					}
				}
				return el._name !== name;
			});
		}


		/**
		 * ### removeAllSchedules
		 *
		 * removes all jobs from the task runner
		 *
		 * **Parameters**
		 * None
		 *
		 * **Returns**
		 * None
		 */
		this.removeAllSchedules = function () {
			while (_tasks.length) {
				this.removeSchedule(_tasks[0]._name);
			}
		}

		/**
		 * ### getSchedules
		 *
		 * returns the array of tasks currently in the task runner
		 *
		 * **Parameters**
		 * None
		 *
		 * **Returns**
		 * Array - the array of all tasks currently scheduled
		 */
		this.getSchedules = function () {
			return _tasks;
		}


		/**
		 * ### _tick
		 *
		 * calls run on every task, which will run all tasks that are due to be executed. resets _timeout to call this function again in 1000s so that it can continue periodically checking all tasks and running them
		 *
		 * **Parameters**
		 * None
		 *
		 * **Returns**
		 * None
		 */
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


		/**
		 * ### start
		 *
		 * tells _timeout to call _tick in 1 second, which will begin a loop where tick is called every second, effectively starting the task runner
		 *
		 * **Parameters**
		 * None
		 *
		 * **Returns**
		 * None
		 */
		function _start() {
			_timeout = setTimeout(_tick, 1000);
		}

		/**
		 * ### stop
		 *
		 * clears _timeout, preventing _tick from being called again and stopping the task runner.
		 *
		 * **Parameters**
		 * None
		 *
		 * **Returns**
		 * None
		 */
		function _stop() {
			clearTimeout(_timeout);
		}

		/**
		 * ### debug
		 *
		 * Property that enables or disables debug output.
		 *
		 * **Returns**
		 * bool
		 */
		this._debug = false;
		Object.defineProperty(this, "debug", {
			get: function () {
				return this._debug;
			},
			set: function (v) {
				this._debug = v;
			}
		});


		this.start = _start;
		this.stop = _stop;
		//_tick();
	}



	return new NoCron();
})();
