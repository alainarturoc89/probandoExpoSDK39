import * as React from 'react';
import { StyleSheet } from 'react-native';

import {
  Text,
  View,
  Button
} from '../../components/Elements';

export default function PublicacionesScreen({ ...props }) {

  return (
    <View style={styles.container}>
      <Text>Publicaciones</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#F5F6C3', padding: 20 
  },
});