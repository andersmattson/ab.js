# **ab.js** - an unobtrusive A/B testing tool written in Javascript #

**ab.js** is an easy to use, unobtrusive A/B testing tool written completely in Javascript.
It works by randomly changing the content of DOM elements and generating unique (dummy) querystring parameter for anchor tags that can be tracked using Google Analytics or any other statistics program.

A/B testing is a really easy way of testing what works and what don't. Visitors to the site are randomly presented with different content and what works is measured by the clicks on the generated links in the different content.

The following example would test two cases of content and style for a link (A tag) with id "mylink", the original one and the one specified in the function call:
	AB.vary({
			name: 'test_id',
			elem: document.getElementById('mylink')
		}, {
			html:'Buy this', 
			style: {
				color: 'red', 
				fontWeight: 'bold'
			}
		});

Testing more than two cases is just a matter of adding another object after the first one:
	AB.vary({
			name: 'test_id',
			elem: document.getElementById('mylink')
		}, {
			html:'Buy this', 
			style: {
				color: 'red'
			}
		}, {
			html:'Buy that', 
			style:{
				color: 'blue'
			}
		});

**ab.js** is dually licensed under the GPL and MIT licenses.

Current version is v0.3.

### Roadmap for ab.js v0.4 ###
+	[COMING SOON]