// Controlling to fetch matches from from the cricscore API
//
var matchModule = angular.module('matchesController', ['ngResource']);

matchModule.controller('MatchesController', function ($scope, $http) {

    $scope.showSelectValue = function() {
      console.log(mySelect);
    }


    $http.get('http://cricscore-api.appspot.com/csa').then(function(resp) {

      // For JSON responses, resp.data contains the result
      //
      //log('Success', resp);
      $scope.matches = resp.data;


    }, function(err) {

      // err.status will contain the status code
      //
      //error('ERR', err);
    });

    $scope.matchId = 0;
    $scope.matchSelected = function() {
        $scope.matchId = id;
        //info("Controlled matchSelected: match id = " + id);
    }.bind($scope);


    $scope.$watch('matchSelected', function() {
      //info("SELECTED");
        //$scope.action();
    }); 

    $scope.onSelectChange = function(id) {

      $scope.item.size.code = $scope.selectedItem.code
      alert('Template is : ' + id);
      $scope.currentMatchScore = "Current Match Score";
      alert("thing");  
    }


});


matchModule.controller('MatchController', ['$scope', '$http', function($scope, $http) {

    $http.get('http://cricscore-api.appspot.com/csa').then(function(resp) {

      // For JSON responses, resp.data contains the result
      //
      //log('Success', resp);
      $scope.matches = resp.data;

    }, function(err) {

      // err.status will contain the status code
      //
      //error('ERR', err);
    })
/*
    $scope.matches = [     { t1: 'Feature', t2: 'feature' }, 
                           { t1: 'Bug', t2: 'bug' }, 
                           { t1: 'Enhancement', t2: 'enhancement' } ];
*/

    $scope.counter = 0;
    $scope.currentScore = "<nothing fetched>";
    $scope.selection = 0;
    $scope.change = function(id) {

      // Loaded into $scope.selection
      //
      $http.get('http://cricscore-api.appspot.com/csa?id=' + $scope.selection).then(function(resp) {
        $scope.currentScore = resp.data[0].de; // the description
      });
    };

}]);


matchModule.controller('TestController', ['$scope', function($scope) {
    $scope.counter = 0;
    $scope.change = function() {
    $scope.counter++;
  };
}]);

matchModule.controller('updateIntervalController', ['$scope', '$filter', function($scope, $filter) {
  $scope.data = {};

  if (window.localStorage.getItem('updateInterval') == null) {
  
    $scope.data.updateInterval = 30;

  } else {

    $scope.data.updateInterval = window.localStorage.getItem('updateInterval');

  }
 
  $scope.data.updateInterval = 60;
  $scope.data.minRange = 30;
  $scope.data.maxRange = 600;
  $scope.data.formattedInterval = "1 min";

  $scope.formatInterval = function() {
    
    if ($scope.data.updateInterval == 30) {

      $scope.data.formattedInterval = "30 seconds";

    } else if ($scope.data.updateInterval > 30 && $scope.data.updateInterval < 60 ) {

      $scope.data.formattedInterval = "Less than a minute";

    } else if ($scope.data.updateInterval > 60 && $scope.data.updateInterval < 120 ) {

      $scope.data.formattedInterval = "1 minute or so";

    } else if ($scope.data.updateInterval > 60 ) {

      $scope.data.formattedInterval = $filter('number')($scope.data.updateInterval/60, 0) + " minutes";

    }

    return window.localStorage.setItem('updateInterval', $scope.data.updateInterval);
  }
}]);

