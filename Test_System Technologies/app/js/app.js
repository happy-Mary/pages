"use strict"

var newsApp = angular.module("newsApp", ["ui.router", 'ui.router.state.events']);

newsApp.controller("MainCtrl", mainController);
newsApp.controller("AppCtrl", appController);
newsApp.controller("NewsCtrl", newsController);
newsApp.controller("SavedCtrl", savedController);
newsApp.factory("objectFactory", objectFactory);
newsApp.factory('myService', myService);
newsApp.factory('dataService', dataService);
newsApp.factory('localStorageService', localStorageService);
newsApp.config(appConfig);

// UI-ROUTER
function appConfig($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $locationProvider.hashPrefix('');
    // $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/main");
    $stateProvider
        .state("app", {
            abstract: true,
            url: '',
            template: '<div ui-view></div>',
            controller: "AppCtrl",
            resolve: {
            newsResources: function(objectFactory){
                return objectFactory.getObject('https://newsapi.org/v1/sources?language=en');
             },
            }
        })
        .state("app.main", {
            url: "/main",
            templateUrl: "templates/info.html",
            controller: "NewsCtrl",
            resolve: {
            newsArticles: function(dataService){
               return dataService.getData();
             },
            }
        })
        .state("app.saved", {
            url: "/saved",
            templateUrl: "templates/saved.html",
            controller: "SavedCtrl",
            resolve: {savedArticles: function(localStorageService){return localStorageService.get('savedArt');}}
        })
        .state("app.add-news",{
            url: "/addnews",
            templateUrl: "templates/add.html"
        })
        .state("app.added",{
            url: "/mynews",
            templateUrl: "templates/added-news.html",
            controller: "SavedCtrl",
            resolve: {savedArticles: function(localStorageService){return localStorageService.get('customData');}}
        })
        .state("app.news-info", {
            // url: "/article/{id:[/d]{1,10}}",
            url: "/article",
            templateUrl: "templates/news-info.html"
        });
};