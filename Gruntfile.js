module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      dist: {expand: false, src: ['src/chain.js'], dest: 'public/animation-chain.js', filter: 'isFile'},
    },
    clean: {
      public: ['public/']
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
        files: ['src/**/*.js'],
        tasks: ['copy'],
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
        browserify: true
      },
      gruntfile: {
        files: {
          src: ['Gruntfile.js']
        }
      },
      dev: {
        files: {
          src: ['src/**/*.js']
        },
        options: {
          debug: true,
          devel: true
        }
      },
      dist: {
        files: {
          src: ['src/**/*.js']
        }
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('dist', ['clean', 'copy', 'uglify']);
  grunt.registerTask('default', ['jshint', 'dist']);
  grunt.registerTask('lint', ['jshint']);
};
