
# tScroll - a simple scrolling library

This library is written in pure Javascript and has no dependencies. It can help you incorporate scrolling into your design in two ways 
- Checking if a given element is visible to the user
- Smoothly scrolling to any position.

It is extremely easy to do either of the above with tScroll, but there are a number of things this library cannot do. Do not use this if you want 
- Horizontal scrolling
- Smooth Scrolling with non-linear timing 

Otherwise, this is what you need. 

## Installation 

Installation is easy. You don't even need to clone this repository. Just grab the file tscroll.js. This file is not minified. You might want to minify before deploying. 

## Using the Library

Also easy.

### Detecting Visibility 

Visibility detection is usually used to implement fancy scrolling websites that trigger animations when a user has scrolled to a certain point. With tScroll all you have to do is add the class `tscroll` to any element that you want to track the visibility of. Whenever the body is scrolled, every element with the `tscroll` class will have three data attributes assigned to it. Data attributes are just like any other attribute of an HTML tag. You can access data attributes via CSS to setup conditional styling. The three attributes are 
- data-scroll: this attribute will have the value `awake` once the top of the element has entered the viewport at some point. Use this for animations that you want to happen once. 
- data-scrollAbs will get the value `visible` or `hidden` depending on whether or not the element is in the viewport. 
- data-scrollTop will get the value `top` or `scroll` depending on whether or not the page has been scrolled from its default position (if pageYoffset is positive). This comes in handy for making sticky banners.

You can access any of these attributes in CSS. Here is a simple example of how to put together an animation. 

First, some HTML 
```
<div class="cont tscroll">
  <p>This paragraph slides in from the side!</p>
</div>
<script src="tscroll.js"></script>
```
And a little bit of CSS
```
.cont{
  position:absolute;
  top:100%;
  left:0;
  height:400px;
  width:100%;
}
.cont p{
  width:100%;
  left:100%;
}
.cont[data-scroll='awake'] p{
  animation:slide .5s;
}
@keyframes slide{
  100%{
    left:0;
  } 
}
```
