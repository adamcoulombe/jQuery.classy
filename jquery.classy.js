/*! jQuery.classy() - v0.0.2a - 2012-12-27
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
				var browserVendorPrefix = $.getBrowserVendorPrefix();
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
			apply :function($el,opt,jQueryEvent){

					if(typeof opt.add == 'string'){
						$el.addClass(opt.add);
					}else if (typeof opt.add == 'object') {
						for (var i in opt.add){						
							if(i==0 && typeof opt.add[0] == 'string'){
								$el.addClass(opt.add[0]);
							}else if(typeof opt.add[i] == 'object'){
								if(typeof opt.add[i][0]=='string'){
									$(opt.add[i][0]).addClass(opt.add[i][1]);
								}else{
									opt.add[i][0].addClass(opt.add[i][1]);
								}
							}
						}
					}
					if(typeof opt.remove == 'string'){
						$el.removeClass(opt.remove);
					} else if (typeof opt.remove == 'object') {
						for (var i in opt.remove){						
							if(i==0 && typeof opt.remove[0] == 'string'){
								$el.removeClass(opt.remove[0]);
							}else if(typeof opt.remove[i] == 'object'){
								if(typeof opt.remove[i][0]=='string'){
									$(opt.remove[i][0]).removeClass(opt.remove[i][1]);
								}else{
									opt.remove[i][0].removeClass(opt.remove[i][1]);
								}
							}
						}
					}
					if(typeof opt.call == 'function'){
						$.proxy(opt.call,$el)(jQueryEvent); // win!!
					}

			},
			map : function($el,e,opt){
				if(typeof opt.add == 'string' || typeof opt.add == 'object' || typeof opt.remove == 'string' || typeof opt.remove == 'object' || typeof opt.call == 'function'){
					$elData = $el.data();
					var callback = function(jQueryEvent){
						console.log(jQueryEvent);
						if(!opt.eventPersist){
							$el.unbind(e);
						}else{
							if(!$el.data('classy-'+e+'-persist')){
								$el.data('classy-'+e+'-persist',e);
							}
						}
						
						$.classy.apply($el,opt,e,jQueryEvent);
					}
					if(!opt.eventPersist || !$el.data('classy-'+e+'-persist') ){
						$el.bind(e,callback);
					}

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
							var newCallback = function(jQueryEvent){
								addedCallback(jQueryEvent);
								oldCallback(jQueryEvent);
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
				
				$.classy.map($this,endEvent,options.end);

				if(options.type=='animation'){

					$.classy.map($this,'animationstart',options.start);
					$.classy.map($this,'animationiteration',options.iteration);

				}

				//init
				$.classy.apply($this,options); 

			});
		}
	});
})(jQuery);