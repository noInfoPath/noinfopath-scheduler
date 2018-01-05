
/*
 * Spawner runs this as a child process.
 */

var fs = require("fs"),
	 c = 0;

console.log("[fork-task] Fork-task loaded.");

function runner() {
	if(c === 0 ) {
		if(fs.exists("./test/temp/running.txt")) {
			console.log("[fork-task] Test run already in progress. Not starting again.");
			return; //Don't run.
		} else {
			console.log("[fork-task] Starting new test run @ %s.", new Date());
			fs.writeFileSync("./test/temp/running.txt", (new Date()).toLocaleString());
		}
	}

	if(c++ < 6) {
		console.log("[fork-task] Running spawn test instance %s", c);
		setTimeout(runner, 2500);
	} else {
		fs.unlinkSync("./test/temp/running.txt");
		console.log("[fork-task] Test run completed @ %s", new Date());
	}
}

runner();
