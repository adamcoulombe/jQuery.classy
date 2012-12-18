jQuery.classy
=============

CSS3 Animation Utility plugin for jQuery

Easily trigger, observe, and respond to CSS Animations and Transitions.

If you're taking advantage of the performance benefits of using CSS3 animations and transitions, then you'll love classy.

While there are other tools and plugins out there (eg. [jQuery Transit](https://github.com/rstacruz/jquery.transit)) for generating animations, classy assumes your animation and transition definitions are in your CSS.

Yes, writing out and managing definitions amongst a mess of vendor prefixes can be understandably tedious, that's why it is recommended that you use a preprocessor mixin or extension such as [Eric Meyer's Compass Animation extension](https://github.com/ericam/compass-animation). If you use LESS, [3L has a decent mixin system for making CSS animations and transitions](https://github.com/mateuszkocz/3l).

Classy lets you add and remove CSS classes upon various animation or transition events, allowing you to take control over how your animations & transitions are sequenced and experienced.

# Usage #
Whether you're using a CSS animation, or transition, classy strives to make it easy to control classes and add callbacks.

$("#yourElement").classy(*[options]*,*[end options]*,*[end callback]*);

or

$("#yourElement").classy(*[options]*,*[end callback]*);

* *[options]* Can be an object containing all your options, or just a string of the class you wish to add to the element upon initiation.
* *[end options]* Shortcut parameter to configure classes to add/remove and a callback for the end state
* *[end callback]* Shortcut parameter for the callback of the end state.


# Examples/Demos #
*Yes, I know defining animations& transitions with all vendor prefixes in plain CSS makes your eyes bleed and head explode. Again, never try this at home without [a good SASS mixin](https://github.com/ericam/compass-animation) or the like*

## Transition Examples ##

### The CSS: ###

```css
#anElementWithATransition {
    transition:all 1s ease;-webkit-transition:all 1s ease;-moz-transition:all 1s ease;-o-transition:all 1s ease;-ms-transition:all 1s ease;
    background-color:green;
    margin-left:0px;
}
#anElementWithATransition.moved {
    background-color:red;
    margin-left:300px;
}​
```

### The Javascript: ###
####Simple Add/Remove class:####
[Show Demo](http://jsfiddle.net/adamco/3jKCe/2/)
```javascript
$("#anElementWithATransition").classy({ add:'moved' }, { remove:'moved' });
```
*or just:*
```javascript
$("#anElementWithATransition").classy('moved', { remove:'moved' });
```

#### With Callback:####
[Show Demo](http://jsfiddle.net/adamco/BNdZG/1/)
```javascript
$("#anElementWithATransition").classy({ add:'moved' }, { remove:'moved', call:function(){ alert('at end of transition') } });
```

#### Swap Classes:####
[Show Demo](http://jsfiddle.net/adamco/XG7JQ/2/)
```javascript
$("#anElementWithATransition").classy({ add:'moved', remove:'anotherClass' }, { remove:'moved', add:'anotherClass' });
```

## Animation Examples ##

### The CSS: ###
Basic example... This is about as simple as it gets with CSS Animations...

```css
#anElementWithAnAnimation {
   background-color:green;
   margin-left:0px;
}

@keyframes moveAnimation {from { margin-left:0px; background-color:red; }  to {  margin-left:300px; background-color:green;} } 
/* @-moz-keyframes, @-webkit-keyframes, etc... */

#anElementWithAnAnimation.moved {
   background-color:red;
   margin-left:300px;
    animation: moveAnimation 1s ease; -webkit-animation: moveAnimation 1s ease-in-out;-moz-animation: moveAnimation 1s ease;-o-animation: moveAnimation 1s ease;-ms-animation: moveAnimation 1s ease; 
}​

@keyframes moveBackAnimation {from { margin-left:300px;  background-color:green }  to {  margin-left:0px;  background-color:red; } } 
/* @-moz-keyframes, @-webkit-keyframes, etc... */

#anElementWithAnAnimation.moveBack {
   background-color:red;
   margin-left:0px;
    animation: moveBackAnimation 1s ease; -webkit-animation: moveBackAnimation 1s ease-in-out;-moz-animation: moveBackAnimation 1s ease;-o-animation: moveBackAnimation 1s ease;-ms-animation: moveBackAnimation 1s ease; 
}​
```

### The Javascript: ###

Same idea as with transitions...

####Swap Classes:####
[Show Demo](http://jsfiddle.net/adamco/d6jkk/2/)
```javascript
$("#anElementWithAnAnimation").classy({ add:'moved',remove:'moveBack' }, { remove:'moved', add:'moveBack'});
```