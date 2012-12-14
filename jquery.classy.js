/*! jQuery.classy() - v0.0.1 - 2012-12-14
* Copyright (c) 2012 Adam Coulombe; Licensed MIT, GPL */
(function($){
	
	var $bind = $.fn.bind;
    $.fn.bind = function()
    {
		if(typeof arguments[0] === 'string' ){
			browserVendorPrefix = $.getBrowserVendorPrefix();
			arguments[0] = arguments[0].replace('transitionend', 'transitionend '+ browserVendorPrefix +'TransitionEnd');
			arguments[0] = arguments[0].replace('animationstart', 'animationstart '+ browserVendorPrefix +'AnimationStart');
			arguments[0] = arguments[0].replace('animationiteration', 'animationiteration '+ browserVendorPrefix +'AnimationIteration');
			arguments[0] = arguments[0].replace('animationend', 'animationend '+ browserVendorPrefix +'AnimationEnd');
		}
  	    var ret = $bind.apply(this, arguments);
        return ret;
    };
	var $unbind = $.fn.unbind;
    $.fn.unbind = function()
    {
		if(typeof arguments[0] === 'string' ){
			browserVendorPrefix = $.getBrowserVendorPrefix();
			arguments[0] = arguments[0].replace('transitionend', 'transitionend '+ browserVendorPrefix +'TransitionEnd');
			arguments[0] = arguments[0].replace('animationstart', 'animationstart '+ browserVendorPrefix +'AnimationStart');
			arguments[0] = arguments[0].replace('animationiteration', 'animationiteration '+ browserVendorPrefix +'AnimationIteration');
			arguments[0] = arguments[0].replace('animationend', 'animationend '+ browserVendorPrefix +'AnimationEnd');
		}
  	    var ret = $unbind.apply(this, arguments);
        return ret;
    };
	
	$.extend({
	
		getBrowserVendorPrefix : function(lowercaseFormat){
			
			var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/;
			var el = document.getElementsByTagName('script')[0];
		
			for(var prop in el.style)
			{
				if(regex.test(prop))
				{
					prefix = prop.match(regex)[0].toLowerCase();
					if(!lowercaseFormat){
						if(prefix=='ms'){
							prefix = 'MS'
						}
						if(prefix=='moz'){
							prefix = 'Moz'
						}
					}
					return prefix;
				}
			}
			if('WebkitOpacity' in el.style) {
				return 'webkit';
			}
			if('KhtmlOpacity' in el.style) {
				return 'khtml';
			}
		
			return '';
		}	
	});
	
	$.fn.extend({
	 	classy : function() {
			var options = {};
			var callback = null;
			
			if(typeof arguments[0] === 'string' ){
				options = {add:arguments[0],end:{}};
			}else if(typeof arguments[0] === 'object' ){
				options = arguments[0];
				options.end = arguments[0].end || {};
				callback = options.end.call;
			}
			
			if(typeof arguments[1] === 'function'){
				if(callback){
					options.end.call = function(){
						callback();
						arguments[1]();
					}
				}else{
					options.end.call = arguments[1];
				}
			}else {
				if(arguments[2]){
					if(callback){
						options.end.call = function(){
							callback();
							arguments[2]();
						}
					}else{
						options.end.call = arguments[2];
					}
				}
				if(typeof arguments[1] === 'object'){
					if(options.end.add || options.end.remove || options.end.call){
						options.end.add = options.end.add ? options.end.add + arguments[1].add : arguments[1].add;
						options.end.remove = options.end.remove ? options.end.remove + arguments[1].remove : arguments[1].remove;
						if(typeof options.end.call === 'function' &&  typeof arguments[1].call === 'function' ){
							var oldCallback = options.end.call;
							var addedCallback = arguments[1].call;
							var newCallback = function(){
								addedCallback();
								oldCallback();
							}
							
							options.end.call = newCallback;
						}
					}else{
						options.end = arguments.call[1];
					}
				}
			}
			
			var defaults = {
				add:null,
				remove:null,
				call:null,
				start:{
					add:null,
					remove:null,
					call:null,
					eventPersist:null
				},
				end:{
					add:null,
					remove:null,
					call:null,
					eventPersist:null
				},
				iteration:{
					add:null,
					remove:null,
					call:null,
					eventPersist:true
				},
				type: null	
			};
			var options = $.extend(defaults, options);

			return this.each(function() {
				var $this = $(this);
				if(!options.type){
					if(parseFloat($this.css('-'+$.getBrowserVendorPrefix()+'-transition-duration')) > 0 || parseFloat($this.css('transition-duration')) > 0 ){
						options.type = 'transition'
					}else{
						options.type = 'animation'
					}
				}
				console.log(options.type);
				var endEvent = options.type + 'end';
				
				var onInit = function(){
					if(typeof options.add == 'string'){ $this.addClass(options.add);  }
					if(typeof options.remove == 'string'){ $this.removeClass(options.remove);  }
					if(typeof options.call == 'function'){ options.call(); }
				}

				var onEnd = function(){
					if(!options.end.eventPersist){ $this.unbind(endEvent); }
					if(typeof options.end.add == 'string'){ $this.addClass(options.end.add); }
					if(typeof options.end.remove == 'string'){ $this.removeClass(options.end.remove);}
					if(typeof options.end.call == 'function'){ options.end.call(); }
				}

				if(typeof options.add == 'string' || typeof options.remove == 'string' || typeof options.call == 'function'){
					onInit();
				}
				if(typeof options.end.add == 'string' || typeof options.end.remove == 'string' || typeof options.end.call == 'function'){
					$this.bind(endEvent,onEnd);
				}

				if(options.type=='animation'){
					
					var onStart = function(){
						if(!options.start.eventPersist){ $this.unbind('animationstart'); }
						if(typeof options.start.add == 'string'){ $this.addClass(options.start.add);  }
						if(typeof options.start.remove == 'string'){ $this.removeClass(options.start.remove);  }
						if(typeof options.start.call == 'function'){ options.start.call(); }
					}
					if(typeof options.start.add == 'string' || typeof options.start.remove == 'string' || typeof options.start.call == 'function'){
						$this.bind('animationstart',onStart);
					}
					
					var onIteration = function(){
						if(!options.iteration.eventPersist){ $this.unbind('animationiteration'); }
						if(typeof options.iteration.add == 'string'){ $this.addClass(options.iteration.add);  }
						if(typeof options.iteration.remove == 'string'){ $this.removeClass(options.iteration.remove);  }
						if(typeof options.iteration.call == 'function'){ options.iteration.call();  }
					}
					if(typeof options.start.add == 'string' || typeof options.start.remove == 'string' || typeof options.start.call == 'function'){
						$this.bind('animationiteration',onIteration);
					}
				}
			});
		}
	});
})(jQuery);