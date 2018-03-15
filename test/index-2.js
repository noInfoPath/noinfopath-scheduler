/*
 * Testing various kind of jobs.
 */

var _24HOURS = 1000 * 60 * 60 * 24,
	noCron = require("../src"),
	config = {
		// Defining job templates we will schedule single/multiple times, unmodified/slightly modified during the test process.
		jobs: [

			// Simple jobs sheduled to run in various time of the day
			{
				"name": "exact-time-test",
				"description": "Executes a task at an exact time of day in military time. (plus or minus a few seconds)",
				"type": "alarm",
				"schedule": {
					"time": "07:37"
				},
				"module": "./mocks/task",
				"method": "run",
				"params": []
			}, {
				"name": "missed-exact-time-test",
				"description": "Executes a task at an exact time of day in military time. (plus or minus a few seconds)",
				"type": "alarm",
				"schedule": {
					"time": "07:37"
				},
				"module": "./mocks/task",
				"method": "run",
				"params": []
			}
		]
	},
	job;

function _pad(val, len, c) {
	var tmp = c.repeat(len) + String(val),
		p = tmp.length - len,
		r = tmp.substr(p);

	return r;
}

/**
 * Adds delta to time of a day defined by hours and mins, then returns the result as a string e.g.: 07:37
 * @param {number} hours 0-24
 * @param {number} mins 0-59
 * @param {number} deltaMins Number of minutes to add/subtract from the time of day defined by hours and mins.
 * @return {undefined}
 */
function _fixTime(hours, mins, deltaMins) {
	// It does not make sense to add/substract more than 24h from the given time.
	if (deltaMins > 1440 || deltaMins < -1440) {
		deltaMins = deltaMins % 1440;
	}
	var h = hours;
	var m = mins;

	m += deltaMins % 60;
	if (m > 59) {
		m = m - 60;
		h = h + 1;
	} else if (m < 0) {
		m = m + 60;
		h = h - 1;
	}

	h += Math.floor(deltaMins / 60);
	if (h > 23) {
		h = 24 - h;
	} else if (h < 0) {
		h = h + 24;
	}

	return _pad(h, 2, "0") + ':' + _pad(m, 2, "0");
}

config.jobs.forEach(function (job, i) {
	var params = [null].concat(job.params),
		mod = require(job.module),
		method = mod[job.method].bind.apply(mod[job.method], params),
		now = new Date();

	//noCron.addSchedule(job.name, job.schedule, method, job.type === "NoAlarmJob");
	if (job.name === "exact-time-test") {
		console.log('[test] Scheduling job `exact-time-test` to be run at T+1m, T+2m and T+3m.');
		job.schedule.time = _fixTime(now.getHours(), now.getMinutes(), 1);
		noCron.addSchedule(JSON.parse(JSON.stringify(job)), method);

		job.schedule.time = _fixTime(now.getHours(), now.getMinutes(), 2);
		noCron.addSchedule(JSON.parse(JSON.stringify(job)), method);

		job.schedule.time = _fixTime(now.getHours(), now.getMinutes(), 3);
		noCron.addSchedule(JSON.parse(JSON.stringify(job)), method);

	} else if (job.name === "missed-exact-time-test") {
		console.log('[test] Scheduling job `missed-exact-time-test` to be run at T-1m.');
		job.schedule.time = _fixTime(now.getHours(), now.getMinutes(), -1);
		noCron.addSchedule(job, method);
	} else if (job.name === "exact-weekday-time-test" || job.name === "not-exact-weekday-time-test") {
		console.log('[test] Scheduling weekday-time-test jobs to be run at T+1m.');
		job.schedule.time = _fixTime(now.getHours(), now.getMinutes(), 1);
		noCron.addSchedule(job, method);
	} else {
		noCron.addSchedule(job, method);
	}
});


function _keepAlive() {
	console.log("[test] KeepAlive");
	setTimeout(_keepAlive, _24HOURS);
}

noCron.start();

_keepAlive();
