import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { dimensions } from "../../../styles/base";
import form from "../../../styles/form";

import {
  View, Text, LinearGradient, Image, TouchableOpacity, Modal, TextInput, Ionicons
} from '../../../components/Elements';

export default function InitScreen({ ...props }) {
  const [modalVisible, onChangeModalVisible] = React.useState(false);
  const [user, onChangeUser] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  async function login() {
    if (true) {
      onChangeModalVisible(false);
      props.navigation.navigate("Inside", { screen: 'Inside', });
    } else {
      console.warn("No autenticado");
    }
  }
  function help() {
    onChangeModalVisible(false);
    props.navigation.navigate("Common", { screen: 'Help', });
  }
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => onChangeModalVisible(false)}>
        <View style={[styles.modal]}>
          <View style={[form.container, { borderWidth: 1.5, borderColor: "#FF3393", borderRadius: 8 }]}>
            <TouchableOpacity style={{ flexDirection: "row-reverse" }} onPress={() => help()}>
              <Ionicons name="ios-help-circle" size={32} color="#FF3393" />
            </TouchableOpacity>
            <Text style={styles.text}>Usuario</Text>
            <TextInput
              style={[form.input]}
              onChangeText={text => onChangeUser(text)}
              value={user} />
            <Text style={styles.text}>Contraseña</Text>
            <TextInput
              secureTextEntry
              style={[form.input]}
              onChangeText={text => onChangePassword(text)}
              value={password} />
            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.touchableOpacity, styles.itemFooter, { backgroundColor: "#FF3393" }]}
                onPress={() => login()}              >
                <Text style={[styles.textButton, { flex: 1, textAlign: "center" }]}>Autenticar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.touchableOpacity, styles.itemFooter, { backgroundColor: "#FF3393" }]}
                onPress={() => onChangeModalVisible(false)}>
                <Text style={[styles.textButton, { flex: 1, textAlign: "center" }]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <LinearGradient colors={['#F5F6C3', "#F6C6C3", '#F5F6C3']}>
        <Image
          source={require("../../../assets/images/portada.jpg")}
          resizeMode="center" style={styles.image}>
        </Image>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.touchableOpacity, styles.itemFooter]}
            onPress={() => onChangeModalVisible(true)}>
            <View style={{ flex: 0.3 }}><Ionicons name="ios-contact" size={32} color="#C3F6F5" /></View>
            <View style={{ flex: 0.7 }}><Text style={styles.textButton}>Autenticar</Text></View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.touchableOpacity, styles.itemFooter]}
            onPress={() => help()}>
            <View style={{ flex: 0.3 }}><Ionicons name="ios-help-circle" size={32} color="#C3F6F5" /></View>
            <View style={{ flex: 0.7 }}><Text style={styles.textButton}>Ayuda</Text></View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: dimensions.fullHeight },
  image: { width: dimensions.fullWidth },
  touchableOpacity: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "#FF3393",
    alignItems: "center",
    flexDirection: "row"
  },
  text: { marginVertical: 5, color: "#FF3393", fontWeight: "bold" },
  textButton: { color: "#C3F6F5", fontWeight: "bold" },
  modal: { flex: 1, alignContent: "center", justifyContent: "center" },
  footer: { height: 50, flexDirection: "row" },
  itemFooter: { marginBottom: 10, flex: 0.5 }
});