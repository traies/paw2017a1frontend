'use strict';
define(['services/MessageService', 'angular-mocks'], function() {

    describe('MessageService', function() {

        var MessageService, baseUrl, $httpBackend, $q;
        var TYPE = 'comment';
        var MEDIA = 'text';
        var TITLE = 'TITLE';
        var BODY = 'BODY';
        var TAGS = ['Counter-Strike'];
        var POSITIVE;

        var MOCK_MESSAGE = {
          'type': TYPE,
          'media': MEDIA,
          'title': TITLE,
          'body': BODY,
          'tags': TAGS,
          'positive': POSITIVE
        };

        var MOCK_RESPONSE_CONTEXT_DATA = {
          'message': {
            'id': 1,
            'author': 'Zkayon',
            'tags': [{
              'name': 'Counter-Strike',
              'id': 10
            }],
            'date': 0,
            'title': TITLE,
            'message_type': TYPE,
            'content_type': MEDIA,
            'content_data': BODY
          },
          'sharers': [],
          'times_shared': 0,
          'times_replied': 0
        };

        beforeEach(module('paw2017a1frontend'));

        beforeEach(inject(function(_MessageService_, _baseUrl_, _$httpBackend_, _$q_){
          MessageService = _MessageService_;
          baseUrl = _baseUrl_;
          $httpBackend = _$httpBackend_;
          $q = _$q_;

        }));

        it('should be defined', function() {
          expect(MessageService).toBeDefined();
          expect(MessageService.postResource).toBeDefined();
        });

        it('should post correctly', function(){
          var error = false;
          var mssg;

          $httpBackend.whenPOST(baseUrl + '/api/message/comment/text', MOCK_MESSAGE)
                      .respond(200, $q.when(MOCK_RESPONSE_CONTEXT_DATA));

          var response = MessageService.postResource().save(MOCK_MESSAGE);
          expect(response).toBeDefined();
          response.$promise.then(function(data){
            mssg = data;
          }, function(err){
            error = true;
          });
          $httpBackend.flush();
          expect(error).toBe(false);
          expect(mssg.$resolved).toBe(true);
          console.log(mssg);
        });


    });

});
