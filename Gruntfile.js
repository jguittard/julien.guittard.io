'use strict';

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  grunt.initConfig({
    app: {
      src: 'jgu',
      dist: 'dist',
      baseurl: ''
    },
    watch: {
      sass: {
        files: ['<%= app.src %>/_assets/scss/**/*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },
      scripts: {
        files: ['<%= app.src %>/_assets/js/**/*.{js}'],
        tasks: ['uglify']
      },
      jekyll: {
        files: ['<%= app.src %>/**/*.{html,yml,md,mkd,markdown}'],
        tasks: ['jekyll:server']
      },
      images: {
        files: ['<%= app.src %>/_assets/images/**/*.{gif,jpg,jpeg,png,svg,webp}'],
        tasks: ['copy:server']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.jekyll/**/*.{html,yml,md,mkd,markdown}',
          '.tmp/<%= app.baseurl %>/styles/*.css',
          '.tmp/<%= app.baseurl %>/scripts/*.js',
          '.tmp/<%= app.baseurl %>/images/**/*.{gif,jpg,jpeg,png,svg,webp}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: {
            target: 'http://localhost:9000/<%= app.baseurl %>'
          },
          base: [
            '.jekyll',
            '.tmp',
            '<%= app.src %>',
            'bower_components'
          ]
        }
      },
      dist: {
        options: {
          open: {
            target: 'http://localhost:9000/<%= app.baseurl %>'
          },
          base: [
            '<%= app.dist %>',
            '.tmp'
          ]
        }
      }
    },
    clean: {
      server: [
        '.jekyll',
        '.tmp'
      ],
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= app.dist %>/*',
            '!<%= app.dist %>/.git*'
          ]
        }]
      }
    },
    jekyll: {
      options: {
        config: '_config.yml,_config.build.yml',
        src: '<%= app.src %>'
      },
      dist: {
        options: {
          dest: '<%= app.dist %>/<%= app.baseurl %>',
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll/<%= app.baseurl %>'
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          minifyJS: true,
          minifyCSS: true
        },
        files: [{
          expand: true,
          cwd: '<%= app.dist %>/<%= app.baseurl %>',
          src: '**/*.html',
          dest: '<%= app.dist %>/<%= app.baseurl %>'
        }]
      }
    },
    uglify: {
      server: {
          options: {
            mangle: false,
            beautify: true
          },
          files: {
            '.tmp/<%= app.baseurl %>/scripts/main.js': ['<%= app.src %>/_assets/js/**/*.js']
          }
      },
      dist: {
        options: {
          compress: true,
          preserveComments: false,
          report: 'min'
        },
        files: {
          '<%= app.dist %>/<%= app.baseurl %>/scripts/main.js': ['<%= app.src %>/_assets/js/**/*.js']
        }
      }
    },
    sass: {
      options: {
          includePaths: ['bower_components']
      },
      server: {
          options: {
            sourceMap: true
          },
          files: [{
            expand: true,
            cwd: '<%= app.src %>/_assets/scss',
            src: '**/*.{scss,sass}',
            dest: '.tmp/<%= app.baseurl %>/styles',
            ext: '.css'
          }]
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: [{
          expand: true,
          cwd: '<%= app.src %>/_assets/scss',
          src: '**/*.{scss,sass}',
          dest: '<%= app.dist %>/<%= app.baseurl %>/styles',
          ext: '.css'
        }]
      }
    },
    uncss: {
        options: {
          htmlroot: '<%= app.dist %>/<%= app.baseurl %>',
          report: 'gzip'
        },
        dist: {
          src: '<%= app.dist %>/<%= app.baseurl %>/**/*.html',
          dest: '<%= app.dist %>/<%= app.baseurl %>/styles/main.css'
        }
    },
    autoprefixer: {
      options: {
        browsers: ['last 3 versions']
      },
      server: {
        files: [{
          expand: true,
          cwd: '.tmp/<%= app.baseurl %>/styles',
          src: '**/*.css',
          dest: '.tmp/<%= app.baseurl %>/styles'
        }]
      },
      dist: {
          files: [{
              expand: true,
              cwd: '<%= app.dist %>/<%= app.baseurl %>/styles',
              src: '**/*.css',
              dest: '<%= app.dist %>/<%= app.baseurl %>/styles'
          }]
      }
    },
    critical: {
      dist: {
        options: {
          base: './',
          css: [
              '<%= app.dist %>/<%= app.baseurl %>/css/main.css'
          ],
          minify: true,
          width: 320,
          height: 480
        },
        files: [{
          expand: true,
          cwd: '<%= app.dist %>/<%= app.baseurl %>',
          src: ['**/*.html'],
          dest: '<%= app.dist %>/<%= app.baseurl %>'
        }]
      }
    },
    cssmin: {
      dist: {
        options: {
          keepSpecialComments: 0,
          check: 'gzip'
        },
        files: [{
          expand: true,
          cwd: '<%= app.dist %>/<%= app.baseurl %>/styles',
          src: ['*.css'],
          dest: '<%= app.dist %>/<%= app.baseurl %>/styles'
        }]
      }
    },
    imagemin: {
      options: {
        progressive: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app.dist %>/<%= app.baseurl %>/images',
          src: '**/*.{jpg,jpeg,png,gif}',
          dest: '<%= app.dist %>/<%= app.baseurl %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app.dist %>/<%= app.baseurl %>/images',
          src: '**/*.svg',
          dest: '<%= app.dist %>/<%= app.baseurl %>/images'
        }]
      }
    },
    copy: {
      server: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= app.src %>/_assets',
            src: ['images/**/*'],
            dest: '.tmp/<%= app.baseurl %>'
          },
          {
            expand: true,
            dot: true,
            cwd: '<%= app.src %>/_assets',
            src: ['fonts/**/*'],
            dest: '.tmp/<%= app.baseurl %>'
          },
          {
            expand: true,
            dot: true,
            cwd: 'bower_components/sass-bootstrap',
            src: ['fonts/**/*'],
            dest: '.tmp/<%= app.baseurl %>'
          },
          {
            expand: true,
            dot: true,
            cwd: '<%= app.src %>/_assets',
            src: ['icons/**/*'],
            dest: '.tmp/<%= app.baseurl %>'
          }
        ]
      }
    },
    buildcontrol: {
      dist: {
        options: {
          dir: '<%= app.dist %>/<%= app.baseurl %>',
          remote: 'git@github.com:jguittard/jguittard.github.io.git',
          branch: 'gh-pages',
          commit: true,
          push: true,
          connectCommits: false
        }
      }
    }
  });

  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'jekyll:server',
      'sass:server',
      'copy:server',
      'autoprefixer',
      'uglify',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'jekyll:dist',
    'imagemin',
    'svgmin',
    'sass:dist',
    'uncss',
    'autoprefixer',
    'cssmin',
    'uglify',
    'critical',
    'htmlmin'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'copy',
    'buildcontrol'
  ]);

  grunt.registerTask('default', [
    'serve'
  ]);
};
