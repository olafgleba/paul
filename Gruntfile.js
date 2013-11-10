/**
 * Paul Gruntfile
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
     * Read bower.json and make it
     * available with the `bower` variable
     */
    bower: grunt.file.readJSON('bower.json'),


    /**
     * Read bower.json of choosen library and make it
     * available with the `library` variable
     */
    library: grunt.file.readJSON('bower_components/jquery/bower.json'),


    /**
     * Define project paths and patterns
     *
     * This is the place where almost all
     * configuration is done. The Grundfile
     * heavely uses these variables to simplify
     * maintainment. So to say, if you like to
     * edit the environment, you'll probably just
     * need to change variables within this section
     */
    project: {

      /**
       * $PATHS
       *
       * Set the app and source folder
       */
      app: 'app',
      src: 'source',

      /**
       * $CSS
       *
       * Set origin paths, the main stylesheet
       * and a fallback for older browsers (eg. < 9 IE)
       */
      css: {
        source: {
          path:     '<%= project.src %>/scss',
          base:     '<%= project.src %>/scss/styles.scss',
          fallback: '<%= project.src %>/scss/dated.scss'
        },
        app: {
          path:     '<%= project.app %>/css',
          base:     '<%= project.app %>/css/styles.min.css',
          fallback: '<%= project.app %>/css/dated.min.css'

        }
      },

      /**
       * $JAVASCRIPT
       *
       * Set origin paths, the main and
       * the plugins javascript file
       */
      js: {
        source: {
          path:      '<%= project.src %>/libs',
          vendor:    '<%= project.src %>/libs/vendor',
          base:      '<%= project.src %>/libs/base.js'
        },
        app: {
          path:       '<%= project.app %>/libs',
          vendor:     '<%= project.app %>/libs/vendor',
          base:       '<%= project.app %>/libs/base.min.js',
          plugins:    '<%= project.app %>/libs/vendor/plugins.min.js'
        }
      },

      /**
       * $LIBRARY
       *
       * Set your prefered javascript library
       *
       */
      library: {
        file: 'jquery.min.js',
        path: 'bower_components/jquery'
      },

      /**
       * $BROWSER
       *
       * Set your prefered Browser
       * Could be: `Firefox`, `Google Chrome` also
       */
      browser: 'Google Chrome Canary',

      /**
       * $BANNER
       *
       * Define Project information banner, which will
       * appear on top of every css and javascript file
       * when the grunt task `grunt deploy` is excecuted.
       * Inherits from package.json
       */
      banner: '/**\n' +
              ' * Project: <%= pkg.name %>\n' +
              ' * Description: <%= pkg.description %>\n' +
              ' * Site: <%= pkg.homepage %>\n' +
              ' * \n' +
              ' * @author <%= pkg.author.name %>, <<%= pkg.author.email %>>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' * @lastmodified <%= grunt.template.today() %>\n' +
              ' * \n' +
              ' * <%= pkg.licenses.type %> licensed.\n' +
              ' */\n\n'
    },


    /**
     * $CONNECT
     *
     * Connect the server, start local webserver
     * and enable livereload on development folder
     * by injecting livereload snippet with a
     * middleware approach
     *
     * Grunt task scope: default
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


    /**
     * $OPEN
     *
     * Open prefered Browser on defined port
     *
     * Grunt task scope: default
     */
    open : {
      dev: {
        path: 'http://127.0.0.1:<%= connect.options.port %>',
        app: '<%= project.browser %>'
      }
    },


    /**
     * $JSHINT
     *
     * Check syntax consistence.
     * Define JSHint options inline
     *
     * Grunt task scope: default
     */
    jshint: {
      files: [
        '<%= project.js.source.base %>'
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
     * $WATCH
     *
     * Run tasks on watched files. Sass changes
     * leads to page injection, changes in other
     * files forces the browser to reload the page
     */
    watch: {
      sass: {
        files: '<%= project.css.source.path %>/**/*.scss',
        tasks: ['sass:dev']
      },
      concat: {
        files: ['<%= project.js.source.path %>/**/*.js', 'bower.json'],
        tasks: ['concat:all']
      },
      images: {
        files: '<%= project.src %>/img/source/**/*.{png,jpg,jpeg,gif,svg}',
        tasks: ['clean:images', 'copy:imagesSourceToApp']
      },
      assets: {
        files: '<%= project.src %>/assets/**/*',
        tasks: ['clean:assets', 'copy:assetsSourceToApp']
      },
      icons: {
        files: '<%= project.src %>/icons/**/*',
        tasks: ['clean:icons', 'copy:iconsSourceToApp']
      },
      templates: {
        files: ['<%= project.src %>/html/**/*', '<%= project.src %>/misc/**/*'],
        tasks: ['replace']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '<%= project.css.app.path %>/**/*.css',
          '<%= project.js.app.path %>/**/*.js',
          '<%= project.src %>/img/source/**/*.{png,jpg,jpeg,gif,svg}',
          '<%= project.src %>/assets/**/*',
          '<%= project.src %>/icons/**/*',
          '<%= project.src %>/html/**/*'
        ]
      }
    },


    /**
     * $AUTOPREFIXER
     *
     * Vendor prefixing on compile
     * s. $CSSO also
     *
     * Grunt task scope: deploy
     */
    autoprefixer: {
      styles: {
        src:  '<%= project.css.app.base %>',
        dest: '<%= project.css.app.base %>'
      },
      dated: {
        src:  '<%= project.css.app.fallback %>',
        dest: '<%= project.css.app.fallback %>'
      }
    },


    /**
     * $CSSO
     *
     * Compress styles after vendor prefixing
     *
     * Grunt task scope: deploy
     */
    csso: {
      deploy: {
        options: {
          report: 'gzip',
          banner: '<%= project.banner %>'
        },
        files: {
          '<%= project.css.app.base %>': '<%= project.css.app.base %>',
          '<%= project.css.app.fallback %>': '<%= project.css.app.fallback %>'
        }
      }
    },


    /**
     * $CLEAN
     *
     * Delete files or folders as a pre-step
     * for some population tasks
     *
     * Grunt task scope: default, deploy
     */
    clean: {
      images: {
        src: ['<%= project.app %>/img/**/*.{png,jpg,jpeg,gif,svg}']
      },
      minified: {
        src: ['<%= project.src %>/img/minified/**/*.{png,jpg,jpeg,gif,svg}']
      },
      assets: {
        src: ['<%= project.app %>/assets/']
      },
      icons: {
        src: ['<%= project.app %>/icons/']
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
     * $SASS
     *
     * Compiles all SCSS files. Add project information
     * banner to those files when in deploy mode.
     *
     * Grunt task scope: default, deploy
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
          '<%= project.css.app.base %>': '<%= project.css.source.base %>',
          '<%= project.css.app.fallback %>': '<%= project.css.source.fallback %>'
        }
      },
      deploy : {
        options: {
          sourcemap: false,
          style: 'expanded',
          noCache: true,
          require: 'sass-globbing'
        },
        files : {
          '<%= project.css.app.base %>': '<%= project.css.source.base %>',
          '<%= project.css.app.fallback %>': '<%= project.css.source.fallback %>'
        }
      }
    },


    /**
     * $MODERNIZR
     *
     * Build custom modernizr file depending
     * on what's been found within your css
     * and javscript files.
     *
     * Grunt task scope: default, deploy
     */
    modernizr: {
      devFile:    'bower_components/modernizr/modernizr.js',
      outputFile: '<%= project.js.app.vendor %>/modernizr.min.js',
      extra: {
        load: false,
        shiv: true,
        cssclasses: true,
        mq: true
      },
      uglify: true,
      files: [
        '<%= project.js.source.path %>/**/*.js',
        '<%= project.css.source.path %>/**/*.scss'
      ]
    },


    /**
     * $IMAGEMIN
     *
     * Grab all source images, minify them
     * and shove it to the appropriate app folder
     *
     * Grunt task scope: deploy
     */
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


    /**
     * $COPY
     *
     * Misc. copy tasks to follow the `single direction`
     * approach (See doc/paul.md also)
     *
     * Grunt task scope: default, deploy
     */
    copy: {
      library: {
        files : {
             '<%= project.js.app.vendor %>/<%= project.library.file %>':
                        '<%= project.library.path %>/<%= project.library.file %>'
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
      },
      assetsSourceToApp: {
        files: [
          {
            expand: true,
            cwd: '<%= project.src %>/assets/',
            src: ['**'],
            dest: '<%= project.app %>/assets/'
          }
        ]
      },
      iconsSourceToApp: {
        files: [
          {
            expand: true,
            cwd: '<%= project.src %>/icons/',
            src: ['**'],
            dest: '<%= project.app %>/icons/'
          }
        ]
      },
      miscSourceToApp: {
        files: [
          {
            expand: true,
            cwd: '<%= project.src %>/misc/',
            src: ['**'],
            dest: '<%= project.app %>'
          }
        ]
      }
    },


    /**
     * $CONCAT
     *
     * Concatenate javascript files, collect
     * bower plugins plus vendor file and build
     * a single file of it. Build our main
     * javascript file separately.
     *
     * Grunt task scope: default, deploy
     */
    concat: {
      options: {
        stripBanners: true,
        banner: '<%= project.banner %>'
      },
      all: {
        /**
         * Concatenate bower plugins, append other
         * vendor scripts to it and build our main base
         * javascript file
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
         * within the bower.json file.
         * To remove a plugin itself run:
         *
            `bower uninstall <package> --save`
         *
         */
         files: {
           '<%= project.js.app.plugins %>':
           [
            // Get all specified bower plugins
            '<%= bower.plugins %>',

            // Get available vendor scripts
            '<%= project.js.source.vendor %>/*.js'
           ],
          /**
           * Build our base javascript file
           */
          '<%= project.js.app.base %>': '<%= project.js.source.base %>'
        }
      }
    },


    /**
     * $UGLIFY
     *
     * Add banner and compress our javascript files.
     *
     * Grunt task scope: deploy
     */
    uglify: {
      options: {
        banner: '<%= project.banner %>'
      },
      deploy: {
        files: {
          '<%= project.js.app.base %>': '<%= project.js.source.base %>',
          '<%= project.js.app.plugins %>': '<%= project.js.app.plugins %>'
        }
      }
    },


    /**
     * $REPLACE
     *
     * Substitute text patterns with a given string
     *
     * Grunt task scope: default, deploy
     */
    replace: {
      deploy: {
        options: {
          patterns: [
            {
              match: 'version',
              replacement: '<%= library.version %>'
            },
            {
              match: 'author.name',
              replacement: '<%= pkg.author.name %>'
            },
            {
              match: 'author.email',
              replacement: '<%= pkg.author.email %>'
            },
            {
              match: 'file',
              replacement: '<%= project.library.file %>'
            },
            {
              match: 'timestamp',
              replacement: '<%= grunt.template.today() %>'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['<%= project.src %>/html/**/*',
          '<%= project.src %>/misc/**/*'], dest: 'app/'}
        ]
      }
    }


    /**
     * $REPLACE
     *
     * These are special tasks to change path and
     * syntaxes while deploying for the CMS
     * Welcompose only.
     *
     * Grunt task scope: deploy
     */
    // replace: {
    //   css: {
    //     src: [
    //       '<%= project.css.app.base %>',
    //       '<%= project.css.app.fallback %>'
    //     ],
    //     overwrite: true,
    //     replacements: [
    //       {
    //         // change image references within css files to wcom smarty syntax
    //         from: /(url\()(..\/img\/)([a-z\-\.]+)(\))/g,
    //         to: '$1=%global_file name="$3"%=$4'
    //       },
    //       {
    //         // change to root (or whatever prefixed dir) for folder include
    //         from: /(..)(\/assets\/)/g,
    //         to: '$2'
    //       }
    //     ]
    //   },
    //   js: {
    //     src: '<%= project.js.app.base %>',
    //     overwrite: true,
    //     replacements: [
    //       {
    //         // change image references within js files to wcom smarty syntax
    //         from: /(url\()(..\/img\/)([a-z\-\.]+)(\))/g,
    //         to: '$1/files/global_files/$3'
    //       }
    //     ]
    //   }
    // }


  }); // eol grunt.initConfig


  /**
   * $MATCHDEP
   *
   * Dynamically load npm tasks
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  /**
   * $DEFAULT
   *
   * Run this task by type `grunt` on the
   * console to start development. This starts
   * the localwebser, open a browser and prepares
   * the application folder right away.
   */
  grunt.registerTask('default', [
    'jshint',
    'modernizr',
    'concat',
    'sass:dev',
    'clean:images',
    'clean:minified',
    'clean:assets',
    'clean:icons',
    'copy:library',
    'copy:imagesSourceToApp',
    'copy:assetsSourceToApp',
    'replace',
    'connect',
    'open',
    'watch'
    ]
  );


  /**
   * $DEPLOY
   *
   * Run this task by type `grunt deploy` when
   * you finish development. Clear up the
   * application folder, get rid of dot files,
   * minify binary data, compile and compress
   * the css and javascript
   */
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
    'clean:assets',
    'clean:icons',
    'imagemin',
    'replace',
    'copy:imagesMinifiedToApp',
    'copy:assetsSourceToApp',
    'copy:iconsSourceToApp',
    'copy:miscSourceToApp'
    ]
  );


  /**
   * $DEPLOY-WCOM
   *
   * Special task while deploying for the
   * CMS Welcompose.
   */
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
    'clean:assets',
    'clean:icons',
    'imagemin',
    'copy:imagesMinifiedToApp',
    'copy:assetsSourceToApp',
    'copy:iconsSourceToApp'
    ]
  );


  /**
   * $SERVER
   *
   * Start web- and livereload
   * server only. Useful after
   * deploying your site.
   */
  grunt.registerTask('server', [
    'connect',
    'open'
    ]
  );

}; // eol module.exports