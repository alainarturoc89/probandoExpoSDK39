import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { View, Text, Image, TouchableOpacity, TextInput, Ionicons, ScrollView, ActivityIndicator } from '../../components/Elements';
import { registerForPushNotificationsAsync as t } from "../../hooks/useNotifications";
import { firebase } from "../../hooks/useFirebase";

export default function InitScreen({ ...props }) {

  const [iosEye, onChangeIosEye] = React.useState("ios-eye-off");

  const [showPass, onShowPass] = React.useState(false);

  const [email, onChangeEmail] = React.useState('');

  const [password, onChangePassword] = React.useState('');

  const [loading, changeLoading] = React.useState(false);

  async function authenticate() {

    if (email !== "" && password !== "") {

      changeLoading(true);

      firebase.auth().signInWithEmailAndPassword(email, password)

        .then((user) => {

          if (user !== null) {

            return login(user.user);

          }

          else {

            changeLoading(false);

          }

        })

        .catch((error) => {

          changeLoading(false);

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

  async function login(user: any) {

    const token = await t();

    await firebase.database().ref('users/' + user.uid).set({

      token

    });

    global.user = user;

    onChangeEmail("");

    onChangePassword("");

    onShowPass(false);

    onChangeIosEye("ios-eye-off");

    changeLoading(false);

    props.navigation.navigate("Inside");
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

    loading

      ? <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

        <ActivityIndicator size="large" color="#c96eb7" />

      </View>

      : <ScrollView style={styles.container}>

        <View style={{ alignItems: "center", marginTop: 5 }}>

          <Image
            source={require("../../assets/images/alain_lisbet.png")}
            resizeMode="stretch" style={[styles.logo]}>
          </Image>

        </View>

        <Text style={[styles.text]}>Correo electrónico *</Text>

        <TextInput
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

        <Text style={[styles.text, { marginTop: 15 }]}>Contraseña *</Text>

        <View style={{ alignItems: "center", flexDirection: "row", borderRadius: 3, borderColor: '#c96eb7', borderWidth: 0.5 }}>

          <TextInput
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

            <Ionicons name={iosEye} size={35} color="#c96eb7" />

          </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={[{ padding: 10, backgroundColor: "#c96eb7", marginTop: 15, borderRadius: 5, marginHorizontal: 110 }]}
          onPress={() => authenticate()}>

          <Text style={[{ textAlign: "center", color: "#fff", fontSize: 20, fontFamily: 'courgette' }]}>Autenticar</Text>

        </TouchableOpacity>

        <View style={{ marginTop: 20, alignItems: "center" }}>

          <Text style={styles.text_ayuda}>Para identificar usuario y contraseña por favor consulte la ayuda de la aplicación.</Text>

          <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={() => help()}>

            <Ionicons name="ios-help-circle" size={60} color="#c96eb7" />

          </TouchableOpacity>

        </View>

      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, backgroundColor: "#fff" },
  text: { fontFamily: "courgette", fontSize: 18 },
  logo: { width: 230, height: 230 },
  text_ayuda: { fontFamily: 'courgette', fontSize: 17, textAlign: "center" }
});