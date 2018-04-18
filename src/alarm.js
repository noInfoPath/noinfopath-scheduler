var moment = require("moment");

module.exports = (function () {
	/**
	 * ## NoAlertJob
	 *
	 * constructor function that creates objects of alarm-type tasks(tasks that are run at a certain day/time, as opposed to at regular intervals). The task runner uses this
	 * function to create task objects, it is not meant to be used by users directly
	 *
	 * **Parameters**
	 *
	 * |Name|Type|Description|
	 * |----|----|-----------|
	 * |name|string|the name used to refer to this task|
	 * |schedule|object|an object containing information specifying when exactly to run this task|
	 * |jobFn|function|the function that is called when this task is run|
	 *
	 * **Returns**
	 * None
	 */
	function NoAlertJob(name, schedule, jobFn) {
		if (typeof (schedule) !== "object") throw new Error("[NoAlarmTask] `schedule` is a required parameter");


		/**
		 * ### properties
		 *
		 * Contructor function exported by no-cron-task.js. Creates an object that represents a task that is scheduled to run at regular intervals(as opposed to a specific day/time).
		 *
		 * **Parameters**
		 *
		 * |Name|Type|Description|
		 * |----|----|-----------|
		 * |obj|Object|the object whose properties will be copied|
		 *
		 * **Returns**
		 * Type: Object
		 *
		 * Returns an object with the same properties and values as the object passed in as a parameter
		 *
		 */
		function properties(obj) {
			var out = {};
			Object.keys(obj).forEach(function (k) {
				out[k] = obj[k];
			});

			return out;
		}


		/**
		 * ### reset
		 *
		 * resets the NoCronJob's properties to defaults, creates them and sets their values to default if they don't already exist.
		 *
		 * **Parameters**
		 * None
		 *
		 * **Returns**
		 * None
		 */
		this.reset = function () {
			this.promise = null;
			this.skipped = true;
			this.message = "";

			this._name = name;
			this._schedule = schedule;
			this._jobFn = jobFn;
			this._duration = moment.duration(schedule.duration, schedule.unit);
			this._durationMilliseconds = this._duration.asMilliseconds();
			this._lastRun = null;
			this._running = false;
		}


		this.reset();


		/**
		 * ### run
		 *
		 * called by the task runner on each 'tick' - checks if it is time for this task to be run yet, if so it executes the jobFn. if not(or if it is a parallel task),
		 * it sets skipped to true.
		 *
		 * **Parameters**
		 * None
		 *
		 * **Returns**
		 * None
		 */
		this.run = function () {
			var _now = moment(),
				_target = moment("2017-01-01 " + schedule.time),
				// Note: _lastRun can be a future date, e.g. when the user adjusted the clock of the device.
				_margin = (this._lastRun && this._lastRun < _now) ? _now - moment(this._lastRun) : 0,
				//_margin = _now - (this._lastRun ? moment(this._lastRun) : moment()),
				_isWeekday = schedule.weekday ? _now.format("dddd").toLowerCase() === schedule.weekday.toLowerCase() : true,
				_alarm = _now.hour() === _target.hour() && _now.minute() === _target.minute() && _isWeekday;

			if (Math.abs(_margin) < 999) _margin = 0;

			//if (_alarm) console.log("Alarm Check: last run %s target %s margin: %s isAlarm: %s isRunning: %s", this._lastRun, _target.toString(), _margin, _alarm, this._running);

			if (_alarm && !this._running && (_margin === 0 || _margin > 60000)) {
				this.message = "[NoAlarmTask] Starting " + this._name + ", last run " + (this._lastRun ? moment(this._lastRun).toString() : "never");
				console.log(_margin, _now, this._running, this.message);

				var r = this._jobFn();
				this._running = true;

				if (r && r.then) {
					this.promise = r.then(function () {
							this._lastRun = moment(new Date()); //move this to after successful run.
							this._running = false;
							console.log("[NoAlarmTask] Ran %s %s", this._name, this._lastRun.toString());
						}.bind(this))
						.catch(function (err) {
							this._running = false;
							throw err;
						}.bind(this));

					this._skipped = !!this._schedule.parallel;
				} else {
					this.promise = null;
					this.skipped = true;
					this.message = '[NoAlarmTask] ' + this._name + " not run";
				}
			} else {
				this.promise = null;
				this.skipped = true;
			}

			//return properties(this);

		}
	}
	return NoAlertJob;
})();
