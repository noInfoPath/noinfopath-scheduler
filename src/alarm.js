var moment = require("moment");

module.exports = (function () {

	function NoAlertJob(name, schedule, jobFn) {
		if (typeof (schedule) !== "object") throw new Error("[NoAlarmTask] `schedule` is a required parameter");

		function properties(obj) {
			var out = {};
			Object.keys(obj).forEach(function (k) {
				out[k] = obj[k];
			});

			return out;
		}

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

		this.run = function () {
			var _now = moment(),
				_target = moment("2017-01-01 " + schedule.time),
				_margin = _now - (this._lastRun ? moment(this._lastRun) : moment()),
				_isWeekday = schedule.weekday ? _now.format("dddd").toLowerCase() === schedule.weekday.toLowerCase() : true,
				_alarm = _now.hour() === _target.hour() && _now.minute() === _target.minute() && _isWeekday;

			if (_alarm && !this._running && (_margin === 0 || _margin > 60000)) {
				this.message = "[NoAlarmTask] Starting " + this._name + ", last run " + (this._lastRun ? moment(this._lastRun).toString() : "never");
				console.log(_margin, _now, this._running, this.message);

				var r = this._jobFn();
				this._running = true;

				if (r && r.then) {
					this.promise = r.then(function () {
							this._lastRun = moment(new Date()); //move this to after successful run.
							this._running = false;
							console.log("[NoAlarmTask] Ran " + this._name);
						}.bind(this))
						.catch(function (err) {
							this._running = false;
							throw err;
						}.bind(this));

					this._skipped = !!this._schedule.parallel;
				} else {
					this.promise = null;
					this.skipped = true;
					this.message = '[NoAlarmTask] ' + _name + " not run";
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
