angular.module('starter.services', ['ngResource'])

.factory('cricketMatches', function ($resource) {
    return $resource('http://cricscore-api.appspot.com/csa');
});




//angular.module('voiceOfCricket').service('dataservice', [ '$http', function ($http) {
/*
.module.service('myVoiceOfCricketService', function () {

        // Base URL
        //
        var urlBase = 'http://cricscore-api.appspot.com/csa';

        // All matches
        //
        this.getMatches = function () {
            return $http.get(urlBase);
        };

        // Specific match
        //
        this.getMatch = function (id) {
            return $http.get(urlBase+ '/' + id);
        };

});

*/
