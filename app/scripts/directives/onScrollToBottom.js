define(['paw2017a1frontend'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.directive('onScrollToBottom', function($document, $window) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs, controller, transcludeFn) {
              var doc = angular.element($document)[0].body;
              $document.bind("scroll", function () {
                  if (doc.scrollHeight != $window.innerHeight &&
                      $window.scrollY + $window.innerHeight >= doc.scrollHeight) {
                      //run the event that was passed through
                      scope.$apply(attrs.onScrollToBottom);
                  }
              });
          }
        };
    });
});
