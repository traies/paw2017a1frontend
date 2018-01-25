define(['paw2017a1frontend','services/authService','services/MessageService','controllers/ReplyModalCtrl'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.directive('postView', function() {
       return {
			restrict: 'E',
			replace: 'true',
			templateUrl: 'views/postView.html',
			scope: {post: '='},
			controller: ['$scope','$sce','authService','MessageService','$uibModal' ,function($scope,$sce,auth,messageService,$uibModal) {

        $scope.user = auth.getLoggedUser();

        $scope.currUserShort = {
          'id': $scope.user.id,
          'name': $scope.user.name
        };

				var post = $scope.post;
				$scope.isSameUser = $scope.user ?  $scope.user.id === $scope.post.message.author.id : false;

				$scope.post.sharers.forEach(function(element){
						if (element.id == $scope.user.id)
							$scope.haveShared = true;
				});

				$scope.trustedVideoUrl = function(url) {
					return $sce.trustAsResourceUrl(url);
				};

        $scope.deleteMessage = function(id){
          messageService.idMessageResource()
          .delete({id: id})
          .$promise.then(
            function (data) {
              $scope.post.deleted = true;
            },
            function (error){

            }
          );
        };

        $scope.share = function(id){
          messageService.idMessageResource()
          .share({id: id})
          .$promise.then(
            function (data) {
              $scope.haveShared = true;
              $scope.post.times_shared ++;
              $scope.post.sharers[$scope.post.sharers.length]=$scope.currUserShort;
            },
            function (error){

            }
          );
        };

        $scope.unshare = function(id){
          messageService.idMessageResource()
          .unshare({id: id})
          .$promise.then(
            function (data) {
              $scope.haveShared = false;
              $scope.post.times_shared --;
              var index = $scope.post.sharers.indexOf($scope.currUserShort);
              $scope.post.sharers.splice(index, 1);
            },
            function (error){

            }
          );
        };

				$scope.replyModal = function(){
					return $uibModal.open({
						templateUrl: 'views/modals/replyModal.html',
						controller: 'ReplyModalCtrl',
						  resolve: {
					           post: function () {
					            	return $scope.post;
					           }
				         }
					}).result.catch(function(res) {
					  if (!(res === 'backdrop click' || res === 'escape key press')) {
					    throw res;
					  }
					});;
				}

			}]
		}
    });

});
