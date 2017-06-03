"use strict"

var newsApp = angular.module("newsApp", ["ui.router"]);

newsApp.controller("MainCtrl", mainController);
newsApp.controller("AppCtrl", appController);
newsApp.controller("NewsCtrl", newsController);


function mainController($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    }
};

function appController($scope, newsResources, objectFactory, $http, productService) {
    // $scope.newsRes = newsResources.data.sources; 
    $scope.newsRes = newsResources.sources; 
    // productService.addProduct($scope.newsRes);

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
}

function newsController($scope, newsArticles){
    console.log(newsArticles);
    // исправить получение объекта
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
            newsArticles: function(productService, objectFactory, newsResources){
               return productService.addResourceforArt(newsResources.sources);
                }
            }
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



// SERVISE for getting all articles
newsApp.service('productService', function(objectFactory) {
  var sourceList = null;

  var addResourceforArt = function(newObj) {
      sourceList = newObj;
      console.log("sourceList updated");
      console.log(sourceList.length);
      return objectFactory.getArticle(sourceList);
  };

  return {
    addResourceforArt: addResourceforArt
  };

});


// GETTING SOURCES
newsApp.factory("objectFactory", ['$http', function($http){  

    var obj = {
        getObject: function(dataUrl){
            var dataUrl = String(dataUrl);
            var promise1 = $http({
                method: 'GET',
                url: dataUrl
                }).then(function(data, status, headers, config) {
                    return data.data;
            });
            return promise1;
        },
        getArticle: function(dataRes){
            var dataRes =  dataRes;
            var articlesArr = [];

            for(var i = 0; i<=dataRes.length-1; i++){
                var sourceId = dataRes[i].id;
                
                var sort = dataRes[i].sortBysAvailable[0];
                var api_KEY = '3ce5eede372b41dca1278128350bf064';
                var dataUrl = 'https://newsapi.org/v1/articles?source='+sourceId+'&sortBy='+sort+'&apiKey='+api_KEY;   

                $http.get(dataUrl).then(function(response){articlesArr.push(response.data); return articlesArr;});
            } //FOR finish
             return articlesArr;
        }

    };
   
    return obj;
}]);



