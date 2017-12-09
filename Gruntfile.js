module.exports = function (grunt) {

	var DEBUG = !!grunt.option("debug");

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			index: {
				files: [{
						expand: true,
						flatten: true,
						isFile: true,
						cwd: ".",
						src: ["dist/noinfopath-schedule.min.js"],
						dest: "./index.js"
					}]
			}
		},
		nodocs: {
			js: {
				options: {
					src: 'src/js/**/*.js',
					//dest: 'docs/dtcs.md',
					start: ['/*', '/**'],
					multiDocs: {
						multiFiles: true,
						dest: "wiki/"
					}
				}
			}
		},
		watch: {
			files: ['src/**/*.*'],
			tasks: ['compile']
		},
		browserify: {
			dist: {
				files: {
					'dist/noinfopath-schedule.js': ['src/*.js']

				},
				options: {}
			}
		},
		uglify: {
			dist: {
				files: {
					'dist/noinfopath-schedule.min.js': ['dist/noinfopath-schedule.js']
				}
			}
		}


	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodocs');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//Default task(s).
	// grunt.registerTask('build', ['bumpup', 'version', 'nodocs:internal', 'concat:readme']);
	// grunt.registerTask('release', ['bumpup', 'version', 'nodocs:internal', 'concat:readme']);
	grunt.registerTask('compile', ['browserify','uglify:dist']);

};
