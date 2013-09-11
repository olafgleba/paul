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
      

      
    }
  };
  
})(jQuery)



/**
 * DOM is ready
 */

$(function() {
 
  App.init();
  
  $('a[href="#totop"]').smoothScroll({
    easing: 'easeInCirc',
    speed: 900
  });

});