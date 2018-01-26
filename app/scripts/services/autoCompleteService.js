define(['paw2017a1frontend'], function(paw2017a1frontend) {

    'use strict';
    paw2017a1frontend.factory('autoCompleteService', function($window) {

    	var Autocomplete = {};

    	var sourceGames = new Bloodhound({
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
				remote: {
					wildcard: '%QUERY',
					url: contextPath + "/autocomplete?term=%QUERY",
					transform: function(response) {
						a =  $.map(response, function(game) {
							return {
								name: game.name,
								appid: game.appid,
								type: "game"
							}
						});
						return a ;
					}
				}
			});
			sourceGames.initialize();
		    
		    var adapterGames = function (query,  cb, cb2) {
				sourceGames.search(query, function(matches) {
					matches.push({
						name: "Search games for ",
						type: "search-games",
						query: query
					})
					cb(matches);
				}, function(matches) {
					cb2(matches);
				});
			};
		    
		    var sourceUsers = new Bloodhound({
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
				remote: {
					wildcard: '%QUERY',
					url: contextPath + "/autocompleteUsers?term=%QUERY",
					transform: function(response) {
						
						return $.map(response, function(user) {
							return {
								name: user.name,
								id: user.id,
								type: "user"
							}
						})
					}
				}
			});
		    
		    var adapterUsers = function (query,  cb, cb2) {
				sourceUsers.search(query, function(matches) {
					matches.push( {
						name: "Search users for ",
						type: "search-users",
						query: query
					});
					cb(matches);
				}, function(matches) {
					cb2(matches);
				});
			};
		    
		    sourceUsers.initialize();

		    var sourceMessages = new Bloodhound({
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
				remote: {
					wildcard: '%QUERY',
					url: contextPath + "/autocompleteMessages?term=%QUERY",
					transform: function(response) {
						
						return $.map(response, function(message) {
							return {
								name: message.title,
								id: message.id,
								type: "message"
							}
						});
					}
				}
			});
		    
		    var adapterMessages = function (query,  cb, cb2) {
				sourceMessages.search(query, function(matches) {
					matches.push( {
						name: "Search messages for ",
						type: "search-messages",
						query: query
					});
					cb(matches);
				}, function(matches) {
					cb2(matches);
				});
			};
		    
		    sourceMessages.initialize();

		  Autocomplete.initializeTagsAutoComplete = function(updateTags){
		    	$('.typeahead.tags').typeahead({
						minLength: 3,
						highlight: true
					},
					{
						name: 'game-dataset',
						source: new Bloodhound({
							queryTokenizer: Bloodhound.tokenizers.whitespace,
							datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
							remote: {
								wildcard: '%QUERY',
								url: contextPath + "/autocomplete?term=%QUERY",
								transform: function(response) {
									return $.map(response, function(game) {
										return {
											name: game.name,
											appid: game.appid,
											id: game.id
										}
									})
								}
							}
						}),
						display: 'name'
					}
				
				);
				$(".typeahead.tags").on( "typeahead:select", function(ev, sugestion) {
							updateTags(ev,sugestion);	
				});
		    };

        Autocomplete.initialize = function() { 

		 	$(".typeahead.search").on( "typeahead:select", function(ev, sugestion) {
				if (sugestion.type == "game") {
					$window.location.href = contextPath + "#!/game/"+encodeURIComponent(sugestion.appid);
				}
				if (sugestion.type == "user") {
					$window.location.href = contextPath + "#!/user/"+ encodeURIComponent(sugestion.name);
				}
				if (sugestion.type == "message") {
					$window.location.href = contextPath + "#!/post?id="+ encodeURIComponent(sugestion.id);
				}
				if (sugestion.type == "search-games") {
					$window.location.href = contextPath + "#!/search/games/" + encodeURIComponent(sugestion.query);
				}
				if (sugestion.type == "search-users") {
					$window.location.href = contextPath + "#!/search/users/" + encodeURIComponent(sugestion.query);
				}
				if (sugestion.type == "search-messages") {
					$window.location.href = contextPath + "#!/search/messages/" + encodeURIComponent(sugestion.query);
				}
				$(".typeahead").typeahead('val', '');
			});
			
			$(".typeahead.search").on("typeahead:cursorchange", function(ev, suggestion) {
				if (suggestion && (suggestion.type == "search-games" || suggestion.type == "search-users" || suggestion.type == "search-messages")){
					$(".typeahead").typeahead('val', suggestion.query);
				}
			}); 

			$('.typeahead.search').typeahead({
					minLength: 3,
					highlight: true,
					autoselect: true,
					
				},
				{
					name: 'game-dataset',
					source: adapterGames,
					display: 'name',
					autoselect: true,
					limit: 3,
					templates: {
					    header: '<h5 class="typeahead-header">Games</h5>',
					    suggestion: function(suggestion) {
					    	if (suggestion.type == 'game') {
					    		return "<span>" + escapeHtml(suggestion.name) + "</span>";
					    	} else {
					    		return "<span> " + escapeHtml(suggestion.name) + " \""+ escapeHtml(suggestion.query) + "\"</span>";
					    	}
					    }
					}
				},
				{
					name: 'user-dataset',
					source: adapterUsers,
					display: 'name',
					limit: 3,
					templates: {
					    header: '<h5 class="typeahead-header">Users</h5>',
					    suggestion: function(suggestion) {
					    	if (suggestion.type == 'user') {
					    		return "<span>" + escapeHtml(suggestion.name) + "</span>";
					    	} else {
					    		return "<span> " + escapeHtml(suggestion.name) + " \""+ escapeHtml(suggestion.query) + "\"</span>";
					    	}
					    }
					},
					
				},
				{
					name: 'messages-dataset',
					source: adapterMessages,
					display: 'name',
					limit: 3,
					templates: {
					    header: '<h5 class="typeahead-header">Messages</h5>',
					    suggestion: function(suggestion) {
					    	if (suggestion.type == 'message') {
					    		return "<span>" + escapeHtml(suggestion.name) + "</span>";
					    	} else {
					    		return "<span> " + escapeHtml(suggestion.name) + " \""+ escapeHtml(suggestion.query) + "\"</span>";
					    	}
					    }
					},
					
				}
			
			).on("typeahead:render", function(event, suggestions, flag, name) {
				$('.autocomplete').parent().find('.tt-selectable:first').addClass('tt-cursor');
				
			});
		};

		return Autocomplete;
    });

});

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
