import * as React from 'react';
import { StyleSheet } from 'react-native';

import {
  Text,
  View,
  Button
} from '../../components/Elements';

export default function AjustesScreen({ ...props }) {

  return (
    <View style={styles.container}>
      <Text>Ajustes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', padding: 20 
  },
});