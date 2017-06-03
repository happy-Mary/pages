"use strict"

var newsApp = angular.module("newsApp", ["ui.router"]);

newsApp.controller("MainCtrl", mainController);

newsApp.controller("AppCtrl", appController);

function mainController($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    }
};

function appController($scope, newsResources, objectFactory, $http) {
    $scope.newsRes = newsResources.data.sources; 
    $scope.newsRes = newsResources.data.sources; 
    console.log($scope.newsRes);
     // console.log($scope.newArt);

    $scope.categories = [];
    
    $scope.makeCatArr = function(){
        for (var i = $scope.newsRes.length - 1; i >= 0; i--) {
            var catItem = String($scope.newsRes[i].category);
            // console.log(catItem);
            function Some(V, I, A){
                return V.localeCompare(catItem) === 0;
            }

            var res = $scope.categories.some(Some);
            if(res === false) {$scope.categories.push(catItem);}
            }
            // console.log($scope.categories);
      };

    $scope.makeCatArr();


    // var newsapi_org_apiKey = ["1bef2b9f1a834a4ba7c821a4f7037c6a"];
    // var sourceId = $scope.newsRes[0].id;
    // var url_art = 'https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=1bef2b9f1a834a4ba7c821a4f7037c6a';
    // vm.artArr = null;
    // objectFactory.getObject(url_art).then(function(data){
    //     $scope.artArr = data.data.articles;
    //     console.log($scope.artArr);
    // });
    

}


// Ui-router
newsApp.config(function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) {
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
            newsResources: function(objectFactory){return objectFactory.getObject('https://newsapi.org/v1/sources?language=en');}
            }
        })
        .state("app.main", {
            url: "/main",
            templateUrl: "templates/info.html"
            
        })
        .state("app.saved", {
            url: "/saved",
            templateUrl: "templates/saved.html"
        })
        .state("app.add-news",{
        	url: "/addnews",
        	templateUrl: "templates/add.html"
        })
        .state("app.added",{
        	url: "/mynews",
        	templateUrl: "templates/added-news.html"
        })
        .state("app.news-info", {
        	url: "/article/{id:[/d]{1,20}}",
        	templateUrl: "templates/news-info.html"
        });
});

// GETTING DATA FROM SERVER
newsApp.factory("objectFactory", ['$http', function($http){  

    var obj = {
        getObject: function(dataUrl){
            var dataUrl = String(dataUrl);
            var promise1 = $http({
                method: 'GET',
                url: dataUrl
                }).then(function(data, status, headers, config) {
                   // return makeArrO(data);
                    return data;
            });
            return promise1;
        }
    };

    return obj;
}]);
