/*
 *	ab.js JavaScript A/B-testing tool v0.2
 *	
 *	Copyright 2010, Anders Mattson
 *	Licensed under the MIT or GPL Version 2 licenses.
 *	
 */

var AB = window.AB = {
	vary: function(d){
		var j = d.elem || d,
			e = typeof j == "string" ? document.getElementById(j) : j;
		
		if(!e || e.constructor == Array) {
			for(j in e) {
				if(!d.elem)
					d = {};
				d.elem = e[j];
				arguments[0] = d;
				AB.vary.apply(this, arguments);
			}
			return;
		}
		
		var o, p, c, h = document.location.href, A = arguments, P = (d.name || 'ab_js'), 
			i = (c = document.cookie.match(new RegExp("(?:^|[^a-z0-9_\-]+)" + P + "=([0-9]+)", "i"))) ? 
				c[1]*1 : 
				(c = h.match(new RegExp("[\&\?]+"+P+"=([0-9]+)", "i"))) ? 
				c[1]*1 : 
				Math.floor(A.length*Math.random());
		
		o = i == 0 || i > A.length - 1 ? {} : A[i];
		
		document.cookie = P + '=' + i + '; path=/';
		
		if(o.html)
			e.innerHTML = o.html;
		
		if(o.style)
			for(j in o.style)
				e.style[j] = o.style[j];
		
		// Last we replace all the links found in the changed document.
		A = e.nodeName == 'A' ? [e] : e.getElementsByTagName('A');
		
		for(var j in A) {
			h = A[j].href;
			if(h) {
				if(o.href)
					h = o.href[0] == '+' ? h + o.href.substring(1) : o.href;
				else {
					if(h.indexOf('#') > -1) {
						p = h.split("#");
						h = p[0] + ((h.indexOf('?') > -1) ? '&' : '?') + P + '=' + i + '#' + p[1];
					}
					else
						h = h + ((h.indexOf('?') > -1) ? '&' : '?') + P + '=' + i;
				}
				A[j].href = h;
			}
		}
	}
};