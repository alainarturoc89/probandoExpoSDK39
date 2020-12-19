import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

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

      }
      catch (e) { console.warn(e); }

      finally {

        setLoadingComplete(true);

        SplashScreen.hideAsync();

      }

    }

    loadResourcesAndDataAsync();

  }, []);

  return isLoadingComplete;
  
}
