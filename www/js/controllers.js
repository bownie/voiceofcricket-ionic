// Controlling to fetch matches from from the cricscore API
//
var matchModule = angular.module('matchesController', []);

matchModule.controller('MatchesController', function ($scope, $http) {

    $scope.showSelectValue = function() {
      console.log(mySelect);
    }

    // Use the local proxy defined in ionic.project
    //
    $http.get('/csa').then(function(resp) {

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


matchModule.controller('MatchController', ['$scope', '$http', '$window', function($scope, $http, $window) {

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

    $scope.counter = 0;
    $scope.currentScore = "<nothing fetched>";
    $scope.selection = 0;
    $scope.change = function(id) {

      // Loaded into $scope.selection
      //
      $http.get('http://cricscore-api.appspot.com/csa?id=' + $scope.selection).then(function(resp) {
        $scope.currentScore = resp.data[0].de; // the description

        // Always store the last fetch
        //
        window.lastFetchedMatch = $scope.currentScore;

        // Check to see if we play it straight away
        //
        if ($window.talkState == "started") {
          //alert("Say this "+ $scope.currentScore);

          // store in last fetch
          // 
          var fallbackSpeechSynthesis = window.getSpeechSynthesis();
          var fallbackSpeechSynthesisUtterance = window.getSpeechSynthesisUtterance();
          var u = new fallbackSpeechSynthesisUtterance(window.lastFetchedMatch);
          u.lang = 'en-GB';
          u.volume = 1.0;
          u.rate = 1.0;
          u.onend = function(event) { console.log('Finished in ' + event.elapsedTime + ' seconds.'); };
          fallbackSpeechSynthesis.speak(u);

        }
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

matchModule.controller('accentController', ['$scope', '$filter', function($scope, $filter) {
  $scope.data = {};
  
  $scope.data.accent = "English";

  $scope.changeAccent = function() {

    if ($scope.data.accent == "English" ) {
      window.accentSelected = "en-GB";
    } else if ($scope.data.accent == "Australian" ) {
      window.accentSelected = "en-AU";
    } else if ($scope.data.accent == "South African" ) {
      window.accentSelected = "en-ZA";
    } else if ($scope.data.accent == "American" ) {
      window.accentSelected = "en-US";
    } else {
      alert("Can't change accent to " + $scope.data.accent);
    }
  }

}]);

