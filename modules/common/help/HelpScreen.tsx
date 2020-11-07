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
                <Text style={styles.text}>En esta sección se describe la app</Text>
            </View>}
            <TouchableOpacity activeOpacity={0} style={styles.viewLink} onPress={() => onChangeAutVisible(!autVisible)}>
                <Text style={styles.textLink}>Autenticación</Text>
            </TouchableOpacity>
            {(autVisible) && <View style={styles.view}>
                <Text style={styles.text}>En esta sección se describe el proceso de autenticación</Text>
            </View>}
            <TouchableOpacity activeOpacity={0} style={styles.viewLink} onPress={() => onChangeFunVisible(!funVisible)}>
                <Text style={styles.textLink}>Funcionamiento</Text>
            </TouchableOpacity>
            {(funVisible) && <View style={styles.view}>
                <Text style={styles.text}>En esta sección se describe cómo funciona la app</Text>
            </View>}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F6C3', padding: 20 },
    textIntro: { fontSize: 19, fontWeight: "bold", color: "#FF3393", marginTop: 10, marginBottom: 25 },
    viewLink: { padding: 10, borderRadius: 5, marginBottom: 15, backgroundColor: "#FF3393" },
    textLink: { color: "#C3F6F5", fontSize: 17, fontWeight: "bold" },
    view: { padding: 5, marginBottom: 10, borderWidth: 1, borderRadius: 5, borderColor: "#6A0DC7" },
    text: { fontWeight: "800", fontSize: 15, marginHorizontal: 10 },
});