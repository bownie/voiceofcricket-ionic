var module = angular.module('matchesServices', ['ngResource']);

module.factory('cricketMatches', function ($resource) {

    console.log("DOING IT");
    return "DOING IT";//$resource('http://cricscore-api.appspot.com/csa');
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

module.service('fetchMatchService', function($scope) {
  console.log("Called fetchMatchService");
});


// Interpret a score string into something we can say correctly - need a promise on this
//
module.factory('fetchService', function($resource, $http, $rootScope, $q) {

  
  var getMatch = function(selection) {

      // Loaded into $scope.selection
      //
      return $http.get('http://xyglo.com:1337/cricscore-api.appspot.com/csa?id=' + selection).then(function(resp) {

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

        // Always store the last fetch
        //
        //window.lastFetchedMatch = rS;
        //$rootScope.currentScore = rS;
        //$rootScope.apply();
        
        //alert(rS);
        return(rS);
      });
    }

    return { getMatch: getMatch };
});



// Read out the score
//
module.factory('voiceService', function($resource, $rootScope) {

  return {
    doSpeech : function() {
      if ($rootScope.talkState == "started" ) {

        // If we have a match to talk about
        //
        if ($rootScope.currentScore != "") {
            if (window.isWinPhoneApp) {
                console.log("Speaking on WinPhoneApp");

                TTS.speak({
                  text: $rootScope.currentScore,
                  locale: window.accentSelected,
                  rate: 1.0
                }, function () {
                    console.log('Speaking on WinPhoneApp');
                }, function (reason) {
                    console.log('Failed to speak on WinPhoneApp =' + reason);
                });

            } else if (window.isAndroid || window.isiOS) {
            TTS.speak({
              text: $rootScope.currentScore,
              locale: window.accentSelected,
              rate: 1.0
            }, function () {
               console.log('Speaking on Android');
            }, function (reason) {
               console.log('Failed to speak on Android');
            });
          // Else we try native synthesis platform agnostic
          //
          } else if ('speechSynthesis' in window && window.nativeSpeechSynthesisSupport() == true) {
            var msg = new SpeechSynthesisUtterance();
            msg.lang = window.accentSelected;
            msg.volume = 1.0;
            msg.rate = 1.0;
            msg.text = $rootScope.currentScore;
            msg.onend = function(event) { console.log('Finished in ' + event.elapsedTime + ' seconds.'); };
            speechSynthesis.speak(msg);


            console.log("Native speech");

          } else { // Fallback scenario is to use the API

/*
              var fallbackSpeechSynthesis = window.getSpeechSynthesis();
              var fallbackSpeechSynthesisUtterance = window.getSpeechSynthesisUtterance();
              var u = new fallbackSpeechSynthesisUtterance(window.lastFetchedMatch);
              u.lang = window.accentSelected;
              u.volume = 1.0;
              u.rate = 1.0;
              u.onend = function(event) { console.log('Finished in ' + event.elapsedTime + ' seconds.'); };
              fallbackSpeechSynthesis.speak(u);
  
              console.log("Fallback speech");
*/
              alert("Speech synthesis is not available");
            }
          }
        } else {
  
        // For TTS say nothing
          //
          if (window.isWinPhoneApp) {
              console.log("Stopping speaking on WinPhoneApp");

              TTS.speak({
                  text: "",
                  locale: window.accentSelected,
                  rate: 1.0
              }, function () {
                  console.log('Speaking on WinPhoneApp');
              }, function (reason) {
                  console.log('Failed to speak on WinPhoneApp with reason ' + reason);
              });

          } else if (window.isAndroid || window.isiOS ) {

            TTS.speak({
                text: "",
                locale: window.accentSelected,
                rate: 1.0
            }, function () {
               console.log('Speaking on Android');
            }, function (reason) {
               console.log('Failed to speak on Android');
          });
  
        } else {
          var fallbackSpeechSynthesis = window.getSpeechSynthesis();
          fallbackSpeechSynthesis.cancel();
        }
      }
    }
  }
});
