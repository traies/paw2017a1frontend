define(['paw2017a1frontend', 'services/GameService', 'services/sharedTypeService', 'directives/postView', 'directives/errorList', 'directives/onScrollToBottom', 'directives/messageForm'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.controller('GameFeedCtrl', ['$scope', 'GameService', 'sharedTypeService', 'perPage' , function($scope, GameService, sharedTypeService, perPage) {

        $scope.game = true;

        var _page = 0;
    		var _loading = false;
        var _linked = true;
        var _ready = false;

        $scope.isLoading = function(){
          return _loading && !_ready;
        };

        $scope.posts= [];

    		$scope.scroll = function(){
    			if(!_linked || _loading || _ready)
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
            if(!data.length == 0){
              _page ++;
            } else {
              _ready = true;
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

        $scope.triggerTextForm = function(){
          $scope.showTextForm = !$scope.showTextForm;
          $scope.showVideoForm = false;
        };
        $scope.triggerVideoForm = function(){
          $scope.showVideoForm = !$scope.showVideoForm;
          $scope.showTextForm = false;
        };

        $scope.appendToPosts = function(post){
          console.log($scope);
          post.message.tags.forEach(function(element){
            if(element.id == $scope.id){
              $scope.posts.unshift(post);
            }
          });
        };

    }]);
});
