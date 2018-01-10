
/*
 * Mocha script to test schedlue managing functions.
 * Run it like that: mocha test/index-remove-mocha.js
 */

var assert = require('assert'),
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
		}, {
  		"name": "mock-task-03",
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

describe('Managing schedules', function () {

	describe('addSchedule', function () {

		config.jobs.forEach(function (job, i) {
			var params = [null].concat(job.params),
				mod = require(job.module),
				method = mod[job.method].bind.apply(mod[job.method], params);

			noCron.addSchedule(job, method);
		});


		var jobs = noCron.getSchedules();

		it('should the number of jobs we have just scheduled be two.', function () {
			assert.equal(jobs.length, 3);
		});
		it('should the name of job1 be mock-task-01.', function () {
			assert.equal(jobs[0]._name, 'mock-task-01');
		});
		it('should the name of job2 be mock-task-02.', function () {
			assert.equal(jobs[1]._name, 'mock-task-02');
		});
		it('should the name of job3 be mock-task-03.', function () {
			assert.equal(jobs[2]._name, 'mock-task-03');
		});

 	});

	describe('removeSchedule', function () {

		var jobsBefore = noCron.getSchedules();
		noCron.removeSchedule('mock-task-01');
		var jobsAfter = noCron.getSchedules();

		it('should decrease the number of jobs', function () {
			if (jobsAfter.length >= jobsBefore.length) {
				assert.fail(2, undefined, 'Number of jobs after removing mock-task-01 is not less then before. Before: ' + jobsBefore.length + ', after: ' + jobsAfter.length + '.');
			}
		});

		it('should remove mock-task-01 and keep mock-task-02 and mock-task-03', function () {
			assert.equal(jobsAfter[0]._name, 'mock-task-02');
			assert.equal(jobsAfter[1]._name, 'mock-task-03');
		});

 	});

	describe('removeAllSchedules', function () {

		var jobsBefore = noCron.getSchedules();
		noCron.removeAllSchedules();
		var jobsAfter = noCron.getSchedules();

		it('should decrease the number of jobs to zero', function () {
			if (jobsAfter.length > 0) {
				assert.fail(2, undefined, 'Number of jobs after removing them all is not zero. Before: ' + jobsBefore.length + ', after: ' + jobsAfter.length + '.');
			}
		});
 	});
});
