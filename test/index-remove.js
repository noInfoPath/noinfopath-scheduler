
/*
 * Testing job remove function.
 */

noCron = require("../src");

config = {
	 // Defining job templates we will schedule single/multiple times, during the test process.
	 jobs: [{
		 "name": "mock-task-01",
		 "schedule": {
			 "duration": 10,
			 "unit": "s"
		 },
		 "module": "./mocks/task",
		 "method": "run",
		 "params": []
	 }, {
		 "name": "mock-task-02",
		 "schedule": {
			 "duration": 10,
			 "unit": "s"
		 },
		 "module": "./mocks/task",
		 "method": "run",
		 "params": []
	 }],
	 "secondsToWaitBeforeTestRemoving": 60
 };

console.log('[test] You should see both jobs schedulig to run in each 10 seconds.');
config.jobs.forEach(function (job, i) {
	var params = [null].concat(job.params),
		mod = require(job.module),
		method = mod[job.method].bind.apply(mod[job.method], params);

	noCron.addSchedule(job, method);
});
console.log('[test] Number of shceduled tasks: ' + noCron.getSchedules().length);
console.log('[test] You should see both jobs starting in each 10 seconds for ' + config.secondsToWaitBeforeTestRemoving + ' seconds.');
noCron.start();

setTimeout(function () {
	console.log('[test] You should see mock-task-01 being removed and never started again. Mock-task-02 shuld be keep running.');
	noCron.removeSchedule('mock-task-01');
	console.log('[test] Number of shceduled tasks: ' + noCron.getSchedules().length);

}, config.secondsToWaitBeforeTestRemoving * 1000);
