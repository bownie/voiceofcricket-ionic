angular.module('cricketMatches', [])

.controller('mainController', function($scope, $http) {
 $http.get('http://cricscore-api.appspot.com/csa').then(function(resp) {
    console.log('Success', resp);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
});
