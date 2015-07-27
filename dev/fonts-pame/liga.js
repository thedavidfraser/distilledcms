/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
	'use strict';
	function supportsProperty(p) {
		var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
			i,
			div = document.createElement('div'),
			ret = p in div.style;
		if (!ret) {
			p = p.charAt(0).toUpperCase() + p.substr(1);
			for (i = 0; i < prefixes.length; i += 1) {
				ret = prefixes[i] + p in div.style;
				if (ret) {
					break;
				}
			}
		}
		return ret;
	}
	var icons;
	if (!supportsProperty('fontFeatureSettings')) {
		icons = {
			'office': '&#xe903;',
			'buildings': '&#xe903;',
			'bullhorn': '&#xe91a;',
			'megaphone': '&#xe91a;',
			'books': '&#xe920;',
			'library': '&#xe920;',
			'file-empty': '&#xe924;',
			'file3': '&#xe924;',
			'files-empty': '&#xe925;',
			'files': '&#xe925;',
			'file-text2': '&#xe926;',
			'file4': '&#xe926;',
			'file-picture': '&#xe927;',
			'file5': '&#xe927;',
			'copy': '&#xe92c;',
			'duplicate': '&#xe92c;',
			'stack': '&#xe92e;',
			'layers': '&#xe92e;',
			'price-tag': '&#xe935;',
			'price-tags': '&#xe936;',
			'phone': '&#xe942;',
			'telephone': '&#xe942;',
			'address-book': '&#xe944;',
			'contact': '&#xe944;',
			'envelop': '&#xe945;',
			'mail': '&#xe945;',
			'map': '&#xe94b;',
			'guide': '&#xe94b;',
			'map2': '&#xe94c;',
			'guide2': '&#xe94c;',
			'calendar': '&#xe953;',
			'date': '&#xe953;',
			'display': '&#xe956;',
			'screen': '&#xe956;',
			'laptop': '&#xe957;',
			'computer': '&#xe957;',
			'database': '&#xe964;',
			'db': '&#xe964;',
			'user': '&#xe971;',
			'profile2': '&#xe971;',
			'users': '&#xe972;',
			'group': '&#xe972;',
			'user-tie': '&#xe976;',
			'user5': '&#xe976;',
			'spinner7': '&#xe980;',
			'loading8': '&#xe980;',
			'stats-dots': '&#xe99b;',
			'stats2': '&#xe99b;',
			'briefcase': '&#xe9ae;',
			'portfolio': '&#xe9ae;',
			'sphere': '&#xe9c9;',
			'globe': '&#xe9c9;',
			'earth': '&#xe9ca;',
			'globe2': '&#xe9ca;',
			'flag': '&#xe9cc;',
			'report': '&#xe9cc;',
			'sun': '&#xe9d4;',
			'weather2': '&#xe9d4;',
			'table': '&#xea70;',
			'wysiwyg18': '&#xea70;',
			'table2': '&#xea71;',
			'wysiwyg19': '&#xea71;',
			'facebook2': '&#xea8d;',
			'brand7': '&#xea8d;',
			'twitter': '&#xea91;',
			'brand11': '&#xea91;',
			'0': 0
		};
		delete icons['0'];
		window.icomoonLiga = function (els) {
			var classes,
				el,
				i,
				innerHTML,
				key;
			els = els || document.getElementsByTagName('*');
			if (!els.length) {
				els = [els];
			}
			for (i = 0; ; i += 1) {
				el = els[i];
				if (!el) {
					break;
				}
				classes = el.className;
				if (/icon-/.test(classes)) {
					innerHTML = el.innerHTML;
					if (innerHTML && innerHTML.length > 1) {
						for (key in icons) {
							if (icons.hasOwnProperty(key)) {
								innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
							}
						}
						el.innerHTML = innerHTML;
					}
				}
			}
		};
		window.icomoonLiga();
	}
}());