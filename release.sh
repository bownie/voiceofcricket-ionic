#!/bin/bash
#
# Release steps for Voice of Cricket
#

# remove old version
rm -f rm VoiceOfCricket.apk

# build
#
cordova build --release android

# sign
#
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $HOME/keystores/VoiceOfCricket.keystore $HOME/voiceofcricket-ionic/platforms/android/build/outputs/apk/android-release-unsigned.apk VoiceOfCricket

# zip and deliver
#
$HOME/Library/Android/sdk/build-tools/22.0.1/zipalign -v 4 /Users/richardbown/voiceofcricket-ionic/platforms/android/build/outputs/apk/android-release-unsigned.apk VoiceOfCricket.apk
