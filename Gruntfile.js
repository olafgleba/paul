'use strict';

// connect middleware
var path = require('path');
var mountFolder = function mountFolder(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // get jquery version
    jq: grunt.file.readJSON('bower_components/jquery/bower.json'),

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
        'bitwise': true,
        'curly': true,
        'eqnull': false,
        'eqeqeq': true,
        'undef': false,
        'asi': true,
        'jquery': false
      }
    },
    
    clean : {
      deploy: ['dist']
    },
    
		modernizr: {
			devFile: 'bower_components/modernizr/modernizr.js',
			outputFile : 'dist/libs/vendor/modernizr.min.js',
			extra: {
				shiv: true,
				mq: true
			},
			uglify: true,
			files: ['libs/*.js', 'scss/**/*.scss']
		},
		
    imagemin: {
      deploy: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            expand: true,
            cwd: 'img/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'dist/img/'
          }
        ]
      }
    },
		
    concat: {
      files: {
        /**
         * Add whatever bower components we have installed
         */
        'libs/app/plugins.js': [
          'bower_components/jquery.smooth-scroll/jquery.smooth-scroll.js',
          'bower_components/jquery.transit/jquery.transit.js'
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
    
    copy: {
        files: {
          src: [
          '*.html',
          '.htaccess',
          'humans.txt',
          'robots.txt',
          'favicon.ico',
          'icons/**',
          'img/**',
          'assets/**'
          ],
          dest: 'dist/' 
        }
    },
    
    uglify: {
      base: {
        options: {
          banner: '/*!\n * Project: <%= pkg.name %>\n' +
          ' * Version: <%= pkg.version %>\n' +
          ' * Build: <%= grunt.template.today("yyyy-mm-dd")%>' +
          '\n * \n' +
          ' * Base application javascript\n' +
          ' */' + 
          '\n\n'
        },
        files: {
          'dist/libs/app/base.min.js': 'libs/app/base.js'
        }
      },
      plugins: {
        options: {
          banner: '/*!\n * Project: <%= pkg.name %>\n' +
          ' * Version: <%= pkg.version %>\n' +
          ' * Build: <%= grunt.template.today("yyyy-mm-dd")%>' +
          '\n * \n' +
          ' * Concatenated javascript plugins\n' +
          ' */' + 
          '\n\n'
        },
        files: {
          'dist/libs/app/plugins.min.js': 'libs/app/plugins.js'
        }
      },
      jquery: {
        options: {
          banner: '/*!\n * Project: <%= pkg.name %>\n' +
          ' * Version: <%= pkg.version %>\n' +
          ' * Build: <%= grunt.template.today("yyyy-mm-dd")%>' +
          '\n * \n' +
          ' * Version: <%= jq.version %>\n' +
          ' */' + 
          '\n\n'
        },
        files: {
          'dist/libs/vendor/jquery.min.js': 'bower_components/jquery/jquery.js'
        }
      }
    },
    
    replace: {
      wcomCss: {
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
      wcomJs: {
        src: ['dist/libs/app/base.min.js'],
        overwrite: true,
        replacements: [
          {
            // change image references within js files to wcom smarty syntax
            from: /(url\()(..\/img\/)([a-z\-\.]+)(\))/g,
            to: '$1/files/global_files/$3'
          }
        ]
      },
      html: {
        src: ['dist/*.html'],
        overwrite: true,
        replacements: [
          {
            // change file references (bower_components/ files)
            // from `name-of-file.suffix`to `name-of-file.min.suffix`
            from: /(bower_components\/[a-z\-]+)\/([a-z\-]+)([\.]+)([js]+)/g,
            to: 'libs/vendor/$2.min.$4'
          },
          {
            // change file references (libs/app files)
            // from `name-of-file.suffix`to `name-of-file.min.suffix`
            from: /(libs\/app\/[a-z\-]+)([\.]+)([js]+)/g,
            to: '$1.min.$3'
          }
        ]
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
  grunt.loadNpmTasks('grunt-contrib-imagemin');
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
    'concat'
    ]
  );
  
  // deploy
  grunt.registerTask('deploy', [
    'clean',
    'modernizr',
    'concat',
    'sass:deploy', 
    'copy',
    'imagemin:deploy',
    'uglify:base',
    'uglify:jquery',
    'uglify:plugins',
    'replace:html'
    ]
  );
  
  // deploy with wcom replacements
  grunt.registerTask('deploy-wcom', [
    'clean', 
    'modernizr',
    'concat', 
    'sass:deploy',
    'copy',
    'imagemin:deploy',
    'replace:html',
    'uglify:base', 
    'uglify:jquery',
    'uglify:plugins',
    'replace:wcomCss', 
    'replace:wcomJs'
    ]
  );
  
  // default
  grunt.registerTask('default', [
    'connect', 'watch'
    ]
  );
  
};