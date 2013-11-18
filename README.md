# Paul [![Build Status](https://travis-ci.org/olafgleba/paul.png)](https://travis-ci.org/olafgleba/paul)

*Paul* is my personal frontend development environment and just reflects my approach to facilitate my daily work. It relies on libraries and extensions such as [Bower](http://bower.io), [Grunt](http://gruntjs.com), [Sass](http://sass-lang.org) and the [inuit.css](http://inuitcss.com/) CSS framework.

## Introduction

*Paul* allows you to assemble libraries easily, starts a webserver and a livereload server to watch out for changes and run appropriate tasks like concatenation, minification, file copy, text pattern substitution and more. It provides easy maintainment of infinite project sections and comes with a HTML5 boilerplate to start with.

Although it is highly configurable, the main attempt is **workflow simplification** and **staying focused** on your real work. Simply run `grunt` (or `grunt deploy`) on the console,  dig into coding your site and forget about the magic that happens behind.

## Requirements

You must have installed the latest [Node.js](http://nodejs.org/), [Grunt](http://gruntjs.com), [Bower](http://bower.io) and [Sass](http://sass-lang.org) plus the [SASS-Globbing Plugin](https://github.com/chriseppstein/sass-globbing).

## Get Paul

### Make a choice:

* Clone the git repo: `git clone https://github.com/olafgleba/paul.git`
* [Download the zip](https://github.com/olafgleba/paul/archive/master.zip), extract it and have a go.

## Getting started

1. Open the `Grundfile.js` and set your prefered browser (search for `$BROWSER` comment block)
2. If you are on OS X execute `build-bower-components.command` and `build-node-modules.command` by double-click or run it from the console. I'll add Windows related scripts soon.
3. Run `$ grunt` on the console

You're done. Enjoy development...

## Usage rules

Paul follows a *single direction approach*. That means we have **one** main `app/` output folder for both, development and deployment. So the following rules are essential:

* **All** of your source files lives within the `source/` root folder.
* **Any** edit or add/remove solely takes place within the `source/` root folder only (**Never ever** put anything into the `app/` folder or edit files right there. This will break how Paul works: your files will be overwritten on the very next task execution).

## Documentation

Actually there is no regular documentation, but all files contains **extensive annotations**. Hint: Dig into the `Gruntfile.js`. The comments in this file will probably gives you a rather comprehensive overview how it all works.

I also will add a `workflows.md` with some *real life* examples soon and probably some wiki pages.

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