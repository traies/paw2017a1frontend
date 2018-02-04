'use strict';
define(
	['paw2017a1frontend',
	'services/restService',
	'services/GameService',
	'services/authService',
	'services/UserService',
	'directives/postView',
	'directives/messageForm',
  'directives/onScrollToBottom',
  'directives/errorList'],
	function(paw2017a1frontend) {

	paw2017a1frontend.controller('HomeCtrl',
		['$scope',
		'$location',
		'GameService',
		'restService',
		'authService',
		'UserService',
		'perPage',
	function($scope,$location, GameService, restService, auth, UserService, perPage) {

		if (!auth.isLoggedIn()){
			$location.url('/welcome');
		}

		$scope.homePageText = 'This is your homepage';

		var _page = 0;
		var _loading = false;
		var _ready = false;

		$scope.posts = [];
		$scope.serverError = false;

		$scope.isLoading = function(){
			return _loading && !_ready;
		};

		$scope.scroll = function(){
			if(_loading)
				return;
			_loading = true;
			UserService.mainFeed({
				page: _page,
				'per_page': perPage
			}).$promise.then(function(data){
				$scope.serverError = false;
				$scope.posts = $scope.posts.concat(data);
				if(!data.length == 0){
					_page++;
				} else {
					_ready = true;
				}
				_loading = false;
			}, function(err){
				$scope.serverError = true;
			});
		};

		if(auth.isLoggedIn()){
			$scope.scroll();
		}

		$scope.appendToPosts = function(post){
			$scope.posts.unshift(post);
		};


		$scope.triggerTextForm = function(){
		 	$scope.showTextForm = !$scope.showTextForm;
		 	$scope.showVideoForm = false;
		 }
		 $scope.triggerVideoForm = function(){
		 	$scope.showVideoForm = !$scope.showVideoForm;
		 	$scope.showTextForm = false;
		 }
	// 	 $scope.openMessageForm(function(){

	//  	if(currentContent != $(this).children(':first').attr('id').toLowerCase()){
	//  		currentContent = $(this).children(':first').attr('id').toLowerCase();
	//  		$('.message-creator').removeClass('sr-only');

	//  		$('#body').parent().addClass('sr-only');
	// 		 $('#link').parent().addClass('sr-only');
	// 		 if(currentContent == 'text'){
	// 		  	$('#body').parent().removeClass('sr-only');
	// 		  }
	// 		 else
	// 		 	$('#link').parent().removeClass('sr-only');
	// 		 $('#textDiv,#videoDiv').removeClass('contentSelected');
	// 		 $(this).addClass('contentSelected');
	//  	}else{
	//  		currentContent = "";
	// 		currentType = "comment";
	// 		 $('#dropdownTypeButton').text("Comment");
	// 		 $('.message-creator').addClass('sr-only');
	// 		 $('#textDiv,#videoDiv').removeClass('contentSelected');
	//  	}


	//   });

	}]);
});
