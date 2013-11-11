/**
 * Define module
 */
App = (function($) {

  // Private methods
  // ...

  return {

    // Public api
    init: function() {

      // see FastClick bower plugin
      FastClick.attach(document.body);

      // ...

    }
  };

})(jQuery);




/**
 * If DOM is ready...
 */

$(function() {

  App.init();

});