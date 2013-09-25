/**
 * Paul.framework Gruntfile
 * @version 1.0.0
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
        tasks: ['clean:cache','sass:dev']
      },
      concat: {
        files: '<%= project.src %>/**/*.js',
        tasks: ['concat:all']
      },
      copy: {
        files: '<%= project.src %>/img/source/**/*.{png,jpg,jpeg,gif,svg}',
        tasks: ['clean:images', 'copy:imagesSrcToApp']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '<%= project.app %>/css/*.css',
          '<%= project.app %>/libs/*.js',
          '<%= project.app %>/*.html',
          '<%= project.src %>/img/**/*.{png,jpg,jpeg,gif,svg}'
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
    
    
    
    
    clean: {
      images: {
        src: ['<%= project.app %>/img/**/*.{png,jpg,jpeg,gif,svg}']
      },
      cache: {
        sass: ['.sass-cache']
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
          require: 'sass-globbing'
        },
        files : {
          '<%= project.app %>/css/styles.min.css': '<%= project.css.styles %>',
          '<%= project.app %>/css/dated.min.css': '<%= project.css.dated %>'
        }
      },      
      deploy : {
        options: {
          style: 'compressed',
          require: 'sass-globbing',
          banner: '<%= project.banner %>'
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
      lib: {
        files : {
             '<%= project.app %>/libs/vendor/jquery.min.js': 'bower_components/jquery/jquery.min.js',
             '<%= project.app %>/libs/vendor/jquery.min.map': 'bower_components/jquery/jquery.min.map'
           }
      },
      // imagesToSrc: {
      //         files: [
      //           { 
      //             expand: true,
      //             cwd: '<%= project.app %>/img/',
      //             src: ['**/*.{png,jpg,jpeg,gif,svg}'],
      //             dest: '<%= project.src %>/img/source/'
      //           }
      //         ]
      //       },
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
      imagesSrcToApp: {
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
         * Add/Remove bower plugin components
         */
        files: {
          '<%= project.app %>/libs/vendor/plugins.min.js': 
          [
              'bower_components/fastclick/lib/fastclick.js',
              'bower_components/jquery.easing/js/jquery.easing.js',
              'bower_components/jquery.smooth-scroll/jquery.smooth-scroll.js',
              'bower_components/jquery.transit/jquery.transit.js'
          ],
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
    },
    
    
           
  
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


  // development
  grunt.registerTask('prepare', [
    'copy:lib',
    'modernizr'
    ]
  );  


  // development
  grunt.registerTask('dev-process', [
    'jshint',
    'concat:all',
    'sass:dev',
    'copy:imagesSrcToApp'
    ]
  );   

  // development
  grunt.registerTask('dev', 
    function() {
      var jquery = grunt.file.exists('app/libs/vendor/jquery.min.js');
      var modernizr = grunt.file.exists('app/libs/vendor/modernizr.min.js');
      
      if (jquery === false || modernizr === false) {
        grunt.task.run('prepare');
      }     
      grunt.task.run('dev-process');
    }
  );
  
  
  grunt.registerTask('deploy', [
    'concat:all',
    'sass:deploy',
    'uglify:deploy',
    'imagemin',
    'copy:imagesMinfiedToApp'
    ]
  );
  
  grunt.registerTask('deploy', [
    'concat:all',
    'sass:deploy',
    'replace',
    'uglify:deploy',
    'imagemin',
    'copy:imagesMinfiedToApp'
    ]
  );
  
  // grunt.registerTask('deploy-process', [
  //   'concat:all',
  //   'sass:deploy',
  //   'uglify:deploy'
  //   ]
  // );
  
  // grunt.registerTask('deploy', 
  //   function() {
  //     var sourceImageDir = grunt.file.isDir('src/img/source');
  //     
  //     grunt.task.run('prepare');
  //   
  //     if (sourceImageDir === false) {
  //       grunt.task.run('copy:imagesToSrc', 'imagemin', 'copy:imagesToApp');
  //     }    
  //     grunt.task.run('deploy-process');
  //   }
  // );

  
  // grunt.registerTask('deploy-wcom-process', [
  //   'concat:all',
  //   'sass:deploy',
  //   'uglify:deploy',
  //   'replace'
  //   ]
  // );
  // 
  // grunt.registerTask('deploy-wcom', 
  //   function() {
  //     var sourceImageDir = grunt.file.isDir('src/img/source');
  //     
  //     grunt.task.run('prepare');
  //   
  //     if (sourceImageDir === false) {
  //       grunt.task.run('copy:imagesToSrc', 'imagemin', 'copy:imagesToApp');
  //     }    
  //     grunt.task.run('deploy-wcom-process');
  //   }
  // );
  
  
  // // default
  grunt.registerTask('default', [
    'connect', 'watch'
    ]
  );

};