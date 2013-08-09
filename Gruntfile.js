// connect middleware
'use strict';
var path = require('path');
var mountFolder = function mountFolder(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      options: {
        port: 9001
      },
      dev: {
        options: {
          middleware: function (connect) {
            return [
              require('connect-livereload')(),
              mountFolder(connect, '.')
            ];
          }
        }
      }
    },  
    
    watch: {
      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['sass:dev']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ['css/*.css', 'libs/*.js', '*.html']
      }
    },   
    
    jshint: {
      all: [
        'Grundfile.js', 
        'libs/base.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    replace: {
      css: {
        src: ['dist/css/styles.css', 'dist/css/dated.css'],
        overwrite: true,
        replacements: [
          {
            // change image references within css files to wcom smarty syntax
            from: /(url\()(..\/img\/)([a-z\-\.]+)(\))/g,
            to: '$1=%global_file name="$3"%=$4'
          },
          {
            // change to root (or whatever prefixed dir) for folder include
            from: /(..)(\/assets\/)/g,
            to: '$2'
          }
        ]   
      },
      js: {
        src: ['dist/libs/base.js'],
        overwrite: true,
        replacements: [
          {
            // change image references within js files to wcom smarty syntax
            from: /(url\()(..\/img\/)([a-z\-\.]+)(\))/g,
            to: '$1/files/global_files/$3'
          }
        ]
      }
    },
    
    sass: {
      dev: {
        options: {
          sourcemap: true,
          unixNewlines: false,
          lineNumbers: true,
          debugInfo: false,
          style: 'expanded'
        },
        files : {
          'css/styles.css': 'scss/styles.scss',
          'css/dated.css': 'scss/dated.scss'
        }
      },      
      deploy : {
        options: {
          lineNumbers: false,
          style: 'compressed'
        },
        files : {
          'dist/css/styles.css': 'scss/styles.scss',
          'dist/css/dated.css': 'scss/dated.scss'
        }     
      }
    },
    
		modernizr: {
			devFile: 'libs/vendor/modernizr-latest.js',
			outputFile : 'dist/libs/vendor/modernizr-latest.js',

			extra: {
				shiv: true,
				mq: true
			},
			uglify: true,
			files: ['js/**/*.js', 'scss/**/*.scss']
		},
    
    clean : {
      deploy: ['dist']
    },
    
    concat: {
      dev: {
        files: {
          // place whatever we need in current project
          // example: 
          // libs/plugins.js': [
            // 'libs/vendor/jquery.smooth-scroll.js',
            // 'libs/vendor/jquery.transit.js'
          // ]
        }
      },
      dist: {
        files: {
          // place whatever we need in current project
          // example:
          // 'dist/libs/plugins.js': [
          //     'libs/vendor/jquery.smooth-scroll.js',
          //     'libs/vendor/jquery.transit.js'
          // ]
        }
      }
    },
    
    // compile from jquery submodule and place into vendor path
    uglify: {
      dist: {
        files: {
          'dist/libs/base.js': ['dist/libs/base.js'],
          'dist/libs/plugins.js': ['dist/libs/plugins.js'],
          'dist/libs/vendor/jquery.js': ['dist/libs/vendor/jquery.js']
        }
      }
    },
        
    copy: {
        files: {
          src: [
          '*.html',
          '.htaccess',
          'humans.txt',
          'robots.txt',
          'favicon.ico',
          'img/**',
          'icons/**',
          'assets/**',
          'libs/base.js',
          'libs/vendor/jquery.js'
          ],
          dest: 'dist/' 
        }
    }            
  
  });
  
  // load modules
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-check-modules');
  
  // check module state only
  grunt.registerTask('check', [
    'jshint',
    'check-modules'
    ]
  );
  
  // development
  grunt.registerTask('dev', [
    'jshint', 
    'sass:dev', 
    'concat:dev'
    ]
  );
  
  // deploy
  grunt.registerTask('deploy', [
    'clean',
    'modernizr', 
    'concat:dist', 
    'sass:deploy', 
    'copy', 
    'uglify:dist'
    ]
  );
  
  // deploy with wcom replacements
  grunt.registerTask('deploy-wcom', [
    'clean', 
    'modernizr', 
    'concat:dist', 
    'sass:deploy', 
    'replace:css', 
    'replace:js', 
    'copy', 
    'uglify:dist'
    ]
  );
  
  // default
  grunt.registerTask('default', [
    'connect', 'watch'
    ]
  );
  
};