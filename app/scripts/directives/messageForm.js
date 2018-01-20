define(['paw2017a1frontend','services/autoCompleteService','services/authService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.directive('messageForm', function() {
        return {
			restrict: 'E',
			replace: 'true',
			templateUrl: 'views/messageForm.html',
			controller: ['$scope','autoCompleteService','authService',function($scope,autoComplete,auth) {
				$scope.user = auth.getLoggedUser();
				$scope.newMessageType = 'Comment' ;
				$scope.youtubePattern = /^(?:https:\/\/(?:www\.)?)?((?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\?t=(?:[0-9]+m)?[0-9]+s)?)$/;
				$scope.moreThanFive = false;
				$scope.moreThanOneInReview = false;
				$scope.repeatedGame = false;

				$scope.submitMessage = function(){
					$scope.moreThanFive = false;
					$scope.moreThanOneInReview = false;
					$scope.repeatedGame = false
					if($scope.messageForm.$valid) {
						$scope.isSendingMessage=true;
						console.log("submiting message");
						//post
						$scope.isSendingMessage=false;
				 		//$scope.showVideoForm = false;
				 		//$scope.showTextForm = false;
					}
				};

				$scope.messageGames=[{name:'Counter Strike'},{name:'PUBG'}];

				$scope.removeGame = function(index){
					$scope.messageGames.splice(index, 1);
					$scope.moreThanFive = false;
				}

				autoComplete.initializeTagsAutoComplete( function(ev,suggestion){
					$scope.moreThanFive = false;
					$scope.moreThanOneInReview = false;
					$scope.repeatedGame = false;
					
					$scope.messageGames.forEach(function(element){
						if(element.id == suggestion.id){
							$scope.repeatedGame = true;
							return;
						}
					})
	
					if($scope.newMessageType === 'Review' && $scope.messageGames.length == 1){
							$scope.moreThanOneInReview = true;
							return;
					}

					if($scope.messageGames.length == 5){
							$scope.moreThanFive = true;
							return;
					}
					$scope.messageGames.push(suggestion);
					$('.typeahead').typeahead('val', '');					
				});
				
			}]
		}
    });

});