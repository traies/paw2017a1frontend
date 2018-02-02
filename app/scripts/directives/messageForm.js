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
      scope: {
        showTextForm: '=',
        showVideoForm: '=',
        idName: '=',
        append: '&'
      },
			controller:
      ['$scope',
       'autoCompleteService',
       'MessageService',
       'youtubePattern',
       function($scope, autoComplete, messageService, youtubePattern) {


        $scope.positiveReview = true;
				$scope.newMessageType = 'Comment' ;
				$scope.youtubePattern = youtubePattern;
				$scope.moreThanFive = false;
				$scope.moreThanOneInReview = false;
				$scope.repeatedGame = false;
        $scope.postError = false;
        $scope.body = '';
        $scope.messageGames = {
          games: []
        } ;

        if($scope.idName){
          $scope.idName.$promise.then(function(data){
            $scope.messageGames.games.push(data);
          });
        }

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
            $scope.messageGames.games.forEach(function(element){
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
                  $scope.append()(data);
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

				$scope.removeGame = function(index){
					$scope.messageGames.games.splice(index, 1);
					$scope.moreThanFive = false;
				}

				autoComplete.initializeTagsAutoComplete( function(ev,suggestion){
					$scope.moreThanFive = false;
					$scope.moreThanOneInReview = false;
					$scope.repeatedGame = false;

					$scope.messageGames.games.forEach(function(element){
						if(element.id == suggestion.id){
							$scope.repeatedGame = true;
							return;
						}
					})

					if($scope.newMessageType === 'Review' && $scope.messageGames.games.length == 1){
							$scope.moreThanOneInReview = true;
							return;
					}

					if($scope.messageGames.games.length == 5){
							$scope.moreThanFive = true;
							return;
					}
					$scope.$apply( function(){
            $scope.messageGames.games.push(suggestion);
            $('.typeahead').typeahead('val', '');
          });
				});

			}]
		}
    });

});
