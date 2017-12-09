var fs = require("fs"),
	c = 0;

console.log("fork-task loaded");

function runner() {
	if(c === 0 ) {
		if(fs.exists("./test/temp/running.txt")) {
			console.log("Test run already in progress. Not starting again.");
			return; //Don't run.
		} else {
			console.log("Starting new test run @ %s.", new Date());
			fs.writeFileSync("./test/temp/running.txt", (new Date()).toLocaleString());
		}
	}

	if(c++ < 6) {
		console.log("Running spawn test %s", c);
		setTimeout(runner, 2500);
	} else {
		fs.unlinkSync("./test/temp/running.txt");
		console.log("Test run completed @ %s", new Date());
	}
}

runner();
