define(['paw2017a1frontend', 'services/GameService', 'services/sharedTypeService', 'directives/postView', 'directives/errorList', 'directives/onScrollToBottom'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('GameFeedCtrl', ['$scope', 'GameService', 'sharedTypeService', 'perPage' , function($scope, GameService, sharedTypeService, perPage) {

        var _page = 0;
    		var _loading = false;
        var _linked = true;

        $scope.posts= [];

    		$scope.scroll = function(){
    			if(!_linked || _loading)
    				return;
    			_loading = true;
          console.log(_page);
    			GameService.feed({
            gameId: $scope.id,
    				page: _page,
    				'per_page': perPage
    			}).$promise.then(function(data){
            $scope.serverError = false;
    				$scope.posts = $scope.posts.concat(data);
            if($scope.posts.length == 0){
              $scope.isEmpty = true;
            } else {
              $scope.isEmpty = false;
              _page++;
            }
    				_loading = false;
    			}, function(err){
            $scope.serverError = true;
            _loading = false;
          });
    		};

        $scope.scroll();

        sharedTypeService.setType('messages');

        $scope.$on('$destroy', function(){
          _linked = false;
          _page = 0;
      		_loading = false;
          _linked = false;
          $scope.posts= [];
        });

    }]);
});
