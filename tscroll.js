/* TScroll, a simple scrolling library.
 * 
 * This library handles everything related to vertical scrolling.
 *
 * - Detecting when elements come into view
 * - Smooth scrolling to an element
 *
 * No guarantee that this library works in IE.
 */


// Scroll-based events. 
// Simply add the class .tscroll to an element
// When the element is in the viewport it will 
// receive a special data attribute that you can 
// use to style the element accordingly.

bind();
// call bind manually if you add tscroll elements after the page has loaded. 
// If script is included in the head of your document, you will probably 
// need to call bind manually.
function bind(){
  if(document.getElementsByClassName("tscroll").length){
    elements = document.getElementsByClassName("tscroll");
    window.onscroll = function(){procElements()};
  }
}

/* procElements automatically sets three properties of each element in the .tscroll class. 
 * 
 * - data-scrolltop will be set to top or scroll depending on if the page has been scrolled at all
 *   this is handy for implementing sticky banners 
 * 
 * - data-scroll will be set to awake once the element enters the viewport for the first time. 
 *   the awake value will persist until the page is reloaded. 
 *
 * - data-scrollAbs will be set to visible whenever the top of the element is in the viewport
 *   and hidden whenever it is not.
 *
 * procElements only accounts for the top of the element and the viewport. there are other libraries 
 * that can give you more flexibility
 */
function procElements(){
  var els = elements; // save some time maybe?
  for(let i = 0,len = elements.length;i<len;i++){
    var element = els[i];    
    var scrollDist = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var scrolltop = (scrollDist <= 0) ? "top" : "scroll";
    element.setAttribute("data-scrolltop",scrolltop);

    var tbound = element.getBoundingClientRect().top;
    if(tbound <= (window.innerHeight || document.getElement.clientHeight)){
      var scrollabs = (tbound <= 0) ? "hidden" : "visible";
      element.setAttribute("data-scrollAbs",scrollabs);
      element.setAttribute("data-scroll","awake");
    }
    else{
      element.setAttribute("data-scrollAbs","hidden")
    }
  }
}

// - scrolls the top of the page to the top of id
// - you can also pass in body for id to scroll to the 
//   top of the page.
// - you can also pass in a velocity_factor to increase 
//   or decrease the speed of scrolling by the factor
// - if the user scrolls in the opposite direction of
//   the automatic scrolling, the scroll is canceled.
function tscrollTo(id,velocity_factor = 1){
  const velocity = 50 * velocity_factor;
  
  let target = (id == "body") ? 0 : document.getElementById(id).getBoundingClientRect().top,
  curr = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop,
  delta = target - curr,
  steps = Math.abs(delta / velocity),
  step = delta / steps;
  delta = Math.abs(delta);

  // Break out if the user scrolls.
  document.addEventListener("scroll", function(){
    let offset = (target + delta) - document.body.scrollTop;
    if((offset ^ step > 0)){
      delta = 0;
      this.removeEventListener("scroll",arguments.callee);
    }
  });
  // recursion
  (function dec(){
    if(delta > 0){
      document.body.scrollTop += step;
      delta += step;
      setTimeout(dec,20);
    }
  })();

}
