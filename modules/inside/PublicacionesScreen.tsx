import * as React from 'react';
import { StyleSheet } from 'react-native';

import {
  Text,
  View,
} from '../../components/Elements';

export default function PublicacionesScreen({ ...props }) {
/*function getPublicaciones(){ 
  (global as any).firebase
      .database()
      .ref('users/');
}
getPublicaciones();*/
  return (
    <View style={styles.container}>
      <Text>Publicaciones</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', padding: 20 
  },
});