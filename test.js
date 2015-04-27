(function () {
	'use strict';

	var css = require('./css.js');

	var obj = css('img#jur-jur-jur.hola.caracola[hola="neng"] div.awesome span')

	console.log( 'css', obj.toHTML() );
})();