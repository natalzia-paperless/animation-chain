module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      public: ['build/']
    },
    browserify: {
      dist: {
        files: {
          'build/animation-chain.js': ['index.js'],
        }
      }
    },
    jshint: {
      options: {
        indent: 2,
        camelcase: true,
        nonew: true,
        quotmark: true,
        bitwise: true,
        forin: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        undef: true,
        unused: true,
        node: true,
        browser: true,
        browserify: true,
        esnext: true
      },
      gruntfile: {
        files: {
          src: ['Gruntfile.js']
        }
      },
      dev: {
        files: {
          src: ['index.js', 'lib/**/*.js']
        },
        options: {
          debug: true,
          devel: true
        }
      },
      dist: {
        files: {
          src: ['index.js', 'lib/**/*.js']
        }
      }
    },
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'lib/',
            src: ['*.js'],
            dest: 'build/'
          }
        ]
      }
    },
    watch: {
      scripts: {
        files: ['lib/**/*.js'],
        tasks: ['build'],
        options: {
          spawn: false,
        },
      },
    },
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('build', ['babel']);
  grunt.registerTask('dist', ['clean', 'build']);
  grunt.registerTask('default', ['jshint', 'dist', 'watch']);
  grunt.registerTask('lint', ['jshint']);
};
