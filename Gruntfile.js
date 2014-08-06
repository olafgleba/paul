/**
 * Paul Gruntfile
 * @version 1.0.1
 * @author Olaf Gleba
 */

/**
 * ECMAScript 5 context mode
 * see http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
 */
'use strict';

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

  var svgo = require('imagemin-svgo');

  /**
   * Grunt config
   */
  grunt.initConfig({

    /**
     * $INC-PACKAGE
     *
     * Read package.json and make it
     * available with the `pkg` variable
     */
    pkg: grunt.file.readJSON('package.json'),


    /**
     * $INC-LIBRARY
     *
     * Read bower.json of choosen library and make it
     * available with the `library` variable
     */
    library: grunt.file.readJSON('bower_components/jquery/bower.json'),


    /**
     * Define project paths and patterns
     *
     * This is (in conjunction with the above $SCSS section)
     * is the place where almost all configuration
     * is done. The Grundfile heavely uses these
     * variables to simplify maintainment. So to say,
     * if you like to edit the environment, you'll probably
     * just need to change variables values within this section
     */
    project: {

      /**
       * $PATHS
       *
       * 1. Dynamic application folder
       * 2. Project source folder, inherits from package.json
       */
      app:      'app', /* [1] */
      src:      'source/sections/<%= pkg.activeSection.name %>', /* [2] */

      /**
       * $JAVASCRIPT
       *
       * Set origin paths, the main and
       * the plugins javascript file
       *
       * 1. Project source folder for related javascript files
       * 2. Project source folder for related vendor scripts
       * 3. Project source base javascript file
       * 4. Application folder for javascript files
       * 5. Application folder for vendor scripts
       * 6. Application base javascript file
       * 7. Concatenated application javascript plugin file, s. $CONCAT
       */
      js: {
        source: {
          path:      '<%= project.src %>/libs', /* [1] */
          vendor:    '<%= project.src %>/libs/vendor', /* [2] */
          base:      '<%= project.src %>/libs/base.js' /* [3] */
        },
        app: {
          path:       '<%= project.app %>/libs', /* [4] */
          vendor:     '<%= project.app %>/libs/vendor', /* [5] */
          base:       '<%= project.app %>/libs/base.min.js', /* [6] */
          plugins:    '<%= project.app %>/libs/vendor/plugins.min.js' /* [7] */
        }
      },

      /**
       * $LIBRARY
       *
       * Set your prefered javascript library
       *
       */
      library: {
        file:     '<%= library.name %>.min.js',
        version:  '<%= library.version %>',
        path:     'bower_components/jquery'
      },

      /**
       * $BROWSER
       *
       * Set your prefered Browser
       * Could be: `Firefox`, `Google Chrome` also
       */
      browser: 'Google Chrome',

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
              ' * Section: <%= pkg.activeSection.name %>\n' +
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
     * $SCSS
     *
     * Set SCSS related paths
     *
     * 1. Root name of our base stylesheet, inherits from package.json
     * 2. Root name of our stylesheet for IE =< 8, inherits from package.json
     * 3. Set source filename of our base stylesheet
     * 4. Set source filename of our fallback stylesheet
     * 5. Set compiled filename of our base stylesheet
     * 6. Set compiled filename of our fallback stylesheet
     */
    scss: {
      root:        'source/scss',
      names: {
        base:      '<%= pkg.activeSection.css.base %>', /* [1] */
        fallback:  '<%= pkg.activeSection.css.fallback %>'  /* [2] */
      },
      src: {
        base:      '<%= scss.names.base %>.scss',  /* [3] */
        fallback:  '<%= scss.names.fallback %>.scss'  /* [4] */
      },
      comp: {
        base:      '<%= scss.names.base %>.min.css',  /* [5] */
        fallback:  '<%= scss.names.fallback %>.min.css'  /* [6] */
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
        'Gruntfile.js',
        '<%= project.js.source.base %>'
      ],
      options: {
        'bitwise': true,
        'strict': true,
        'indent': 2,
        'smarttabs': true,
        'curly': true,
        'node': true,
        'eqnull': false,
        'eqeqeq': true,
        'undef': false,
        'asi': true,
        'globals': {
          '$': false,
          'jQuery': false,
          'Modernizr': false,
          'require': false,
          'module': false,
          'forEach': false
        }
      }
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
     *
     * 1. Needed to serve scss sourcemaps
     * 2. The project application folder
     */
    connect: {
      options: {
        hostname: '*',
        port: 9001
      },
      dev: {
        options: {
          middleware: function (connect) {
            return [
              require('connect-livereload')(),
              mountFolder(connect, '.'), /* [1] */
              mountFolder(connect, 'app') /* [2] */
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
     *
     * 1. Optional (absolute) path to a editor project file
     * (e.g. `/path/to/paul.sublime-project`, if you establish
     * a project file while working with the Sublime Text Editor).
     * By default it opens a `paul` folder window.
     */
    open : {
      dev: {
        path: 'http://127.0.0.1:<%= connect.options.port %>',
        app: '<%= project.browser %>'
      },
      editor: {
        path: '.' /* [1] */
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
      compile: {
        files: '<%= scss.root %>/compile/*.scss',
        tasks: ['replace:scss', 'sass:dev']
      },
      sass: {
        files: '<%= scss.root %>/**/*.scss',
        tasks: ['sass:dev', 'modernizr']
      },
      plugins: {
        files: ['<%= project.js.source.vendor %>/**/*', 'package.json'],
        tasks: ['concat:plugins']
      },
      concat: {
        files: ['<%= project.js.source.base %>'],
        tasks: ['concat:base']
      },
      images: {
        files: '<%= project.src %>/img/source/{,*/}*.{jpg,jpeg,gif,png,svg}',
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
      html: {
        files: ['<%= project.src %>/html/**/*'],
        tasks: ['clean:html', 'replace:html']
      },
      meta: {
        files: ['<%= project.src %>/meta/**/*'],
        tasks: ['clean:meta', 'replace:meta']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '<%= project.app %>/css/**/*',
          '<%= project.app %>/libs/**/*',
          '<%= project.src %>/img/source/**/*',
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
        src:  '<%= project.app %>/css/<%= scss.comp.base %>',
        dest: '<%= project.app %>/css/<%= scss.comp.base %>'
      },
      dated: {
        src:  '<%= project.app %>/css/<%= scss.comp.fallback %>',
        dest: '<%= project.app %>/css/<%= scss.comp.fallback %>'
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
          '<%= project.app %>/css/<%= scss.comp.base %>': '<%= project.app %>/css/<%= scss.comp.base %>',
          '<%= project.app %>/css/<%= scss.comp.fallback %>': '<%= project.app %>/css/<%= scss.comp.fallback %>'
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
      app: {
        src: ['<%= project.app %>']
      },
      minified: {
        src: ['<%= project.src %>/img/minified/']
      },
      images: {
        src: ['<%= project.app %>/img/**/*.{jpg,jpeg,gif,png,svg}']
      },
      assets: {
        src: ['<%= project.app %>/assets/**/*']
      },
      icons: {
        src: ['<%= project.app %>/icons/**/*']
      },
      css: {
        src: ['<%= project.app %>/css/**/*']
      },
      html: {
        src: ['<%= project.app %>/*.{html,htm,jade,haml}']
      },
      meta: {
        src: ['<%= project.app %>/*.{txt,md,mdown,markdown,htaccess}', '<%= project.app %>/htaccess']
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
     *
     * 1. s. also https://github.com/gruntjs/grunt-contrib-sass/issues/63
     */
    sass: {
      options: {
        style: 'expanded',
        noCache: true, /* [1] */
        require: 'sass-globbing'
      },
      dev: {
        options: {
          sourcemap: true
        },
        files : {
          '<%= project.app %>/css/<%= scss.comp.base %>': '<%= scss.root %>/<%= scss.src.base %>',
          '<%= project.app %>/css/<%= scss.comp.fallback %>': '<%= scss.root %>/<%= scss.src.fallback %>'
        }
      },
      deploy : {
        options: {
          sourcemap: false,
          noCache: true
        },
        files : {
          '<%= project.app %>/css/<%= scss.comp.base %>': '<%= scss.root %>/<%= scss.src.base %>',
          '<%= project.app %>/css/<%= scss.comp.fallback %>': '<%= scss.root %>/<%= scss.src.fallback %>'
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
      dist: {
        devFile:    'bower_components/modernizr/modernizr.js',
        outputFile: '<%= project.js.app.vendor %>/modernizr.min.js',
        extra: {
          load: false,
          shiv: true,
          cssclasses: true,
          mq: true
        },
        uglify: true,
        tests: ['csstransforms', 'csstransitions'],
        files: {
          src: [
            '<%= project.js.source.path %>/**/*.js',
            '<%= scss.root %>/**/*.scss'
          ]
        }
      }
    },


    /**
     * $IMAGEMIN
     *
     * Grab all source images, minify them
     * and shove it to the appropriate app folder
     *
     * Depends on imagemin-svgo` installed
     *
     * Grunt task scope: deploy
     */


    imagemin: {
      deploy: {
        options: {
          optimizationLevel: 7,
          use: [svgo()]
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
     * Several copy tasks to follow the `single direction`
     * approach of Paul.
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
            src: ['**'],
            dest: '<%= project.app %>/img/'
          }
        ]
      },
      imagesSourceToApp: {
        files: [
          {
            expand: true,
            cwd: '<%= project.src %>/img/source/',
            src: ['**', '!README.md'],
            dest: '<%= project.app %>/img/'
          }
        ]
      },
      assetsSourceToApp: {
        files: [
          {
            expand: true,
            cwd: '<%= project.src %>/assets/',
            src: ['**', '!README.md'],
            dest: '<%= project.app %>/assets/'
          }
        ]
      },
      iconsSourceToApp: {
        files: [
          {
            expand: true,
            cwd: '<%= project.src %>/icons/',
            src: ['**', '!README.md'],
            dest: '<%= project.app %>/icons/'
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
     * javascript file on its own.
     *
     * Grunt task scope: default, deploy
     */
    concat: {
      options: {
        stripBanners: true,
        banner: '<%= project.banner %>'
      },
      plugins: {
        /**
         * Concatenate bower plugins, append other
         * vendor scripts to it and build our main base
         * javascript file
         *
         * See package.json, hash `activeSection:plugins`
         *
         * Add a plugin:
         * Make sure, the desired plugin is actually
         * installed. Install a plugin with:
         *
            `bower install <package> --save`
         *
         * Accordingly have a look at the actual path
         * of the dedicated plugin file (bower_components)
         * and append it to the `activeSection:plugins` hash within
         * the package.json config file.
         *
         * Delete a plugin:
         * To spare out a plugin from concatenation simply
         * delete the related row from the hash `activeSection:plugins`.
         * within the package.json file.
         * To remove a plugin itself run:
         *
            `bower uninstall <package> --save`
         *
         * 1. Get all bower plugins for current project section
         * 2. Get available vendor scripts and append it to the plugin file
         * 3. Build our base javascript file separately
         */
        files: {
          '<%= project.js.app.plugins %>':
          [
            '<%= pkg.activeSection.plugins %>', /* [1] */
            '<%= project.js.source.vendor %>/*.js' /* [2] */
          ],
        }
      },
      base: {
        files: {
          '<%= project.js.app.base %>': '<%= project.js.source.base %>' /* [3] */
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
      options: {
        force: true,
        patterns: [
          {
            match: 'name',
            replacement: '<%= pkg.name %>'
          },
          {
            match: 'description',
            replacement: '<%= pkg.description %>'
          },
          {
            match: 'section',
            replacement: '<%= pkg.activeSection.name %>'
          },
          {
            match: 'homepage',
            replacement: '<%= pkg.homepage %>'
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
            match: 'libraryVersion',
            replacement: '<%= project.library.version %>'
          },
          {
            match: 'libraryFile',
            replacement: '<%= project.library.file %>'
          },
          {
            match: 'timestamp',
            replacement: '<%= grunt.template.today() %>'
          },
          {
            match: 'cssBase',
            replacement: '<%= scss.comp.base %>'
          },
          {
            match: 'cssFallback',
            replacement: '<%= scss.comp.fallback %>'
          }
        ]
      },
      html: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['<%= project.src %>/html/**/*', '!<%= project.src %>/html/README.md'],
            dest: '<%= project.app %>/'
          }
        ]
      },
      meta: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['<%= project.src %>/meta/**/*', '!<%= project.src %>/meta/README.md'],
            dest: '<%= project.app %>/'
          }
        ]
      },
      scss: {
        options: {
          force: false,
          patterns: [
            {
              match: 'section',
              replacement: '<%= pkg.activeSection.name %>'
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['<%= scss.root %>/compile/*.scss', '!<%= scss.root %>/src/README.md'],
            dest: '<%= scss.root %>/'
          }
        ]
      }
    }

  }); // eol grunt.initConfig


  /**
   * $LOAD
   *
   * Dynamically load npm tasks
   */
  require('load-grunt-tasks')(grunt);


  /**
   * $DEFAULT
   *
   * Run this task by enter `$ grunt` on the
   * console to start development. This starts
   * the localwebser, open a browser and prepares
   * the application folder right away.
   */
  grunt.registerTask('default', [
    'jshint',
    'clean:app',
    'concat',
    'replace:html',
    'replace:meta',
    'replace:scss',
    'copy:library',
    'copy:iconsSourceToApp',
    'copy:imagesSourceToApp',
    'copy:assetsSourceToApp',
    'modernizr',
    'sass:dev',
    'connect',
    'open',
    'watch'
  ]
  );


  /**
   * $DEPLOY
   *
   * Run this task by enter `$ grunt deploy` when
   * you finished development. It clears up the
   * application folder, get rid of dot files,
   * minify binary data, compress the css and
   * javascript and place your touch icons to the root
   */
  grunt.registerTask('deploy', [
    'clean:app',
    'clean:minified',
    'concat',
    'uglify:deploy',
    'replace:html',
    'replace:meta',
    'replace:scss',
    'copy:library',
    'imagemin',
    'copy:imagesMinifiedToApp',
    'copy:assetsSourceToApp',
    'modernizr',
    'sass:deploy',
    'autoprefixer',
    'csso'
  ]
  );

}; // eol module.exports