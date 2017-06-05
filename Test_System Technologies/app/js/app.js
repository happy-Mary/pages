"use strict"

var newsApp = angular.module("newsApp", ["ui.router"]);

newsApp.controller("MainCtrl", mainController);
newsApp.controller("AppCtrl", appController);
newsApp.controller("NewsCtrl", newsController);
newsApp.controller("SavedCtrl", savedController);


function mainController($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    }
};

function appController($scope, newsResources, $state, localStorageService) {
    $scope.newsRes = newsResources.sources; 

    $scope.resourceContent = 'all';
    $scope.categotyContent = 'all';
     var limitStep = 2;
    $scope.limitToShow = limitStep;
   

    $scope.incrementLimit = function(){$scope.limitToShow+=limitStep;}
    $scope.decrementLimit = function(){
        $scope.limitToShow-=limitStep; 
        if ($scope.limitToShow <= 2) {$scope.limitToShow = 2;}
    }

    $scope.showResource = function(name, category){
        $scope.resourceContent = name;
        console.log($scope.resourceContent);
        $scope.categotyContent = category;
        $scope.limitToShow = 5;
    }

    $scope.categories = [];
    $scope.makeCatArr = function(){
        for (var i = $scope.newsRes.length - 1; i >= 0; i--) {
            var catItem = String($scope.newsRes[i].category);
            function Some(V, I, A){
                return V.localeCompare(catItem) === 0;
            }

            var res = $scope.categories.some(Some);
            if(res === false) {$scope.categories.push(catItem);}
            }
      };
    $scope.makeCatArr();

    $scope.currentArticle = {title: "Choose an article"};
    $scope.readMore = function(string){
        $scope.currentArticle = string;
       
        $state.go("app.news-info");
         console.log($scope.currentArticle);
    }

    $scope.$watch('currentArticle', function(newVal, oldVal){
        console.log('changed');
    }, true);

    $scope.storageSave = localStorageService.save;
}

// change getting articles
function newsController($scope, $state, newsResources){
    $scope.allArticles = newsResources;
}

function savedController($scope, $state, localStorageService, savedArticles){
   $scope.savedForLater = savedArticles;
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
            newsResources: function(dataService){
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
        	templateUrl: "templates/added-news.html"
        })
        .state("app.news-info", {
        	// url: "/article/{id:[/d]{1,20}}",
            url: "/article",
        	templateUrl: "templates/news-info.html"
        });
});

// GETTING SOURCES
newsApp.factory("objectFactory", function($http, dataService){  
    var obj = {
        getObject: function(dataUrl){
            var dataUrl = String(dataUrl);
            var promise1 = $http({
                method: 'GET',
                url: dataUrl
                }).then(function(data, status, headers, config) {
                    dataService.setData(data.data);
                    return data.data;
                
            });
            return promise1;
        }
    };
   
    return obj;
});


// Getting Articles
newsApp.factory('myService', function ($http, $q){
  return {
    getItems: function (resArr){
        var resArr = resArr.sources;
        // console.log(resArr);
        var promises= [];
        for (var i = 0; i <= resArr.length-1; i++) {

            var sourceId = resArr[i].id;
            var sort = resArr[i].sortBysAvailable[0];
            var api_KEY = '3ce5eede372b41dca1278128350bf064';
            var dataUrl = 'https://newsapi.org/v1/articles?source='+sourceId+'&sortBy='+sort+'&apiKey='+api_KEY;   

            var promise=$http.get(dataUrl);
            promises.push(promise);
        }

       return $q.all(promises)
      .then(function(results) {
        var data = [];
        angular.forEach(results, function(result) {
          data = data.concat(result.data);
        });
        return data;
      });
    }
  };
});


// SERVISE for getting all articles
newsApp.factory('dataService', function (myService) {
    var formData = {};

    return {
        getData: function () {
             return myService.getItems(formData);
        },
        setData: function (newFormData) {
            formData = newFormData
        },
        resetData: function () {
            formData = {};
        }
    };
});

// localStorage service
newsApp.factory('localStorageService', function(){
    return {
        save: function(key, data){
            var localObj = angular.fromJson(localStorage.getItem(key));
            if(!localObj){
                localObj = [];
            }
            console.log(localObj);
            // return localObj;
            localObj.push(data);
            localStorage.setItem(key, angular.toJson(localObj));
        },
        get: function(key){
            var localObj = angular.fromJson(localStorage.getItem(key));
            return localObj;
        }
    }
});

    