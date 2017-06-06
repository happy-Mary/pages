"use strict"
// CONTROLLERS
function mainController($scope, $location, $rootScope) {
    $scope.isActive = function(route) {
        return route === $location.path();
    }
    // Showing preloader on state events
        $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
          $scope.preloader = true;
        });

        $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
          console.log(arguments);
        });

        $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
           $scope.preloader = false;
        });

        $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
          console.log(unfoundState, fromState, fromParams);
        });

};

function appController($rootScope, $scope, newsResources, $state, localStorageService) {
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

    $scope.currentArticle = {title: "Choose an article on ALL NEWS page"};
    $scope.readMore = function(string){
        $scope.currentArticle = string;
        $state.go("app.news-info");
    }

    $scope.storageSave = localStorageService.save;

    // adding custom news
    $scope.newsCustomData = {};
    $scope.addNews = function() {
        var customData = $scope.newsCustomData;
        $scope.storageSave('customData', customData);
        $scope.newsCustomData = {};
    };
}

function newsController($scope, $state, newsArticles){
    $scope.allArticles = newsArticles;
}

function savedController($scope, $state, localStorageService, savedArticles){
   $scope.savedForLater = savedArticles;
   
    $scope.deleteSavedForLater = function(obj, data){
        localStorageService.delete(obj, data);
        $scope.savedForLater = localStorageService.get(obj);
    }
}

