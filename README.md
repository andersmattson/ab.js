# **ab.js** - an unobtrusive A/B testing tool written in Javascript #

**ab.js** is an easy to use, unobtrusive A/B testing tool written completely in Javascript.
It works by randomly changing the content and or href attribute of link (A tag) elements and generating unique (dummy) querystring parameter that can be tracked using Google Analytics or any other statistics program.

A/B testing is a really easy way of testing what works and what don't. Visitors to the site are randomly presented with different content and what works is measured by the clicks on the generated links in the different content.

The following example would test two cases of content and style for a link (A tag) with id "id", the original one and the one specified in the function call:
	AB.vary('id', {param:'unique_param', html:'Buy this', style: 'color: red; font-weight: bold'});

Testing more than two cases is just a matter of adding another object after the first one:
	AB.vary('id', {html:'Buy this', style: 'color: red'}, {html:'Buy that', style:'color: blue'});

**ab.js** is dually licensed under the GPL and MIT licenses.

Current version is v0.1.

### Roadmap for ab.js v0.2 ###
+	Add support for remembering which case the current visitor was last presented with. Flipping back and forth can cause confusion otherwise.
+	Add support for replacing other html elements. If a div is replaced (or not), all the links inside that div gets the unique querystring parameter.