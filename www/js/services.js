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


// Interpret a score string into something we can say correctly
//
module.factory('fetchService', function($resource) {
  return {
    getMatch : function() {
      console.log("Do something");
    }
  }
});



// Read out the score
//
module.factory('voiceService', function($resource) {

  return {
     doSpeech : function() {
      if (window.talkState == "started" ) {

        // If we have a match to talk about
        //
        if (window.lastFetchedMatch != "") {
          if (isAndroid || isiOS || isWinApp) {
            TTS.speak({
              text: window.lastFetchedMatch,
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
            msg.text = window.lastFetchedMatch;
            msg.onend = function(event) { console.log('Finished in ' + event.elapsedTime + ' seconds.'); };
            speechSynthesis.speak(msg);


            console.log("Native speech");

          } else { // Fallback scenario is to use the API

              var fallbackSpeechSynthesis = window.getSpeechSynthesis();
              var fallbackSpeechSynthesisUtterance = window.getSpeechSynthesisUtterance();
              var u = new fallbackSpeechSynthesisUtterance(window.lastFetchedMatch);
              u.lang = window.accentSelected;
              u.volume = 1.0;
              u.rate = 1.0;
              u.onend = function(event) { console.log('Finished in ' + event.elapsedTime + ' seconds.'); };
              fallbackSpeechSynthesis.speak(u);
  
              console.log("Fallback speech");
            }
          }
        } else {
  
        // For TTS say nothing
        //
        if (isAndroid || isiOS || isWinApp) {
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
