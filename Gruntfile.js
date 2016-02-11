var grunt = require('grunt');
require('load-grunt-tasks')(grunt);
require('time-grunt')(grunt);
var appConfig = {
	app: require('./bower.json').appPath || '.',
	dist: 'dist'
};
grunt.initConfig({
	pkg: grunt.file.readJSON('bower.json'),
	appConfig: appConfig,
	meta: {
		banner: '/**\n' +
			' * <%= pkg.name %>\n' +
			' * <%= pkg.description %>\n' +
			' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' * @link <%= pkg.homepage %>\n' +
			' * @author <%= pkg.authors.join(", ") %>\n' +
			' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
			' */\n'
	},
	clean: {
		dist: {
			files: [{
				dot: true,
				src: [
					'<%= appConfig.dist %>',
					'<%= appConfig.dist %>/**/*',
					'!<%= appConfig.dist %>/.git*'
				]
			}]
		}
	},
	jshint: {
		src: [
			'<%= appConfig.app %>/src/**/*.js'
		],
		gruntfile: [
			'Gruntfile.js'
		],
		options: {
			curly: true,
			immed: true,
			newcap: true,
			noarg: true,
			sub: true,
			boss: true,
			eqnull: true
		}
	},
	watch: {
		bower: {
			files: ['bower.json']
		},
		js: {
			files: ['<%= appConfig.app %>/src/**/*.js'],
			tasks: ['jshint:src', 'concat']
		},
		gruntfile: {
			files: ['Gruntfile.js'],
			tasks: ['jshint:gruntfile']
		}
	},
	concat: {
		options: {
			banner: '<%= meta.banner %>\n'
		},
		dist: {
			src: ['src/utils.js', 'src/engine.js'],
			dest: 'dist/<%= pkg.name %>.js'
		}
	},
	uglify: {
		dist: {
			files: {
				'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
			}
		}
	}
});

grunt.registerTask('dev', [
	'clean:dist',
	'jshint:src',
	'concat',
	'watch'
]);
grunt.registerTask('build', [
	'clean:dist',
	'concat',
	'uglify'
]);
