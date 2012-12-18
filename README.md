jQuery.classy
=============

CSS3 Animation Utility plugin for jQuery

Easily trigger, observe, and respond to CSS Animations and Transitions.

If you're taking advantage of the performance benefits of using CSS3 animations and transitions, then you'll love classy.

While there are other tools and plugins out there (eg. [jQuery Transit](https://github.com/rstacruz/jquery.transit)) for generating animations, classy assumes your animation and transition definitions are in your CSS.

Yes, writing out and managing definitions amongst a mess of vendor prefixes can be understandably tedious, that's why it is recommended that you use a preprocessor mixin or extension such as [Eric Meyer's Compass Animation extension](https://github.com/ericam/compass-animation)

Classy lets you add and remove classes upon various animation or transition events, allowing you to take control over how your animations & transitions are sequenced and experienced.

## Example Transition ##

## CSS: ##

```css
#anElementWithATransition {
	transition:all 1s ease;-webkit-transition:all 1s ease;-moz-transition:all 1s ease;-o-transition:all 1s ease;-ms-transition:all 1s ease;
	background-color:green;
	left:0px;
}
#anElementWithATransition.moved {
	background-color:red;
	left:300px;
}
#anElementWithATransition.halfWay {
	background-color:purple;
	left:150px;
}
```

## Classy: ##

```javascript
$("#anElementWithATransition").classy(
	{
		add:'playing',
		remove:'reset'
	},
	{
		remove:'playing',
		add:'reset',
		call:function(){ alert('in transition callback') }
	}
);
```