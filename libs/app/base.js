/**
 * Define Application (as module)
 */
Application = (function($) {

  // private Methoden
  // ...
  
  return {
    // öffentliche Methoden, API
    init: function() {
    // ...
    
      FastClick.attach(document.body);
    }
  };
  
})(jQuery)



/**
 * DOM is ready
 */

$(function() {
 
  Application.init();

});