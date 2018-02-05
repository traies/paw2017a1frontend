'use strict';
define(['services/sessionService', 'angular-mocks', 'angular-jwt'], function() {

    describe('sessionService', function() {

        var sessionService, jwtHelper;
        //The TOKEN represents a Steam-linked account
        var TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdGVhbUlkIjo3NjU2MTE5ODAzNTUwNzEyNCwiaXNzIjoidmFwb3IiLCJleHAiOjE1MTc4NjA4NDksInVzZXJJZCI6NDIsImlhdCI6MTUxNzg1OTk0OSwianRpIjoiZDExN2RhYWFmNWNjNTc4ZWNlYjQ4MmQ1NDY0MWYxYzkiLCJ1c2VybmFtZSI6IlprYXlvbiJ9.RAey2aadeb8QgrE-wwOUjH0w55bxOkGn2h2XQ-QexrI";
        var USERNAME = 'Zkayon';
        var USER_ID = 42;
        var USER_OBJ;

        beforeEach(module('paw2017a1frontend'));

        beforeEach(inject(function(_sessionService_, _jwtHelper_){
          sessionService = _sessionService_;
          jwtHelper = _jwtHelper_;
        }));

        it('should be defined', function() {
            expect(sessionService).toBeDefined();
            expect(jwtHelper).toBeDefined();
        });

        beforeEach(function(){
          var payload = jwtHelper.decodeToken(TOKEN);
          USER_OBJ = {
            name: payload.username,
            id: payload.userId,
            token: TOKEN,
            tokenPayload: payload,
            rememberMe: true
          };
        });

        it('should have filled the user object', function(){
          expect(USER_OBJ).toBeDefined();
          expect(USER_OBJ.name).toEqual(USERNAME);
          expect(USER_OBJ.id).toEqual(USER_ID);
        });

        describe('set and get user', function(){
          it('should be defined', function(){
            expect(sessionService.setUser).toBeDefined();
            expect(sessionService.isLoggedIn).toBeDefined();
            expect(sessionService.getUser).toBeDefined();
          });

          it('should set the user correctly', function(){
            sessionService.setUser(USER_OBJ);
            expect(sessionService.isLoggedIn()).toBe(true);
          });

          it('should retrieve the user correctly', function(){
            sessionService.setUser(USER_OBJ);
            expect(sessionService.getUser()).toEqual(USER_OBJ);
          });

        });

        describe('isSteamLinked', function(){

          it('should be defined', function(){
            expect(sessionService.isSteamLinked).toBeDefined();
          });

          it('should say that the account is Steam-linked', function(){
            sessionService.setUser(USER_OBJ);
            expect(sessionService.isSteamLinked()).toBe(true);
          });

        });

        describe('destroy', function(){

          it('should be defined', function(){
            expect(sessionService.destroy).toBeDefined();
          });

          it('should destroy the session correctly', function(){
            sessionService.setUser(USER_OBJ);
            sessionService.destroy();
            expect(sessionService.isLoggedIn()).toBe(false);
          });

        });


    });

});
