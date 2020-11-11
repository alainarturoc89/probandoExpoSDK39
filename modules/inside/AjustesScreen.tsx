import * as React from 'react';
import { StyleSheet } from 'react-native';

import {
  ScrollView,
  TouchableOpacity,
  Text,
} from '../../components/Elements';

export default function AjustesScreen({ ...props }) {
  let close = () => {
    let config = (global as any).config;
    config.isLoggedIn = false;
    (global as any).changeConfig(config);
    props.navigation.navigate("Outside");
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textIntro}>En este apartado podrás llevar a cabo la configuración de la aplicación</Text>
      <TouchableOpacity style={styles.viewLink} onPress={() => close()}>
        <Text style={styles.textLink}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingVertical: 20, paddingHorizontal: 10 },
  textIntro: { fontSize: 19, fontWeight: "bold", color: "#8603AD", marginTop: 10, marginBottom: 25 },
  viewLink: { padding: 10, borderRadius: 5, backgroundColor: "#8603AD" },
  textLink: { color: "#fff", fontSize: 17, fontWeight: "bold" },
});