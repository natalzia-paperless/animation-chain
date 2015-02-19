module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      main: {
        src: ['src/umd.js'],
        dest: 'public/animation-chain.js',
        options: {
          transform: ['6to5ify']
        }
      }
    },
    clean: {
      public: ["public/"]
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v <%= pkg.version %> - <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'public/animation-chain.min.js': ['public/animation-chain.js']
        }
      },
    },
    watch: {
      scripts: {
        files: ['src/javascripts/**/*.js'],
        tasks: ['browserify'],
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'browserify', 'uglify']);
};
