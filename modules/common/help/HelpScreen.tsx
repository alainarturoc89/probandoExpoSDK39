import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView, Text, View, TouchableOpacity } from "../../../components/Elements";

export default function HelpScreen({ ...props }) {

    const [desVisible, onChangeDesVisible] = React.useState(false);
    const [autVisible, onChangeAutVisible] = React.useState(false);
    const [funVisible, onChangeFunVisible] = React.useState(false);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.textIntro}>
                En este apartado encontrarás la ayuda brindada por el creador de esta aplicación
            </Text>
            <TouchableOpacity style={styles.viewLink} onPress={() => onChangeDesVisible(!desVisible)}>
                <Text style={styles.textLink}>Descripción de la app</Text>
            </TouchableOpacity>
            {(desVisible) && <View style={styles.view}>
                <Text style={styles.text}>Esta aplicación fue creada con el objetivo de demostrarle a mi esposa cuanto la amo.</Text>
            </View>}
            <TouchableOpacity activeOpacity={0} style={styles.viewLink} onPress={() => onChangeAutVisible(!autVisible)}>
                <Text style={styles.textLink}>Autenticación</Text>
            </TouchableOpacity>
            {(autVisible) && <View style={styles.view}>
                <Text style={[styles.text,{fontWeight:"bold"}]}>En esta sección se describe el proceso de autenticación:</Text>
                <Text style={[styles.text,{marginTop:5}]}>El campo usuario es la cantidad de niños que quieres tener-fecha de casamiento... Ejemplo: 2-11022012</Text>
                <Text style={[styles.text,{marginTop:5}]}>El campo contraseña es la fecha de primera firma,fecha de mi cumple... Ejemplo: 20120321,12062012</Text>
            </View>}
            <TouchableOpacity activeOpacity={0} style={styles.viewLink} onPress={() => onChangeFunVisible(!funVisible)}>
                <Text style={styles.textLink}>Funcionamiento</Text>
            </TouchableOpacity>
            {(funVisible) && <View style={styles.view}>
                <Text style={styles.text}>Esta aplicación vrinda una series de historias vividas por nosotros.</Text>
                <Text style={[styles.text,{marginTop:5}]}>Estas historias pueden estar online o descargadas en la misma aplicación.</Text>
            </View>}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingVertical: 20, paddingHorizontal: 10 },
    textIntro: { fontSize: 19, fontWeight: "bold", color: "#8603AD", marginTop: 10, marginBottom: 25 },
    viewLink: { padding: 10, borderBottomColor: "#fff", borderWidth: 1, backgroundColor: "#8603AD" },
    textLink: { color: "#fff", fontSize: 17, fontWeight: "bold" },
    view: { padding: 5, marginBottom: 10, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderBottomRightRadius: 5, borderBottomLeftRadius: 5, borderColor: "#8603AD" },
    text: { fontWeight: "800", fontSize: 15, marginHorizontal: 10 },
});