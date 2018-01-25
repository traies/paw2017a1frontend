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
          messageService.genericMessageResource()
          .delete({id: id})
          .$promise.then(
            function (data) {
              $scope.post.deleted = true;
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
