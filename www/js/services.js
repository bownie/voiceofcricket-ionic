var module = angular.module('matchesServices', []);

module.factory('cricketMatches', function ($resource) {
    return $resource('http://cricscore-api.appspot.com/csa');
});

module.factory('LS', function($window, $rootScope) {
  return {
    setData: function(key, val) {
      $window.localStorage && $window.localStorage.setItem(key, val);
      return this;
    },
    getData: function(key) {
      return $window.localStorage && $window.localStorage.getItem(key);
    }
  };
});

