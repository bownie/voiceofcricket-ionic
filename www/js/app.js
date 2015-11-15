// Voice of Cricket app
// 
var app = angular.module('voiceOfCricket', ['ionic', 'matchesController'])

app.factory('LS', function($window, $rootScope) {
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


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

/*
    if(window.AdMob) {

      var admobid = {};
      if( /(android)/i.test(navigator.userAgent) ) { // for android
          admobid = {
              banner: 'ca-app-pub-1421059894749418/2370395482', // or DFP format "/6253334/dfp_example_ad"
              interstitial: 'ca-app-pub-1421059894749418/2370395482'
          };
      } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
          admobid = {
              banner: 'ca-app-pub-1421059894749418/8416929089', // or DFP format "/6253334/dfp_example_ad"
              interstitial: 'ca-app-pub-1421059894749418/8416929089'
          };
      } else { // for windows phone
          admobid = {
              banner: 'ca-app-pub-1421059894749418/8416929089', // or DFP format "/6253334/dfp_example_ad"
              interstitial: 'ca-app-pub-1421059894749418/8416929089'
          };
      }

      // Launch the banner
      //
      AdMob.createBanner( {
        adId: admobid.banner, 
        position: AdMob.AD_POSITION.TOP_CENTER, 
        autoShow: true } );
    }
*/

    if (isAndroid) {
      var customLocale = {};
      customLocale.title = "Rate Voice of Cricket";
      customLocale.message = "Do you love the Voice of Cricket? Then please rate it! Many thanks for your support";
      customLocale.cancelButtonLabel = "No, Thanks";
      customLocale.laterButtonLabel = "Remind Me Later";
      customLocale.rateButtonLabel = "Rate It Now";

      AppRate.preferences.customLocale = customLocale;
      AppRate.preferences.usesUntilPrompt = 1;
      AppRate.preferences.promptAgainForEachNewVersion = true;
      AppRate.preferences.useLanguage = 'en';
      AppRate.preferences.openStoreInApp = false;
      //AppRate.preferences.storeAppURL.ios = '1020598694';
      AppRate.preferences.storeAppURL.android = 'market://details?id=com.ionicframework.voiceofcricketionic875888';

      //AppRate.preferences.callbacks.onButtonClicked = function(buttonId) {
        //console.log("On button clicked " + buttonId);
        //AppRate.navigateToAppStore();
      //}


      AppRate.promptForRating(true);
    }

  });
})

