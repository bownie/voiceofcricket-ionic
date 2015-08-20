// Controlling to fetch matches from from the cricscore API
//
angular.module('matchesController', [])
    .controller('MatchesController', function ($scope) {

    $scope.matchId = 0;
    $scope.changeMatch = function(id) {
        $scope.matchId = id;
        console("Match id = " + id);
    };

});
