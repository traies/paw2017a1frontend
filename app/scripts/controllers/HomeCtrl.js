'use strict';
define(
	['paw2017a1frontend',
	'services/restService',
	'services/GameService',
	'services/authService',
	'services/UserService',
	'directives/postView',
	'directives/messageForm'],
	function(paw2017a1frontend) {

	paw2017a1frontend.controller('HomeCtrl',
		['$scope',
		'$location',
		'GameService',
		'restService',
		'authService',
		'UserService',
	function($scope,$location, GameService, restService, auth, UserService) {
		$scope.homePageText = 'This is your homepage';
		if (!auth.isLoggedIn())
			$location.url('/welcome');

		UserService.mainFeed().$promise.then(function(data){
			$scope.posts = data;
		}, function(err){

		});

		$scope.triggerTextForm = function(){
		 	$scope.showTextForm = !$scope.showTextForm;
		 	$scope.showVideoForm = false;
		 }
		 $scope.triggerVideoForm = function(){
		 	$scope.showVideoForm = !$scope.showVideoForm;
		 	$scope.showTextForm = false;
		 }
		 /*$scope.openMessageForm(function(){

	 	if(currentContent != $(this).children(':first').attr('id').toLowerCase()){
	 		currentContent = $(this).children(':first').attr('id').toLowerCase();
	 		$('.message-creator').removeClass('sr-only');

	 		$('#body').parent().addClass('sr-only');
			 $('#link').parent().addClass('sr-only');
			 if(currentContent == 'text'){
			  	$('#body').parent().removeClass('sr-only');
			  }
			 else
			 	$('#link').parent().removeClass('sr-only');
			 $('#textDiv,#videoDiv').removeClass('contentSelected');
			 $(this).addClass('contentSelected');
	 	}else{
	 		currentContent = "";
			currentType = "comment";
			 $('#dropdownTypeButton').text("Comment");
			 $('.message-creator').addClass('sr-only');
			 $('#textDiv,#videoDiv').removeClass('contentSelected');
	 	}


	 });*/

	}]);
});
