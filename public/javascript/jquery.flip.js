/*!
 * jQuery 3D Flip v1.0
 * https://github.com/nnattawat/flip
 *
 * Copyright 2014, Nattawat Nonsung
 */


/**
* Use immediately Invoked Function Expression to
* - Prevent conflicting with other libary on alias $
* - Scope varaible to be private
*/
(function( $ ) {
	var flip = function(dom, flipedRotate){
		dom.data("fliped", true);
		dom.css({
			transform: flipedRotate
		});
	};
	var unflip = function(dom){
		dom.data("fliped", false);
		dom.css({
			transform: "rotatex(0deg)"
		});
	};
  $.fn.flip = function(options) {
  	var that = $(this).children('.card');
  	var jqObj = that;
    var width = that.width();
		var height = that.height();
		var prespective = width*2;

  	if(options !== undefined && typeof(options) == "boolean"){ // Force flip the DOM
  		if(options){
  			flip(that, that.data("flipedRotate"));
  		}else{
  			unflip(that);
  		}
  	}else{ //Init flipable DOM
  		// Define default setting
			var settings = $.extend({
				axis: "y",
				trigger: "click"
	    }, options );

			if(settings.axis.toLowerCase() == "x"){
				prespective = height*2;
				// save rotating css to DOM for manual flip
				that.data("flipedRotate", "rotatex(180deg)");
			}else{
				that.data("flipedRotate", "rotatey(180deg)");
			}
			var flipedRotate = that.data("flipedRotate");

			that.parent().css({
				perspective: prespective,
				position: "relative",
				width: width,
				height: height
			});

			that.find(".back-wrap").css({
				transform: flipedRotate
			});

			if(settings.trigger.toLowerCase() == "click"){
				that.parent().click(function(){
					if(jqObj.data("fliped")){
						unflip(jqObj);
		      }else{
		      	flip(jqObj, flipedRotate);
		      }
				});
			}else if(settings.trigger.toLowerCase() == "hover"){
				that.parent().hover(function(){
					flip(jqObj, flipedRotate);
				}, function(){
					unflip(jqObj);
				});
			}	
  	}
		// Return jQuery so that it's chainable 
		return that;		
  };
 
}( jQuery ));