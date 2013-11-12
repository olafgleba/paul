# Paul

*Paul* is my personal frontend development environment and just reflects my approach to facilitate my daily work. It relies on libraries and extensions such as [Bower](http://bower.io), [Grunt](http://gruntjs.com), [Sass](http://sass-lang.org) and the [inuit.css](http://inuitcss.com/) CSS framework as the foundation to build up the real css stuff.

## Introduction

*Paul* allows you to assemble libraries easily, starts a webserver and a livereload server to watch out for changes and run appropriate tasks like concatenation, minification, file copy, text pattern substitution and more. It also includes a HTML boilerplate to start with.

Altough it is highly configurable, the main attempt is **workflow simplification** and **staying focused** on your real work. Simply run `grunt` (or `grunt-deploy`) on the console,  dig into coding your site and forget about the magic that happens behind.

## Requirements

You must have installed the latest [Node.js](http://nodejs.org/), [Grunt](http://gruntjs.com), [Bower](http://bower.io) and [Sass](http://sass-lang.org) plus ([SASS-Globbing Plugin](https://github.com/chriseppstein/sass-globbing)).

## Get Paul

### Make a choice:

* Clone the git repo: `git clone https://github.com/olafgleba/paul.git`
* Download the (#)zip, extract it and have a go.

## Getting started

1. Open the `Grundfile.js` and set your prefered browser (search for `$BROWSER` comment block)
2. If you are on OS X execute `build-bower-components.command` and `build-node-modules.command` by double-clicking or run it from the console. On Windows execute both `*.bat` files.
3. Run `$ grunt` on the console

You're done. Enjoy development...

## Usage

### Rules:

* Paul follows a *single direction approach*. That means we have **one** main `app/` folder for both, development and deployment.
* **All** of your editable files lives within the `source/` root folder.
* **Any** edit or adding/removing files solely takes place within the source/ root folder only (**Never ever** put any of those files into the `app/` folder or edit any files right there, because this will break how things work - your files will be overwritten on the very next task execution).

### Hints

* All prepared library plugins are installed as a bower component. To find out how to add/remove easily such plugins, search for `$CONCAT` comment block within the `Gruntfile.js`.
* All stuff within the `source/scss/` folder represents my opinionated way of organizing my SASS files. Altough i recommend to give it a try, you are free to replace it anytime to implement your own approach. If you want to change the naming of both compiled stylesheets (`styles.scss`, `dated.scss`), you must edit the appropriate config variable within the `Gruntfile.js` (search for `$CSS` comment block) and adapt the paths within your HTML files (`source/html/...`) accordingly.

## Documentation

Actually there is no regular documentation, but all files contains **extensive annotations** and there is a README file in every appropriate folder. Hint: Dig into the `Gruntfile.js`. The comments in this file will probably gives you a rather comprehensive overview how it all works. I also will add a `doc.md` with some workflow examples soon.

## Prepared components/modules

To ensure you always work with the most current component/module version, these files are not included in the project download actually. Installing them is fairly simple: execute both `*.command` bash scripts that comes with Paul and you're done (see above *Getting started*).

### Bower

* [FastClick](https://github.com/ftlabs/fastclick)
* [inuit.css](http://inuitcss.com/)
* [Modernizr](https://github.com/Modernizr/Modernizr)
* [jQuery](https://github.com/components/jquery)
* [jQuery Plugin Easing](http://gsgd.co.uk/sandbox/jquery/easing/)

### Grunt

Requires installation of Grunt version >= 0.4.x

* [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean)
* [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)
* [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass)
* [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)
* [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
* [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
* [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
* [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
* [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)
* [grunt-modernizr](https://github.com/Modernizr/grunt-modernizr)
* [grunt-replace](https://github.com/outaTiME/grunt-replace)
* [grunt-open](https://github.com/jsoverson/grunt-open)
* [grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer)
* [grunt-csso](https://github.com/t32k/grunt-csso)
* [matchdep](https://github.com/tkellen/node-matchdep)
* [connect-livereload](https://github.com/intesso/connect-livereload)

## Support

If you have any question, <a href="#">get in touch</a> with me. For bug reports, please use the project <a href="#">issue tracker

## Kudos to

* [Harry Roberts](http://csswizardry.com/)
* [The bower team](http://bower.io)
* [The grunt devs](http://gruntjs.com)
* [Founder of Sass](http://sass-lang.org)



## License stuff

I throw it with a MIT License. So tweak it, trash it, rewrite it, make it better - do whatsover you like to do with it ;-). It's just my personal approach i like to share...