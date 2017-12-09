
function _run() {
	return new Promise(function(resolve, reject){
		console.log("Running Mock Task... This will take 5 seconds to complete.");
		setTimeout(resolve.bind(null, "Test complete."), 5000)
	});
}

module.exports = {
	run: _run
};
