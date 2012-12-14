(function($){
	var $bind = $.fn.bind;
    $.fn.bind = function()
    {
		if(typeof arguments[0] === 'string' ){
			arguments[0] = arguments[0].replace('transitionend', 'transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd');
			arguments[0] = arguments[0].replace('animationstart', 'animationstart webkitAnimationStart MSAnimationStart oAnimationStart');
			arguments[0] = arguments[0].replace('animationiteration', 'animationiteration webkitAnimationIteration MSAnimationIteration oAnimationIteration');
			arguments[0] = arguments[0].replace('animationend', 'animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd');
		}
  	    var ret = $bind.apply(this, arguments);
        return ret;
    };
	var $unbind = $.fn.unbind;
    $.fn.unbind = function()
    {
		if(typeof arguments[0] === 'string' ){
			arguments[0] = arguments[0].replace('transitionend', 'transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd');
			arguments[0] = arguments[0].replace('animationstart', 'animationstart webkitAnimationStart MSAnimationStart oAnimationStart');
			arguments[0] = arguments[0].replace('animationiteration', 'animationiteration webkitAnimationIteration MSAnimationIteration oAnimationIteration');
			arguments[0] = arguments[0].replace('animationend', 'animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd');
		}
  	    var ret = $unbind.apply(this, arguments);
        return ret;
    };
	$.fn.extend({
	 	classy : function() {
			var classyClass;
			var callback;
			var options = {};
			
			if(typeof arguments[0] === 'string' ){
				classyClass = arguments[0];

				if(typeof arguments[1] === 'function'){
					callback = arguments[1];
				}else {
					callback = arguments[2] || function(){};
					if(typeof arguments[1] === 'object'){ options =  arguments[1]; }
				}
				
			}else{
				classyClass='';
			}
			
			var defaults = {
				now:{
					add:null,
					remove:null,
					call:function(){ }
				},
				start:{
					add:null,
					remove:null,
					call:function(){ },
					eventPersist:null
				},
				end:{
					add:null,
					remove:null,
					call:function(){ },
					eventPersist:null
				},
				iteration:{
					add:null,
					remove:null,
					call:function(){ },
					eventPersist:true
				},
				type:'animation'			
			};
			var options = $.extend(defaults, options);
			var endEvent = options.type + 'end';
			
			//console.log(endEvent);
			return this.each(function() {
				var $this = $(this);
				
				//console.log('classyClass: '+ classyClass);
				$this.addClass(classyClass);
				
				var onNow = function(){
					if(typeof options.now.add == 'string'){ $this.addClass(options.now.add) }
					if(typeof options.now.remove == 'string'){ $this.removeClass(options.now.remove) }
					if(typeof options.now.call == 'function'){ options.now.call(); }
				}
				var onEnd = function(){
					if(!options.end.eventPersist){ $this.unbind(endEvent); }
					if(typeof options.end.add == 'string'){ $this.addClass(options.end.add) }
					if(typeof options.end.remove == 'string'){ $this.removeClass(options.end.remove) }
					if(typeof options.end.call == 'function'){ options.end.call(); }
					callback();
				}

				
				onNow();
				//console.log('binding to '+endEvent);
				$this.bind(endEvent,onEnd);

				if(options.type=='animation'){
					var onStart = function(){
						if(!options.start.eventPersist){ $this.unbind('animationstart'); }
						if(typeof options.start.add == 'string'){ $this.addClass(options.start.add) }
						if(typeof options.start.remove == 'string'){ $this.removeClass(options.start.remove) }
						if(typeof options.start.call == 'function'){ options.start.call(); }
					}
					$this.bind('animationstart',onStart);
					var onIteration = function(){
						if(!options.iteration.eventPersist){ $this.unbind('animationiteration'); }
						if(typeof options.iteration.add == 'string'){ $this.addClass(options.iteration.add) }
						if(typeof options.iteration.remove == 'string'){ $this.removeClass(options.iteration.remove) }
						if(typeof options.iteration.call == 'function'){ options.iteration.call(); }
					}
					$this.bind('animationiteration',onIteration);
				}
			});
		}
		
	
	});
})(jQuery);