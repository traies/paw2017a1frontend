'use strict';
define(['paw2017a1frontend','services/authService','directives/postView','directives/messageForm'], function(paw2017a1frontend) {

	paw2017a1frontend.controller('HomeCtrl',[ '$scope','$location','authService',function($scope,$location,auth) {
		$scope.homePageText = 'This is your homepage';
		if (!auth.isLoggedIn())
			$location.url('/welcome');

		$scope.posts = [ {message:{
							user:{name:'Nicolas',id:'2'},
							id:'85',date:'12/01/2018',
							tags:[
									{appid:'45',name:'Counter Strike'},
									{appid:'55',name:'PUBG'}
								],
							type:'Review',
							reviewd:{positive:'true'},
							title:'Review jeje'
					   		}
						,contextSharers:[ {name:'Alejo',id:'3'} , {name:'Tomás',id:'3'} , {name:'Eliseo',id:'3'} ]
						,timesReplied:'2'
						,timesShared:'2'
					} ,
					{message:{
							user:{name:'Tomas'},
							id:'85',date:'12/01/2018',
							tags:[
									{appid:'45',name:'Counter Strike'},
									{appid:'55',name:'PUBG'}
								],
							type:'Video',
							contentd:{body:'https://www.youtube.com/embed/ODlmDbtZy8c'},
							title:'Video jeje'

						}
						,contextSharers:[ {name:'Alejo'} , {name:'Tomás'} , {name:'Eliseo'}, {name:'Nicolas',id:'2'} ]
						,timesReplied:'3'
						,timesShared:'2'
					}
					];
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
