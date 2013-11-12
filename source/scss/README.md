# scss/

The SASS structure

Compile stylesheets: styles.scss, dated.scss

## scss/abstracts/...

### base/

Put your own abstraction in here.

### extensions/

Here lives the extended abstractions of original inuit.css abstractions.
**Never ever** modify the abstractions source, just extend it!

## sections/...

### example/...

The "example" folder is the current only project folder. It's just a placeholder to examine the scss structure.

Here lives *all* your project css.

### example/queries/

Place your media query files here.

## utilities/

Place all global functions and mixins here.

## vendor/

Place vendor CSS here. Extend and overwrite declarations in file _overrides.scss to preserver update abilities of the original ones.

## _bootstrap.scss

Import all global stuff not related any particular project.

## _example-configuration.scss

The controll desk for a project (in this case: "example"). Set inuit.css defaults, define individual variables, enable/disable abstractions includes.

## Multiple projects

* Establish as many projects you need. Every *project* implies a projectfolder (s. *sections/*) and a config file ( *_[project-name]-configuration.scss*)
