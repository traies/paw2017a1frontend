define(
  ['paw2017a1frontend',
  'services/autoCompleteService',
  'services/MessageService'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.directive('messageForm', function() {
        return {
			restrict: 'E',
			replace: 'true',
			templateUrl: 'views/messageForm.html',
			controller:
      ['$scope',
       'autoCompleteService',
       'MessageService',
       function($scope, autoComplete, messageService) {


        $scope.positiveReview = true;
				$scope.newMessageType = 'Comment' ;
				$scope.youtubePattern = /^(?:https:\/\/(?:www\.)?)?((?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\?t=(?:[0-9]+m)?[0-9]+s)?)$/;
				$scope.moreThanFive = false;
				$scope.moreThanOneInReview = false;
				$scope.repeatedGame = false;
        $scope.postError = false;


        $scope.setReview = function(bool){
          $scope.positiveReview = bool;
        };

				$scope.submitMessage = function(){
					$scope.moreThanFive = false;
					$scope.moreThanOneInReview = false;
					$scope.repeatedGame = false
					if($scope.messageForm.$valid) {

            var media = $scope.showTextForm ? 'text' : $scope.showVideoForm ? 'video' : '';
            var tags = [];
            $scope.messageGames.forEach(function(element){
              tags[tags.length] = element.name;
            });
            var post = {
              'type': $scope.newMessageType.toLowerCase(),
              'media': media,
              'title': $scope.title,
              'body': $scope.body,
              'tags': tags,
              'positive': $scope.positiveReview
            };

						$scope.isSendingMessage=true;

            messageService.postResource()
              .save(post)
              .$promise.then(
                function(data){
                  $scope.postError = false;
                  $scope.isSendingMessage=false;
                },
                function(err){
                  $scope.postError = true;
                  $scope.isSendingMessage = false;
                }
              );

					}
				};

				$scope.messageGames=[{name:'Counter-Strike'}];

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
