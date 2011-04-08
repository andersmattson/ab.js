/*
 *	ab.js JavaScript A/B-testing tool v0.3
 *	
 *	Copyright 2010, Anders Mattson
 *	Licensed under the MIT or GPL Version 2 licenses.
 *	
 *  AB.vary( Settings (Object), Variation #1 (Object) [, Variation #2 (Object) [, ...]] )
 *  
 *  AB.vary({
 *  		name: 'unique_query_parameter_name',
 *  		elem: 'id_string_or_DOM_Node',
 *  		url: 'http://validation.url.for/variation'
 *  	},{
 *  		html: 'html_content',
 *  		style: {
 *  			'css-attribute': 'css-attribute-value',
 *  			...
 *  		},
 *  		fn: function(){...},
 *  		href: 'http://variation.url' (starting with a plus appends the string to the urls)
 *  	},{
 *  		...
 *  });
 */

var AB = window.AB = {

	vary: function(d){

		var j = d.elem || d,
			e = typeof j == "string" ? document.getElementById(j) : j;
		
		// Applying the variation to multiple DOM elements or die if no element was found
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
		
		// Check if the variation is for a specific url and if so, check that it matches the current one.
		if(d.url && !AB.compareUrls(d.url, document.location.href))
			return;
		
		
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
	
	// Checks if two urls points to the same source, regardless of the order between the parameters.
	// The hash tag is ignored.
	compareUrls: function(a, b) {
		var as, bs;
		return a == b || ((as = a.split('#')[0].split('?')).length > 1 ? as[0] + '?' + as[1].split('&').sort().join('&') : as[0]) == 
			   ((bs = b.split('#')[0].split('?')).length > 1 ? bs[0] + '?' + bs[1].split('&').sort().join('&') : bs[0]);
	}
};