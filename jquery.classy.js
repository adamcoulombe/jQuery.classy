/*! jQuery.classy() - v0.0.1 - 2012-12-14
* Copyright (c) 2012 Adam Coulombe; Licensed MIT, GPL */
(function($){
	
	var $bind = $.fn.bind;
    $.fn.bind = function()
    {
		arguments[0] = $.extendEventPrefixes(arguments[0]);
  	    var ret = $bind.apply(this, arguments);
        return ret;
    };
	var $unbind = $.fn.unbind;
    $.fn.unbind = function()
    {
		arguments[0] = $.extendEventPrefixes(arguments[0]);
  	    var ret = $unbind.apply(this, arguments);
        return ret;
    };
	
	$.extend({
		extendEventPrefixes : function(e){
			if(typeof e === 'string' ){
				browserVendorPrefix = $.getBrowserVendorPrefix();
				e = e.replace('transitionend', 'transitionend '+ browserVendorPrefix +'TransitionEnd');
				e = e.replace('animationstart', 'animationstart '+ browserVendorPrefix +'AnimationStart');
				e = e.replace('animationiteration', 'animationiteration '+ browserVendorPrefix +'AnimationIteration');
				e = e.replace('animationend', 'animationend '+ browserVendorPrefix +'AnimationEnd');
			}
			return e;
		},
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
		},
		classy : {
			apply :function($el,opt){
				if(typeof opt.add == 'string'){ $el.addClass(opt.add); }
				if(typeof opt.remove == 'string'){ $el.removeClass(opt.remove);}
				if(typeof opt.call == 'function'){ opt.call(); }	
			},
			map : function($el,e,opt){
				if(typeof opt.add == 'string' || typeof opt.remove == 'string' || typeof opt.call == 'function'){
					var callback = function(){
						$elData = $el.data();
						if(!opt.eventPersist || $elData['classy-'+e+'-persist']==e ){
							$el.unbind(e);
							if(!opt.eventPersist && $elData['classy-'+e+'-persist']==e){
							}
						}else{
							$elData['classy-'+e+'-persist'] = e;				
						}
						$.classy.apply($el,opt);
					}
					$el.bind(e,callback);
				}
			}
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
				if(arguments[2] && typeof arguments[1] === 'function'){
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
						options.end = arguments[1];
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
				var endEvent = options.type + 'end';

				if(typeof options.add == 'string' || typeof options.remove == 'string' || typeof options.call == 'function'){
					var onInit = function(){
						$.classy.apply($this,options);
					}
					onInit();
				}

				$.classy.map($this,endEvent,options.end);

				if(options.type=='animation'){

					$.classy.map($this,'animationstart',options.start);
					$.classy.map($this,'animationiteration',options.iteration);

				}
			});
		}
	});
})(jQuery);