"use strict"
// SERVICES
// get resources Service
function objectFactory($http, dataService){  
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
};

// Getting All Articles by http
function myService($http, $q){
  return {
    getItems: function (resArr){
        var resArr = resArr.sources;
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
};

// SERVISE to set resources for getting articles and returning articles object
function dataService(myService) {
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
};

// localStorage service
function localStorageService(){
    return {
        save: function(key, data){
            var localObj = angular.fromJson(localStorage.getItem(key));
            if(!localObj){
                localObj = [];
            }
            localObj.push(data);
            localStorage.setItem(key, angular.toJson(localObj));
        },
        get: function(key){
            var localObj = angular.fromJson(localStorage.getItem(key));
            return localObj;
        },
        delete: function(key, titleData){
            var localObj = angular.fromJson(localStorage.getItem(key));
            var obj = localObj.find(function(obj){return obj.title === titleData});
            var objIndex = localObj.indexOf(obj);
            localObj.splice(objIndex, 1);
            localStorage.setItem(key, angular.toJson(localObj));
        }
    }
};

    