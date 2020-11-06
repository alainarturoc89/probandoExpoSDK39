import * as React from 'react';
import { StyleSheet } from 'react-native';

import {
  View,
  Text,
  LinearGradient
} from '../../../components/Elements';

export default function InitScreen() {

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['red', 'yellow', 'green']}
        style={styles.linearGradient}
      >
        <Text style={styles.title}>{(global as any).language.t("modules.outside.init.module-title")}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});