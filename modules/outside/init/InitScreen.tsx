import * as React from 'react';
import { StyleSheet, Alert, Keyboard } from 'react-native';
import { dimensions } from "../../../styles/base";
import {
  View, Text, Image, TouchableOpacity, TextInput, Ionicons, KeyboardAvoidingView, TouchableWithoutFeedback
} from '../../../components/Elements';

export default function InitScreen({ ...props }) {
  const [iosEye, onChangeIosEye] = React.useState("ios-eye");
  const [showPass, onShowPass] = React.useState(true);
  const [user, onChangeUser] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  async function login() {
    if (user !== "" && password !== "") {
      global.firebase.database().ref('/users/' + user).once('value')
        .then(function (snapshot) {
          if (snapshot && password === snapshot.val().password) {
            onChangeUser("");
            onChangePassword("");
            props.navigation.navigate("Inside");
          } else {
            Alert.alert(
              "Ummmmm",
              "Qué pasa, no recuerdas la información que se solicita? jejeje, prueba una vez más y no me desiluciones...",
              [{ text: "Cerrar" }],
              { cancelable: true }
            );
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      Alert.alert(
        "Importante",
        "Campo de usuario o contrasena vacios...",
        [{ text: "Cerrar" }],
        { cancelable: true }
      );
    }
  }
  function help() {
    props.navigation.navigate("Common", { screen: 'Help', });
  }
  function showHidePass() {
    if (showPass)
      onChangeIosEye("ios-eye-off");
    else
      onChangeIosEye("ios-eye");
    onShowPass(!showPass);
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior='height'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={{ flexDirection: "row", marginTop: 25, marginBottom: 20 }}>
            <Text style={[styles.textIntro, { flex: 0.99 }]}>
              Para identificar el usuario y la contraseña visitar la ayuda
            </Text>
            <TouchableOpacity style={{}} onPress={() => help()}>
              <Ionicons name="ios-help-circle" size={60} color="#9F4ADE" />
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../../assets/images/1.png")}
            resizeMode="stretch" style={styles.image}>
          </Image>
          <TextInput
            placeholder="Usuario..."
            style={[{
              height: 50,
              borderRadius: 3,
              borderColor: 'gray',
              borderWidth: 0.5,
              marginBottom: 10,
              paddingHorizontal: 5
            }]}
            onChangeText={text => onChangeUser(text)}
            value={user} />
          <View style={{ alignItems: "center", flexDirection: "row", borderRadius: 3, borderColor: 'gray', borderWidth: 0.5, marginBottom: 10, marginTop: 20 }}>
            <TextInput
              placeholder="Contraseña..."
              secureTextEntry={showPass}
              style={[{
                height: 50,
                paddingHorizontal: 5,
                flex: 0.99
              }]}
              onChangeText={text => onChangePassword(text)}
              value={password} />
            <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => { showHidePass() }}>
              <Ionicons name={iosEye} size={32} color="#9F4ADE" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[{ padding: 10, backgroundColor: "#9F4ADE", marginTop: 5, borderRadius: 5, marginHorizontal: 125 }]}
            onPress={() => login()}>
            <Text style={[{ textAlign: "center", color: "#fff", fontSize: 17, fontWeight: "bold" }]}>Autenticar</Text>
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
  textIntro: { fontSize: 19, fontWeight: "bold", color: "#9F4ADE", textAlign: "left" },
  image: { marginVertical: 40, width: dimensions.fullWidth - 30, height: 100, },
  text: { marginVertical: 5, color: "#9F4ADE", fontWeight: "bold", fontSize: 20 },
});