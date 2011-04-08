/*
 *	ab.js JavaScript A/B-testing tool v0.3
 *	
 *	Copyright 2010, Anders Mattson
 *	Licensed under the MIT or GPL Version 2 licenses.
 *	
 *  For more info, see https://github.com/andersmattson/ab.js
 */

var AB = window.AB = {

	vary: function(d){
		var j = d.elem || d,
			e = typeof j == "string" ? document.getElementById(j) : j,
			o, p, c, h = document.location.href, A = arguments, P = (d.name || 'ab_test');
		
		// Applying the variation to multiple DOM elements
		if(!e || e.constructor == Array) {
			for(j in e) {
				if(!d.elem)
					d = {};
				d.elem = e[j];
				A[0] = d;
				AB.vary.apply(this, A);
			}
			return;
		}
		
		// Check if the variation is for a specific url and if so, check that it matches the current one.
		if(d.url && ((d.url.exec && !h.match(d.url)) || (typeof d.url == "string" && AB.suri(d.url) != AB.suri(h))))
			return;
		
		// Pick out which variation to use from cookie, url or random (in that order)
		var i = (c = document.cookie.match(new RegExp("(?:^|[^a-z0-9_\-]+)" + P + "=([0-9]+)", "i"))) ? 
				c[1]*1 : (c = h.match(new RegExp("[\&\?]+"+P+"=([0-9]+)", "i"))) ? 
				c[1]*1 : Math.floor(A.length*Math.random());
		
		o = i == 0 || i > A.length - 1 ? {} : A[i];
		
		document.cookie = P + '=' + i + '; path=/';
		
		if(o.html)
			e.innerHTML = o.html;
		
		if(o.style)
			for(j in o.style)
				e.style[j] = o.style[j];
		
		// Last we replace all the links found in the changed document fragment.
		A = e.nodeName == 'A' ? [e] : e.getElementsByTagName('A');
		
		for(var j in A) {
			h = A[j].getAttribute('href');
			if(h) {
				if(o.href)
					h = o.href[0] == '+' ? h + o.href.substring(1) : o.href;
				else {
					if(h.indexOf('#') > -1) {
						p = h.split("#");
						h = p[0] + ((h.indexOf('?') > -1) ? '&' : '?') + P + '=' + i + '#' + p[1];
					}
					else
						h += ((h.indexOf('?') > -1) ? '&' : '?') + P + '=' + i;
				}
				A[j].setAttribute('href', h);
			}
		}
		
		if(o.fn)
			fn.apply(this, arguments);
	},
	
	/*
	 * A modified version of parseUri 1.2.2 by (c) Steven Levithan <stevenlevithan.com> released under MIT License
	 * 
	 * Parses and recompiles urls for better comparison. If i is set the function returns a specific part of the url:
	 * 0 - source, 1 - protocol, 2 - authority, 3 - userInfo, 4 - user, 5 - password, 6 - host, 
	 * 7 - port, 8 - relative, 9 - path, 10 - directory, 11 - file, 12 - query, 13 - anchor.
	 */
	suri: function(str, fragment, i) {
		var	m = AB.reg[0].exec(str), p = [];
		
		if(m[12] && (i == 12 || (i !== 0 && !i))){
			m[12].replace(AB.reg[1], function (a, b) {
				if (a) p.push(b);
			});
			m[12] = p.sort().join("&");
		}

		return i === 0 || i ? m[i] : m[1] + '://' + (m[4] || '') + (m[5] ? ':' + m[5] : '') + (m[4] || m[5] ? '@' : '') + (m[6] || '') + (m[7] ? ':' + m[7] : '') + (m[9] || '') + (m[12] ? '?' + m[12] : '') + (m[13] && fragment ? '#' + m[13] : '');
	},
	
	// Putting regexp here to precompile them.
	reg: [
		/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
		/(?:^|&)([^&=]*=?[^&]*)/g
	] 
};