define(['paw2017a1frontend'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.service('PaginationService', function() {
        function range(from, to) {
            var ret = [];
            for (var i = from; i <= to; i++) {
                ret.push(i);
            }
            return ret;
        };

        this.activate = function (scope, currentPage, lastPage, maxPageHalf) {
            scope.lastPage = lastPage + 1;
            var leftBound = currentPage - maxPageHalf > 0 ? currentPage - maxPageHalf : 0;
            var rightBound = currentPage + maxPageHalf < lastPage ? currentPage + maxPageHalf : lastPage;
            scope.middleRange = range(leftBound + 1, rightBound + 1);
            scope.currentPage = currentPage + 1;
            scope.pagination = true;
        }
    });

});