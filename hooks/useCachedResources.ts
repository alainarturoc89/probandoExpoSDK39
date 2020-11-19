import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import i18n from '../languages';
//import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
const soundObject = new Audio.Sound();

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        //Lenguaje
        (global as any).language = i18n;
        //Fuente
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
        //Fichero de configuracion
        /*    let { exists } = await FileSystem.getInfoAsync(FileSystem.documentDirectory + "/config.json");
            if (exists) {
              FileSystem.readAsStringAsync(FileSystem.documentDirectory + "/config.json")
                .then(conf => {
                  let config = JSON.parse(conf);
                  (global as any).config = config;
                })
            } else {
              let config = {
                user: { user: "123", password: "123" },
                isLoggedIn: true
              };
              await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "/config.json", JSON.stringify(config))
                .then(() => {
                  (global as any).confif = config;
                })
            }
            (global as any).changeConfig = async (config: any) => {
              await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "/config.json", JSON.stringify(config))
            }
            */
        //Configuracion de firebase
        
        (global as any).firebaseConfig =  {
          apiKey: 'AIzaSyAGtjEe3SZyNbLqVTS9FOGHCfOc8sQkAPY',
          authDomain: 'probandoexposdk39.firebaseapp.com',
          databaseURL: 'https://probandoexposdk39.firebaseio.com',
          projectId: 'probandoexposdk39',
          storageBucket: 'probandoexposdk39.appspot.com',
          messagingSenderId: '535636779172',
          appId: '1:535636779172:android:e87a9144a7a547e53f4631'
        };

        //Cancion de inicio
        soundObject.setOnPlaybackStatusUpdate(null);
        await soundObject.loadAsync(require('../assets/sound/ella_es_mi_todo.mp3'), { shouldPlay: true });
        (global as any).soundObject = soundObject;

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
