// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('voiceOfCricket', ['ionic', 'matchesController'])

// Cricscore api access
//
/*
.controller('MatchesController', function($scope, $http) {
  $scope.selectedMatch = 1;
  console.log('Selected Option = ' + $scope.selectedMatch);

 $http.get('http://cricscore-api.appspot.com/csa').then(function(resp) {

    // For JSON responses, resp.data contains the result
    //
    console.log('Success', resp);
    $scope.matches = resp.data;


  }, function(err) {

    // err.status will contain the status code
    //
    console.error('ERR', err);
  })

})
*/


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

