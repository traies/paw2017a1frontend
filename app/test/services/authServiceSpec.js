'use strict';
define(['services/authService', 'angular-mocks'], function() {

    describe('authService', function() {

        var authService, baseUrl, $httpBackend, $q;
        var TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdGVhbUlkIjo3NjU2MTE5ODAzNTUwNzEyNCwiaXNzIjoidmFwb3IiLCJleHAiOjE1MTc4NjA4NDksInVzZXJJZCI6NDIsImlhdCI6MTUxNzg1OTk0OSwianRpIjoiZDExN2RhYWFmNWNjNTc4ZWNlYjQ4MmQ1NDY0MWYxYzkiLCJ1c2VybmFtZSI6IlprYXlvbiJ9.RAey2aadeb8QgrE-wwOUjH0w55bxOkGn2h2XQ-QexrI";
        var USERNAME = 'Zkayon';
        var PASSWORD = 'zkayon';
        var INCORRECT_PASSWORD = 'q1w2e3r4';
        var CREDENTIALS = 'username='+encodeURIComponent(USERNAME)+
                          '&password='+encodeURIComponent(PASSWORD);
        var WRONG_CREDENTIALS = 'username='+encodeURIComponent(USERNAME)+
                                '&password='+encodeURIComponent(INCORRECT_PASSWORD);

        beforeEach(module('paw2017a1frontend'));

        beforeEach(inject(function(_authService_, _baseUrl_, _$httpBackend_, _$q_){
          authService = _authService_;
          baseUrl = _baseUrl_;
          $httpBackend = _$httpBackend_;
          $q = _$q_;

          $httpBackend.whenPOST(baseUrl + '/api/login', CREDENTIALS)
                      .respond(200, $q.when(''), {
                        'x-auth-token': TOKEN
                      });

        }));

        it('should be defined', function() {
            expect(authService).toBeDefined();
        });

        describe('logIn', function(){

          it('should be defined', function(){
            expect(authService.logIn).toBeDefined();
            expect(authService.isLoggedIn).toBeDefined();
          });

          it('should log in successfully', function(){

            authService.logIn(USERNAME, PASSWORD, true);

            $httpBackend.flush();

            expect(authService.isLoggedIn()).toBe(true);

          });

        });

        describe('logOut', function(){
          it('should be defined', function(){
             expect(authService.logOut).toBeDefined();
             expect(authService.isLoggedIn).toBeDefined();
          });

          it('should log out correctly', function(){
            authService.logIn(USERNAME, PASSWORD, true);

            $httpBackend.flush();

            expect(authService.isLoggedIn()).toBe(true);

            authService.logOut();

            expect(authService.isLoggedIn()).toBe(false);
          });

        });

    });

});
