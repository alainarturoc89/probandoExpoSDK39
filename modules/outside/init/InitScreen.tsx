import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { dimensions } from "../../../styles/base";

import {
  View, Text, Image, TouchableOpacity, TextInput, Ionicons
} from '../../../components/Elements';

export default function InitScreen({ ...props }) {
  const [showPass, onShowPass] = React.useState(false);
  const [user, onChangeUser] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  async function login() {
    if (false) {
      props.navigation.navigate("Inside", { screen: 'Inside', });
    } else {
      Alert.alert(
        "Upssss",
        "Ummmmm, qué pasa? no recuerdas la información que se solicita? jejeje, prueba una vez más y no me desiluciones...",
        [{ text: "Ok" }],
        { cancelable: true }
      );
    }
  }
  function help() {
    props.navigation.navigate("Common", { screen: 'Help', });
  }
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/2.jpg")}
        resizeMode="center" style={styles.image}>
      </Image>
      <View style={[{
        paddingHorizontal: 10,
        marginHorizontal: 10,
        backgroundColor: "#FFFFFF"
      }]}>
        <Text style={styles.text}>Usuario</Text>
        <TextInput
          placeholder="Cantidad de niños-fecha de casamiento firma... Ejemplo: 2-11022012"
          style={[{
            height: 50,
            borderRadius: 3,
            borderColor: 'gray',
            borderWidth: 0.5,
            marginBottom: 10
          }]}
          onChangeText={text => onChangeUser(text)}
          value={user} />
        <Text style={styles.text}>Contraseña</Text>
        <TextInput
          placeholder="Fecha de primera firma, fecha de mi cumple... Ejemplo: 20120321,12062012"
          secureTextEntry={showPass}
          style={[{
            height: 50,
            borderRadius: 3,
            borderColor: 'gray',
            borderWidth: 0.5,
            marginBottom: 10,
          }]}
          onChangeText={text => onChangePassword(text)}
          value={password} />
        <TouchableOpacity
          style={[{ padding: 10, backgroundColor: "#8603AD", marginTop: 5, borderRadius: 5 }]}
          onPress={() => login()}>
          <Text style={[{ textAlign: "center", color: "#fff", fontSize: 17, fontWeight: "bold" }]}>Autenticar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 10, alignItems: "center", marginTop: 15 }} onPress={() => help()}>
          <Ionicons name="ios-help-circle" size={60} color="#8603AD" />
        </TouchableOpacity>
      </View>
      <Image
        source={require("../../../assets/images/2.jpg")}
        resizeMode="contain" style={styles.image}>
      </Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: dimensions.fullWidth },
  text: { marginVertical: 5, color: "#F1111F", fontWeight: "bold", fontSize: 20 },
});