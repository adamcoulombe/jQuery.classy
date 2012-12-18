jQuery.classy
=============

CSS3 Animation Utility plugin for jQuery

Easily trigger, observe, and respond to CSS Animations and Transitions.

If you're taking advantage of the performance benefits of using CSS3 animations and transitions, then you'll love classy.

While there are other tools and plugins out there (eg. [jQuery Transit](https://github.com/rstacruz/jquery.transit)) for generating animations, classy assumes your animation and transition definitions are in your CSS.

Yes, writing out and managing definitions amongst a mess of vendor prefixes can be understandably tedious, that's why it is recommended that you use a preprocessor mixin or extension such as [Eric Meyer's Compass Animation extension](https://github.com/ericam/compass-animation)

Classy lets you add and remove classes upon various animation or transition events, allowing you to take control over how your animations & transitions are sequenced and experienced.

## Transition Examples ##

### CSS: ###

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

### Classy/Javascript: ###
####Simple Add/Remove####
[Show Demo](http://jsfiddle.net/adamco/3jKCe/2/)
```javascript
$("#anElementWithATransition").classy({ add:'moved' }, { remove:'moved' });
```