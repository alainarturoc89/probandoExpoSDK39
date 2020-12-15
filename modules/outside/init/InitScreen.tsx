import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import {
  View, Text, Image, TouchableOpacity, TextInput, Ionicons
} from '../../../components/Elements';

export default function InitScreen({ ...props }) {

  const [iosEye, onChangeIosEye] = React.useState("ios-eye-off");
  const [showPass, onShowPass] = React.useState(false);
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  async function login() {
    if (email !== "" && password !== "") {
      global.firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          if (user !== null) {
            global.user = user.user;
            onChangeEmail("");
            onChangePassword("");
            onShowPass(false);
            onChangeIosEye("ios-eye-off");
            props.navigation.navigate("Inside");
          }
        })
        .catch((error) => {
          Alert.alert(
            "Ummmmm",
            "Qué pasa, no recuerdas la información que se solicita? jejeje, prueba una vez más y no me desiluciones...",
            [{ text: "Cerrar" }],
            { cancelable: true }
          );
        });
    } else {
      Alert.alert(
        "Importante",
        "Campo de usuario o contraseña vacios...",
        [{ text: "Cerrar" }],
        { cancelable: true }
      );
    }
  }

  function help() {
    props.navigation.navigate("Common", { screen: 'Help', });
  }

  function showHidePass() {
    if (showPass) {
      onChangeIosEye("ios-eye-off");
    }
    else {
      onChangeIosEye("ios-eye");
    }
    onShowPass(!showPass);
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginTop: 15 }}>
        <Image
          source={require("../../../assets/images/alain_lisbet.png")}
          resizeMode="stretch" style={[styles.logo]}>
        </Image>
      </View>

      <TextInput
        placeholder="Correo electrónico..."
        keyboardType="email-address"
        style={[{
          height: 50,
          borderRadius: 3,
          borderColor: '#c96eb7',
          borderWidth: 0.5,
          paddingHorizontal: 5,
          fontFamily: 'courgette',
          fontSize: 17
        }]}
        onChangeText={text => onChangeEmail(text)}
        value={email} />
      { <View style={{ alignItems: "center", flexDirection: "row", borderRadius: 3, borderColor: '#c96eb7', borderWidth: 0.5, marginBottom: 10, marginTop: 30 }}>
        <TextInput
          placeholder="Contraseña..."
          secureTextEntry={!showPass}
          style={[{
            height: 50,
            paddingHorizontal: 5,
            flex: 0.99,
            fontFamily: 'courgette',
            fontSize: 17
          }]}
          onChangeText={text => onChangePassword(text)}
          value={password} />
        <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => { showHidePass() }}>
          <Ionicons name={iosEye} size={32} color="#c96eb7" />
        </TouchableOpacity>
      </View>}
      <TouchableOpacity
        style={[{ padding: 10, backgroundColor: "#c96eb7", marginTop: 15, borderRadius: 5, marginHorizontal: 110 }]}
        onPress={() => login()}>
        <Text style={[{ textAlign: "center", color: "#fff", fontSize: 20, fontFamily: 'courgette' }]}>Autenticar</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 25, alignItems: "center" }}>
        <Text style={styles.text_ayuda}>Para identificar usuario y contraseña por favor consulte la ayuda de la aplicación.</Text>
        <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={() => help()}>
          <Ionicons name="ios-help-circle" size={60} color="#c96eb7" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, backgroundColor: "#fff" },
  logo: { width: 270, height: 270, marginBottom: 20 },
  text_ayuda: { fontFamily: 'courgette', fontSize: 17, textAlign: "center" }
});