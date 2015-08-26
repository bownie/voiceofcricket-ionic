// Controlling to fetch matches from from the cricscore API
//
var matchModule = angular.module('matchesController', ['matchesServices']);

matchModule.controller('voiceController', function ($scope, $http, voiceService) {
  $scope.toggleButton = function() { 
    console.log("toggle button in controller");

    if (window.talkState == "stopped" ) {

        document.getElementById("talk-button").src="img/StopButton.png";
        window.talkState = "started";

        if (window.timer == null) {
          var count = 0;
          window.timer = $.timer(function() {

              // Wankers
              //
              count++;

              // If the timer exceeds the interval then we refetch
              //
              if (count > window.localStorage.getItem('updateInterval')) {
                console.log("Timer completed in " + count + " seconds");

                // Call speech service
                //
                voiceService.doSpeech();

                // Reset counter but don't invalidate it
                //
                count = 0;
              }
 
          });
          window.timer.set({ time : 1000, autostart : true });
        }

      } else {
 
        document.getElementById("talk-button").src="img/StartButton.png";
        talkState = "stopped";

        // Invalidate timer
        //
        if (window.timer != null) {
          window.timer.stop();
          window.timer = null;
        }
      }

      // Now do some speech
      //
      voiceService.doSpeech();
    }
});

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


matchModule.controller('MatchController', function($scope, $http, $window, voiceService, fetchService, $q) {

    $http.get('http://cricscore-api.appspot.com/csa').then(function(resp) {

      // For JSON responses, resp.data contains the result
      //
      //log('Success', resp);
      $scope.matches = resp.data;

    }, function(err) {

      // err.status will contain the status code
      //
      console.log('ERR = ' + err);
    })

    $scope.counter = 0;
    $scope.currentScore = "<nothing fetched>";
    $scope.selection = 0;
    $scope.change = function(id) {

      // Loaded into $scope.selection
      //
      $http.get('http://cricscore-api.appspot.com/csa?id=' + $scope.selection).then(function(resp) {

        // Convert the description
        //
        var rS = resp.data[0].de;

        // Substitute 'for' for '/'
        //
        rS = rS.replace(/\//gi, " for ");
        
        // Substitute 'overs' for 'ov'
        //
        rS = rS.replace(/ ov /gi, " overs ");

        // Substituse 'overs' for 'ov,'
        //
        rS = rS.replace(/ ov,/gi, " overs, ");
        
        // 'for 0' goes to 'for none'
        //
        rS = rS.replace(/for 0/gi, "for none");
        
        // ' 0 for' goes to ' none for'
        //
        rS = rS.replace(/ 0 for/gi, " none for");

        // Let's convert some shortened counties
        //
        rS = rS.replace(/Aus /gi, "Australia ");
        rS = rS.replace(/Eng /gi, "England ");
        rS = rS.replace(/SL /gi, "Sri Lanka ");
        rS = rS.replace(/NZ /gi, "New Zealand ");
        rS = rS.replace(/SA /gi, "South Africa ");
        rS = rS.replace(/Ind /gi, "India ");
        rS = rS.replace(/Pak /gi, "Pakistan ");
        rS = rS.replace(/WI /gi, "West Indies ");
        rS = rS.replace(/Ned /gi, "Netherlands ");

        // Not out
        //
        rS = rS.replace(/\*/gi, " not out ");

        // Current score
        //
        $scope.currentScore = rS;
/*
        fetchService.getMatch($scope.selection).then(function(result) {
          alert(result);
          $scope.currentScore = result;
        });
*/

        // Always store the last fetch
        //
        window.lastFetchedMatch = $scope.currentScore;

        // Check to see if we play it straight away
        //
        if (window.talkState == "started") {

          // Invalidate timer, stop talking and refetch
          //
          if (window.timer != null) { 
            //voiceService.doSpeech("");
            window.timer.stop();
            window.timer = null;
          }

          console.log("Do speech again");
          voiceService.doSpeech();
        }
      });
    };

});


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
    window.localStorage.setItem('updateInterval', $scope.data.updateInterval);
  } 

  // Now always fetch
  //
  $scope.data.minRange = 30;
  $scope.data.maxRange = 600;
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
    } else {
      alert("Can't change accent to " + $scope.data.accent);
    }
    return window.localStorage.setItem('accent', $scope.data.accent);
  }

  // Always set the accentSelected value based on dropdown
  //
  $scope.changeAccent();
}]);

