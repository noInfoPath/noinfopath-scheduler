var child_process = require("child_process")
;
console.log("Spawner loaded.");
function _spawn() {
	try {
		var file = __dirname + "/fork-task.js";

		enqueueProcess = child_process.fork(file);

		enqueueProcess.on("close", function () {
			console.log("Spawned task has finished running.");
		});

		return Promise.resolve(true);
	} catch (e) {
		throw e;
	}
}

module.exports = {
	run: _spawn
};
