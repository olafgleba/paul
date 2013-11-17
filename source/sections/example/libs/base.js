/**
 * Define module
 */
App = (function($) {

  'use strict';

  // Private methods
  // ...

  return {

    // Public api
    init: function() {

      // see prepared FastClick bower plugin
      FastClick.attach(document.body);

      // ...

    }
  };

})(jQuery);


/**
 * If DOM is ready...
 */

$(function() {

  'use strict';

  App.init();

});