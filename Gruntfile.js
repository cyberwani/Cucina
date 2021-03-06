/* jshint node:true */
module.exports = function(grunt) {
	var path = require('path'),
		THEME_NAME = 'cucina',
		SOURCE_DIR = 'src/',
		BUILD_DIR = 'build/';

	// Load tasks.
	require('matchdep').filterDev('grunt-*').forEach( grunt.loadNpmTasks );

	// Project configuration.
	grunt.initConfig({
		clean: {
			all: [BUILD_DIR],
			dist: {
				dot: true,
				expand: true,
				cwd: BUILD_DIR,
				src: [
					'node_modules',
					'undersass',
					'README.md'
				]
			}
		},

		copy: {
			all: {
				files: [{
					dot: true,
					expand: true,
					cwd: SOURCE_DIR,
					src: [
						'**',
						'!**/.{svn,git}/**', // Ignore version control directories.
						'!.DS_Store',
						'!package.json',
						'!Gruntfile.js',
						'!node_modules'
					],
					dest: BUILD_DIR
				}]
			}
		},

		sass: {
			dev: {
				options: {
					sourcemap: true
				},
				expand: true,
				cwd: SOURCE_DIR + 'sass/',
				dest: SOURCE_DIR,
				ext: '.css',
				src: [ 'style.scss' ]
			},
			dist: {
				options: {
					noCache: true,
					sourcemap: false
				},
				expand: true,
				cwd: SOURCE_DIR + 'sass/',
				dest: BUILD_DIR,
				ext: '.css',
				src: [ 'style.scss' ]
			}
		},

		concat: {
			dev: {
				src: [ SOURCE_DIR + 'js/src/*.js' ],
				dest: SOURCE_DIR + 'js/' + THEME_NAME + '.js',
			},
			dist: {
				src: [ SOURCE_DIR + 'js/src/*.js' ],
				dest: BUILD_DIR + 'js/' + THEME_NAME + '.js',
			}
		},

		compress: {
			main: {
				options: {
					archive: THEME_NAME + '.zip'
				},
				files: [
					{expand: true, cwd: BUILD_DIR, src: ['**'], dest: '/'}
				]
			}
		},

		watch: {
			css: {
				files: [SOURCE_DIR + 'sass/**'],
				tasks: ['sass:dev']
			},
			js: {
				files: [SOURCE_DIR + 'js/src/**'],
				tasks: ['concat:dev']
			}
		}
	});

	// Register tasks.

	// Build task.
	grunt.registerTask('dev', ['sass:dev']);
	grunt.registerTask('build', ['clean:all', 'copy:all', 'sass:dist', 'clean:dist' ]);
	grunt.registerTask('publish', ['build', 'compress:main']);

	// Default task.
	grunt.registerTask('default', ['dev']);

};
