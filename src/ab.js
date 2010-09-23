/*
 *	ab.js JavaScript A/B-testing tool v0.1
 *	
 *	Copyright 2010, Anders Mattson
 *	Licensed under the MIT or GPL Version 2 licenses.
 *	
 */

var AB = window.AB = AB || {
	param: 'ab_js=',
	link: function(){
		
		if(arguments.length < 2)
			return;
		
		var e = typeof arguments[0] == "string" ? document.getElementById(arguments[0]) : e;
		
		if(!e)
			return;

		var o, p, P, j, h, i = Math.floor((arguments.length)*Math.random());
	
		o = i == 0 ? {} : arguments[i];
			
		if(o.html)
			e.innerHTML = o.html;
		
		P = o.param || AB.param;
		
		if(o.style) {
			if(typeof o.style == "object")
				for(j in o.style)
					e.style[j] = o.style[j];
			else
				e.setAttribute('style', o.style);
		}
		
		h = e.href;
		if(h) {
			if(o.href)
				h = o.href[0] == '+' ? h + o.href.substring(1) : o.href;
			else {
				if(h.indexOf('#') > -1) {
					p = h.split("#");
					h = p[0] + ((h.indexOf('?') > -1) ? '&' : '?') + P + i + '#' + p[1];
				}
				else
					h = h + ((h.indexOf('?') > -1) ? '&' : '?') + P + i;
			}
	
			e.href = h;
		}
	}
};