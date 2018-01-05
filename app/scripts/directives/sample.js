'use strict';
define(['paw2017a1frontend'], function(paw2017a1frontend) {

	paw2017a1frontend.directive('sample', function() {
		return {
			restrict: 'E',
			template: '<span>Sample</span>'
		};
	});
});
