#!/bin/bash
#
# Release steps for Voice of Cricket
#

cordova build --release android

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $HOME/keystores/VoiceOfCricket.keystore $HOME/voiceofcricket-ionic/platforms/android/build/outputs/apk/android-release-unsigned.apk VoiceOfCricket

$HOME/Library/Android/sdk/build-tools/22.0.1/zipalign -v 4 /Users/richardbown/voiceofcricket-ionic/platforms/android/build/outputs/apk/android-release-unsigned.apk VoiceOfCricket.apk
