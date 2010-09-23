# **ab.js** - an unobtrusive AB-testing tool written in Javascript #

**ab.js** is an easy to use, unobtrusive AB-testing tool written completely in Javascript.
It works by randomly changing the content and or href attribute of html elements and generating unique url:s that can be tracked using Google Analytics or any other statistics program.

The following example would test two cases of content and style for a link (A tag) with id "id", the original one and the one specified in the function call:
	AB.link('id', {param:'unique_param', html:'Buy this', style: 'color: red; font-weight: bold'});

Testing more than two cases is just a matter of adding another 

**ab.js** is dually licensed under the GPL and MIT licenses and is thereby free to use in virtually any situation.

Current version is v0.1.

##Roadmap for ab.js v0.2##
+	Add support for remembering what the current visitor was last presented with. Flipping back and forth can cause confusion otherwise.