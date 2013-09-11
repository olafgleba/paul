/**
 * Define Application (as module)
 */
App = (function($) {

  // private Methoden
  // ...
  
  return {
    // öffentliche Methoden, API
    init: function() {
    
      FastClick.attach(document.body);
      
      $('a[href="#totop"]').smoothScroll({
        easing: 'easeOutQuint',
        speed: 1200
      });
      
    }
  };
  
})(jQuery)



/**
 * DOM is ready
 */

$(function() {
 
  App.init();

});