import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, Button } from '../components/Elements';

export default function InitScreen({...props}) {
  console.log(props)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de inicio</Text>
      <Button title="Inicio" onPress={()=>{console.warn("Press")}}/>
      <Button title="Entrar" onPress={()=>props.navigation.navigate("Root")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});