import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import * as firebase from 'firebase';

import { Audio } from 'expo-av';
const soundObject = new Audio.Sound();
soundObject.setOnPlaybackStatusUpdate(null);
soundObject.loadAsync(require('../assets/sound/ella_es_mi_todo.mp3'), { shouldPlay: false });

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        //Fuente
        await Font.loadAsync({
          ...Ionicons.font,
          'courgette': require('../assets/fonts/Courgette-Regular.ttf'),
          'notoSerif': require('../assets/fonts/Noto_Serif/NotoSerif-Regular.ttf'),
          'notoSerif-bold': require('../assets/fonts/Noto_Serif/NotoSerif-Bold.ttf'),
          'notoSerif-bold-italic': require('../assets/fonts/Noto_Serif/NotoSerif-BoldItalic.ttf'),
          'notoSerif-italic': require('../assets/fonts/Noto_Serif/NotoSerif-Italic.ttf'),
        });

        //Configuracion de firebase        
        firebase.initializeApp({
          apiKey: 'AIzaSyAGtjEe3SZyNbLqVTS9FOGHCfOc8sQkAPY',
          authDomain: 'probandoexposdk39.firebaseapp.com',
          databaseURL: 'https://probandoexposdk39.firebaseio.com',
          projectId: 'probandoexposdk39',
          storageBucket: 'probandoexposdk39.appspot.com',
          messagingSenderId: '535636779172',
          appId: '1:535636779172:android:e87a9144a7a547e53f4631'
        });
        global.firebase = firebase;

        global.soundObject = soundObject;
      }
      catch (e) {
        console.warn(e);
      }
      finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
