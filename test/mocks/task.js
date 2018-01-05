
/*
 * Mock to simulate a task running for 5 seconds.
 */

function _run() {
	return new Promise(function(resolve, reject){
		console.log("[MockTask] Running Mock Task... This will take 5 seconds to complete.");
		setTimeout(resolve.bind(null, "[task] Test complete."), 5000)
	});
}

module.exports = {
	run: _run
};
