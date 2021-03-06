# DEPRECATED
Time moves on, *Paul* is no longer under active development. For my latest approach see https://github.com/olafgleba/sean or/and https://github.com/olafgleba/linda.

# [Paul]( http://olafgleba.github.io/paul/) [![Build Status](https://travis-ci.org/olafgleba/paul.png)](https://travis-ci.org/olafgleba/paul)

*Paul* is my current frontend development environment and just reflects my approach to facilitate my daily work. It relies on libraries and extensions such as [Bower](http://bower.io), [Grunt](http://gruntjs.com), [Sass](http://sass-lang.org) and the [inuit.css](http://inuitcss.com/) CSS framework.

## Introduction

The enviroment allows you to assemble libraries easily, starts a webserver and a livereload server to watch out for changes and run appropriate tasks like concatenation, minification, file copy, text pattern substitution and more. It provides easy maintainment of infinite project sections and comes with some templates (HTML, meta, htaccess) to start with.

Although it is highly configurable, the main attempt is **workflow simplification** and **staying focused** on your real work. Simply run `$ grunt` (e.g. `$ grunt deploy`) on the console,  dig into coding your site and forget about the magic that happens behind.

## Requirements

You must have installed the latest [Node.js](http://nodejs.org/), [Grunt](http://gruntjs.com), [Bower](http://bower.io) and [Sass](http://sass-lang.org) plus the [SASS-Globbing Plugin](https://github.com/chriseppstein/sass-globbing).

## Get Paul

### Make a choice:

* Clone the git repo: `$ git clone https://github.com/olafgleba/paul.git`
* [Download the zip](https://github.com/olafgleba/paul/archive/master.zip), extract it and have a go.

## Getting started

1. If you are on OS X execute `build-bower-components.command` and `build-node-modules.command` by double-click or run it from the console. I'll add Windows related scripts soon.
2. Run `$ grunt` on the console

You're done. Enjoy development...

## Documentation

On the [Github project page](http://olafgleba.github.io/paul/docs.html) you find some kind of documentation for the enviroment which describes the main parts of *Paul* and reflects some common **workflow examples**.

## Prepared components/modules

To ensure you always work with the most current component/module version, these files are not included in the project download actually. Installing them is fairly simple: execute both `*.command` bash scripts that comes with Paul and you're done (see above *Getting started*).

### Bower

* [FastClick](https://github.com/ftlabs/fastclick)
* [inuitcss](http://inuitcss.com/)
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
* [jit-grunt](https://github.com/shootaroo/jit-grunt)
* [connect-livereload](https://github.com/intesso/connect-livereload)

## Support

If you have any question, [get in touch](mailto:og@olafgleba.de) with me. For bug reports, please use the project [issue tracker](https://github.com/olafgleba/paul/issues).

## Kudos to

* [Harry Roberts](http://csswizardry.com/)
* [The bower team](http://bower.io)
* [The grunt devs](http://gruntjs.com)
* [Founder of Sass](http://sass-lang.org)

## Comparable projects

[FireShell](https://github.com/toddmotto/fireshell) is a project by Todd Motto with fairly similar approach.

## License stuff

I throw it with a MIT License. So tweak it, rewrite it, enhance it - do whatever you like to do with it ;-). It's just my personal approach i like to share...
