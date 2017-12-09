var _24HOURS = 1000 * 60 * 60 * 24,
	noCron = require("../src"),
	config = {
		jobs: [{
			"name": "mock-task",
			"schedule": {
				"duration": 1,
				"unit": "m"
			},
			"module": "./mocks/task",
			"method": "run",
			"params": []
		},
		{
			"name": "other-mock-task",
			"schedule": {
				"duration": 30,
				"unit": "s"
			},
			"module": "./mocks/task",
			"method": "run",
			"params": []
		},
		{
			"name": "parallel-task-test",
			"description": "Checks the request queue for new service requests. Spawns a thread to process the queue if there are new items to be processes.",
			"schedule": {
				"duration": 1,
				"unit": "m",
				"parallel": true //When parallel is true, the job timer is restarted even if this task is still running.
			},
			"module": "./mocks/spawner",
			"method": "run",
			"params": []
		},
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
		},
		{
			"name": "missed-exact-time-test",
			"description": "Executes a task at an exact time of day in military time. (plus or minus a few seconds)",
			"type": "alarm",
			"schedule": {
				"time": "07:37"
			},
			"module": "./mocks/task",
			"method": "run",
			"params": []
		},
		{
			"name": "exact-weekday-time-test",
			"description": "Executes a task at an exact time of day in military time. (plus or minus a few seconds)",
			"type": "alarm",
			"schedule": {
				"weekday": "saturday",
				"time": "07:37"
			},
			"module": "./mocks/task",
			"method": "run",
			"params": []
		},{
			"name": "not-exact-weekday-time-test",
			"description": "Executes a task at an exact time of day in military time. (plus or minus a few seconds)",
			"type": "alarm",
			"schedule": {
				"weekday": "tuesday",
				"time": "07:37"
			},
			"module": "./mocks/task",
			"method": "run",
			"params": []
		}]
	},
	job;

	function _pad(val, len, c) {
		var tmp = c.repeat(len) + String(val),
			p = tmp.length - len,
			r = tmp.substr(p);

		return r;
	}

	function _fixMins(mins, delta) {
		var n = mins + delta;

		if(n > 59) n = n - 59;
		if(n < 0) n = 59 + delta;

		return n;
	}
config.jobs.forEach(function (job, i) {
	var params = [null].concat(job.params),
		mod = require(job.module),
		method = mod[job.method].bind.apply(mod[job.method], params),
		now = new Date();

	//noCron.addSchedule(job.name, job.schedule, method, job.type === "NoAlarmJob");
	if(job.name === "exact-time-test") {
		job.schedule.time = _pad(now.getHours(), 2, "0") + ":" + _pad(_fixMins(now.getMinutes(), 1), 2, "0")
		noCron.addSchedule(JSON.parse(JSON.stringify(job)), method);

		job.schedule.time = _pad(now.getHours(), 2, "0") + ":" + _pad(_fixMins(now.getMinutes(), 2), 2, "0")
		noCron.addSchedule(JSON.parse(JSON.stringify(job)), method);

		job.schedule.time = _pad(now.getHours(), 2, "0") + ":" + _pad(_fixMins(now.getMinutes(), 3), 2, "0")
		noCron.addSchedule(JSON.parse(JSON.stringify(job)), method);

	} else if(job.name === "missed-exact-time-test") {
		job.schedule.time = _pad(now.getHours(), 2, "0") + ":" + _pad(_fixMins(now.getMinutes(), -1), 2, "0")
		noCron.addSchedule(job, method);
	} else if(job.name === "exact-weekday-time-test" || job.name === "not-exact-weekday-time-test"){
		job.schedule.time = _pad(now.getHours(), 2, "0") + ":" + _pad(_fixMins(now.getMinutes(), 1), 2, "0")
		noCron.addSchedule(job, method);
	} else {
		noCron.addSchedule(job, method);
	}
});


function _keepAlive() {
	console.log("KeepAlive");
	setTimeout(_keepAlive, _24HOURS);
}

noCron.start();

_keepAlive();
