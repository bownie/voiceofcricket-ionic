// Controlling to fetch matches from from the cricscore API
//
var matchModule = angular.module('matchesController', ['matchesServices']);

matchModule.controller('MatchController', function($scope, $http, $window, voiceService, fetchService, $q, $interval, $rootScope) {

  var updateId = null;

  $scope.selection = 0;
  $rootScope.currentScore = "Select a match from the menu above>";
  $rootScope.talkState = "stopped";

  $scope.toggleButton = function() {
    console.log("toggle button in controller");

    if ($rootScope.talkState == "stopped" ) {

        $rootScope.talkState = "started";

        // Now do some speech
        //
        console.log("First speech");
        voiceService.doSpeech();

        // Set interval timer
        //
        updateId = $interval(
          function() {
            console.log("updateScore");

            // Fetch score again
            //
            var myDataPromise = fetchService.getMatch(window.matchIdSelected);

            // This is only run after $http completes
            //
            myDataPromise.then(function(result) {
  
              // Always store the last fetch
              //
              $rootScope.currentScore = result;
              console.log("Result = " + result);
              //$scope.$apply();
              //window.lastFetchedMatch = $scope.currentScore;

              console.log("Doing speech in timer");
              voiceService.doSpeech();
            });
          },
          window.localStorage.getItem('updateInterval') * 1000);

      } else {
 
        console.log("Cancel talking");

        $rootScope.talkState = "stopped";
        voiceService.doSpeech(); // to cancel speech
        $interval.cancel(updateId);
        updateId = null;
      }
    }

    $scope.updateScore = function() {
      console.log("updateScore");

      // Fetch score again
      //
      var myDataPromise = fetchService.getMatch(window.matchIdSelected);

      // This is only run after $http completes
      //
      myDataPromise.then(function(result) {
  
        // Always store the last fetch
        //
        $rootScope.currentScore = result;
        console.log("Doing speech in timer");
        voiceService.doSpeech();
      });
    }

    $scope.fetchMatches = function() {
      $http.get('http://xyglo.com:1337/cricscore-api.appspot.com/csa').then(function(resp) {

        // For JSON responses, resp.data contains the result
        //
        //log('Success', resp);
        $scope.matches = resp.data;

      }, function(err) {

        // err.status will contain the status code
        //
        console.log('ERR = ' + err);
      })
    }

    $scope.change = function(id) {

      // Store the selected match id
      //
      window.matchIdSelected = $scope.selection;

      console.log("Scope.selection = " + $scope.selection);

      var myDataPromise = fetchService.getMatch($scope.selection);
      myDataPromise.then(function(result) {  // this is only run after $http completes

        // Always store the last fetch
        //
        $rootScope.currentScore = result;
        //window.lastFetchedMatch = $scope.currentScore;
        console.log("match score = "  + result);
      });
    };

    $scope.fetchMatches();
});


matchModule.controller('updateIntervalController', ['$scope', '$filter', function($scope, $filter) {
  $scope.data = {};

  if (window.localStorage.getItem('updateInterval') == null) {
    $scope.data.updateInterval = 30;
    window.localStorage.setItem('updateInterval', $scope.data.updateInterval);
  } 

  // Now always fetch
  //
  $scope.data.minRange = 30;
  $scope.data.maxRange = 600;
  $scope.data.step = 1;
  $scope.data.updateInterval = window.localStorage.getItem('updateInterval');
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

  // Always format the interval
  //
  $scope.formatInterval();

}]);

matchModule.controller('accentController', ['$scope', '$filter', function($scope, $filter) {
  $scope.data = {};
  
  // Check for default
  //
  if (window.localStorage.getItem('accent') == null) {
    $scope.data.accent = "English";
    window.localStorage.setItem('accent', $scope.data.accent);
  }

  // Fetch
  //
  $scope.data.accent = window.localStorage.getItem('accent');
  //alert('Got accent = ' + $scope.data.accent);

  $scope.changeAccent = function() {

    if ($scope.data.accent == "English" ) {
      window.accentSelected = "en-GB";
    } else if ($scope.data.accent == "Australian" ) {
      window.accentSelected = "en-AU";
    } else if ($scope.data.accent == "South African" ) {
      window.accentSelected = "en-ZA";
    } else if ($scope.data.accent == "American" ) {
      window.accentSelected = "en-US";
    } else if ($scope.data.accent == "English Indian" ) {
      window.accentSelected = "en-IN";
    } else if ($scope.data.accent == "English Zimbabwe" ) {
      window.accentSelected = "en-ZA";
    } else if ($scope.data.accent == "Hindi" ) {
      window.accentSelected = "hi-IN";
    } else if ($scope.data.accent == "Irish" ) {
      window.accentSelected = "en-IE";
    } else {
      alert("Can't change accent to " + $scope.data.accent);
    }
    return window.localStorage.setItem('accent', $scope.data.accent);
  }

  // Always set the accentSelected value based on dropdown
  //
  $scope.changeAccent();
}]);

