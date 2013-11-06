/**
 * paul Gruntfile
 * @version 1.0.0
 * @author Olaf Gleba
 */

/**
 * Return livereload environment
 * see also `connect` task
 */
var mountFolder = function mountFolder(connect, pointer) {
  return connect.static(require('path').resolve(pointer));
};

/**
 * Grunt module
 */
module.exports = function(grunt) {

  /**
   * ECMAScript 5 context mode
   * see http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
   */
  'use strict';


  /**
   * Grunt config
   */
  grunt.initConfig({

    /**
     * Read package.json and make it
     * available with the `pkg` variable
     */
    pkg: grunt.file.readJSON('package.json'),


    /**
     * Read package.json and make it
     * available with the `bower` variable
     */
    bower: grunt.file.readJSON('bower.json'),


    /**
     * Define project paths and patterns
     */
    project: {
      app: 'app',
      src: 'src',
      css: {
        styles: '<%= project.src %>/scss/styles.scss',
        dated: '<%= project.src %>/scss/dated.scss'
      },
      js: {
        base: '<%= project.src %>/libs/base.js'
      },
      library: {
        file: 'jquery.min.js',
        path: 'bower_components/jquery'
      },

      /**
       * $BROWSER
       *
       * Set your prefered Browser
       */
      browser: 'Google Chrome Canary',

      /**
       * Define Project information banner
       * Inherits from package.json
       */
      banner: '/**\n' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.title %>\n' +
              ' * <%= pkg.url %>\n' +
              ' * @author <%= pkg.author %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
              ' */\n\n'
    },


    /**
     * Connect the server
     *
     * Start local webserver and enable
     * livereload on development folder by
     * injecting livereload snippet with a
     * middleware approach
     */
    connect: {
      options: {
        port: 9001
      },
      dev: {
        options: {
          middleware: function (connect) {
            return [
              require('connect-livereload')(),

              /**
               * Serve scss `sourcemaps`
               */
              mountFolder(connect, '.'),

              /**
               * The root of our project files
               */
              mountFolder(connect, 'app')
            ];
          }
        }
      }
    },



    open : {
      dev: {
        path: 'http://127.0.0.1:<%= connect.options.port %>',
        app: '<%= project.browser %>'
      }
    },



    /**
     * Run tasks on watched files
     *
     * Sass changes leads to page injection,
     * changes in other files forces the browser
     * to reload the page
     */
    watch: {
      sass: {
        files: '<%= project.src %>/scss/**/*.scss',
        tasks: ['sass:dev', 'autoprefixer']
      },
      concat: {
        files: ['<%= project.src %>/libs/**/*.js', 'bower.json'],
        tasks: ['concat:all']
      },
      copy: {
        files: '<%= project.src %>/img/source/**/*.{png,jpg,jpeg,gif,svg}',
        tasks: ['clean:images', 'copy:imagesSourceToApp']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '<%= project.app %>/css/*.css',
          '<%= project.app %>/libs/*.js',
          '<%= project.app %>/*.html',
          '<%= project.src %>/img/source/**/*.{png,jpg,jpeg,gif,svg}'
        ]
      }
    },



    /**
     * Check syntax consistence
     *
     * Define JSHint options inline
     */
    jshint: {
      files: [
        '<%= project.js.base %>'
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


    /**
     * Autoprefix CSS on compile
     *
     * ...
     */
    autoprefixer: {
      styles: {
        src: '<%= project.app %>/css/styles.min.css',
        dest: '<%= project.app %>/css/styles.min.css'
      },
      dated: {
        src: '<%= project.app %>/css/dated.min.css',
        dest: '<%= project.app %>/css/dated.min.css'
      }
    },



    csso: {
      deploy: {
        options: {
          report: 'gzip',
          banner: '<%= project.banner %>'
        },
        files: {
          '<%= project.app %>/css/styles.min.css': '<%= project.app %>/css/styles.min.css',
          '<%= project.app %>/css/dated.min.css': '<%= project.app %>/css/dated.min.css'
        }
      }
    },




    clean: {
      images: {
        src: ['<%= project.app %>/img/**/*.{png,jpg,jpeg,gif,svg}']
      },
      minified: {
        src: ['<%= project.src %>/img/minified/**/*.{png,jpg,jpeg,gif,svg}']
      },
      cache: {
        src: ['.sass-cache']
      },
      gitignore: {
        src: ['<%= project.app %>/**/.gitignore']
      },
      cssmaps: {
        src: ['<%= project.app %>/css/*.map']
      }
    },




    /**
     * Compile SCSS files
     *
     * Compiles all SCSS files and, when in
     * deploy mode, adds project information
     * banner to those files
     */
    sass: {
      dev: {
        options: {
          sourcemap: true,
          style: 'expanded',
          noCache: true,
          require: 'sass-globbing'
        },
        files : {
          '<%= project.app %>/css/styles.min.css': '<%= project.css.styles %>',
          '<%= project.app %>/css/dated.min.css': '<%= project.css.dated %>'
        }
      },
      deploy : {
        options: {
          sourcemap: false,
          style: 'expanded',
          require: 'sass-globbing'
        },
        files : {
          '<%= project.app %>/css/styles.min.css': '<%= project.css.styles %>',
          '<%= project.app %>/css/dated.min.css': '<%= project.css.dated %>'
        }
      }
    },




    modernizr: {
      devFile:    'bower_components/modernizr/modernizr.js',
      outputFile: '<%= project.app %>/libs/vendor/modernizr.min.js',
      extra: {
        load: false,
        shiv: true,
        cssclasses: true,
        mq: true
      },
      uglify: true,
      files: [
        '<%= project.src %>/libs/*.js',
        '<%= project.src %>/scss/**/*.scss'
      ]
    },




    imagemin: {
      deploy: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            expand: true,
            cwd: '<%= project.src %>/img/source/',
            src: ['**/*.{png,jpg,jpeg,gif,svg}'],
            dest: '<%= project.src %>/img/minified/'
          }
        ]
      }
    },


    copy: {
      library: {
        files : {
             '<%= project.app %>/libs/vendor/<%= project.library.file %>': '<%= project.library.path %>/<%= project.library.file %>'
           }
      },
      imagesMinifiedToApp: {
        files: [
          {
            expand: true,
            cwd: '<%= project.src %>/img/minified/',
            src: ['**/*.{png,jpg,jpeg,gif,svg}'],
            dest: '<%= project.app %>/img/'
          }
        ]
      },
      imagesSourceToApp: {
        files: [
          {
            expand: true,
            cwd: '<%= project.src %>/img/source/',
            src: ['**/*.{png,jpg,jpeg,gif,svg}'],
            dest: '<%= project.app %>/img/'
          }
        ]
      }
    },





    concat: {
      options: {
        stripBanners: true,
        banner: '<%= project.banner %>'
      },
      all: {
        /**
         * Concatenate bower plugins
         *
         * See bower.json, hash `plugins`
         *
         * Add a plugin:
         * Make sure, the desired plugin is actually
         * installed. Install a plugin with:
         *
            `bower install <package> --save`
         *
         * Accordingly have a look at the actual path
         * of the dedicated plugin file and append it
         * to the `plugins` hash within the bower.json
         * config file.
         *
         * Delete a plugin:
         * To spare out a plugin from concatenation simply
         * delete the related row from the hash `plugins`.
         * To remove a plugin itself run:
         *
            `bower uninstall <package> --save`
         *
         */
         files: {
           '<%= project.app %>/libs/vendor/plugins.min.js':
           [
            // Get all declared bower plugins
            '<%= bower.plugins %>',

            // Get available vendor scripts
            '<%= project.src %>/libs/vendor/*.js'
           ],
          /**
           * Build our base javascript file
           */
          '<%= project.app %>/libs/base.min.js': '<%= project.js.base %>'
        }
      }
    },




    uglify: {
      options: {
        banner: '<%= project.banner %>'
      },
      deploy: {
        files: {
          '<%= project.app %>/libs/base.min.js': '<%= project.js.base %>',
          '<%= project.app %>/libs/vendor/plugins.min.js': '<%= project.app %>/libs/vendor/plugins.min.js'
        }
      }
    },




    replace: {
      css: {
        src: [
          '<%= project.app %>/css/styles.min.css',
          '<%= project.app %>/css/dated.min.css'
        ],
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
        src: '<%= project.app %>/libs/base.min.js',
        overwrite: true,
        replacements: [
          {
            // change image references within js files to wcom smarty syntax
            from: /(url\()(..\/img\/)([a-z\-\.]+)(\))/g,
            to: '$1/files/global_files/$3'
          }
        ]
      }
    }

  });




  /**
   * Dynamically load npm tasks
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  // check module state only
  grunt.registerTask('check', [
    'jshint',
    'check-modules'
    ]
  );


  // initialize
  grunt.registerTask('default', [
    'jshint',
    'copy:library',
    'modernizr',
    'concat',
    'sass:dev',
    'copy:imagesSourceToApp',
    'connect',
    'open',
    'watch'
    ]
  );


  // deploy
  grunt.registerTask('deploy', [
    'modernizr',
    'concat',
    'sass:deploy',
    'autoprefixer',
    'csso',
    'uglify:deploy',
    'clean:images',
    'clean:minified',
    'clean:gitignore',
    'imagemin',
    'copy:imagesMinifiedToApp'
    ]
  );


  // deploy wcom style
  grunt.registerTask('deploy-wcom', [
    'modernizr',
    'concat',
    'sass:deploy',
    'replace',
    'autoprefixer',
    'csso',
    'uglify:deploy',
    'clean:images',
    'clean:minified',
    'clean:gitignore',
    'imagemin',
    'copy:imagesMinifiedToApp'
    ]
  );

  // // default
  grunt.registerTask('server', [
    'connect', 'watch:livereload'
    ]
  );

};