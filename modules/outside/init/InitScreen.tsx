import * as React from 'react';
import { StyleSheet, Alert, Keyboard } from 'react-native';
import { dimensions } from "../../../styles/base";
import {
  View, Text, Image, TouchableOpacity, TextInput, Ionicons, KeyboardAvoidingView, TouchableWithoutFeedback
} from '../../../components/Elements';

export default function InitScreen({ ...props }) {

  const [iosEye, onChangeIosEye] = React.useState("ios-eye-off");
  const [showPass, onShowPass] = React.useState(false);
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [sound, onChangeSound] = React.useState(false);

  if (!sound) {
    global.soundObject.playAsync();
    onChangeSound(true);
  }

  async function login() {
    if (email !== "" && password !== "") {
      global.firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          if (user !== null) {
            global.soundObject.stopAsync();
            onChangeEmail("");
            onChangePassword("");
            onShowPass(false);
            onChangeIosEye("ios-eye-off");
            onChangeSound(false);
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
    <KeyboardAvoidingView style={styles.container} behavior='height'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={{ flexDirection: "row", marginTop: 25, marginBottom: 20 }}>
            <Text style={[styles.textIntro, { flex: 0.99 }]}>
              Para identificar el usuario y la contraseña visita la ayuda
            </Text>
            <TouchableOpacity style={{}} onPress={() => help()}>
              <Ionicons name="ios-help-circle" size={60} color="#CD0D0D" />
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../../assets/images/1.png")}
            resizeMode="stretch" style={styles.image}>
          </Image>
          <TextInput
            placeholder="Correo electrónico..."
            autoCompleteType="email"
            autoCorrect={true}
            autoFocus={true}
            keyboardType="email-address"
            style={[{
              height: 50,
              borderRadius: 3,
              borderColor: 'gray',
              borderWidth: 0.5,
              marginBottom: 10,
              paddingHorizontal: 5,
              fontFamily: 'courgette',
              fontSize: 17
            }]}
            onChangeText={text => onChangeEmail(text)}
            value={email} />
          <View style={{ alignItems: "center", flexDirection: "row", borderRadius: 3, borderColor: 'gray', borderWidth: 0.5, marginBottom: 10, marginTop: 20 }}>
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
              <Ionicons name={iosEye} size={32} color="#CD0D0D" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[{ padding: 10, backgroundColor: "#CD0D0D", marginTop: 5, borderRadius: 5, marginHorizontal: 110 }]}
            onPress={() => login()}>
            <Text style={[{ textAlign: "center", color: "#fff", fontSize: 20, fontFamily: 'courgette' }]}>Autenticar</Text>
          </TouchableOpacity>
          <Image
            source={require("../../../assets/images/1.png")}
            resizeMode="stretch" style={[styles.image]}>
          </Image>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, backgroundColor: "#fff" },
  textIntro: { fontSize: 23, color: "black", textAlign: "left", fontFamily: 'courgette' },
  image: { marginVertical: 40, width: dimensions.fullWidth - 30, height: 100, },
});