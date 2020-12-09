import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView, Text, View, TouchableOpacity } from "../../../components/Elements";

export default function HelpScreen({ ...props }) {

    const [desVisible, onChangeDesVisible] = React.useState(true);
    const [autVisible, onChangeAutVisible] = React.useState(true);
    const [reqVisible, onChangeReqVisible] = React.useState(true);
    const [funVisible, onChangeFunVisible] = React.useState(true);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.textIntro}>
                En este apartado encontrarás la ayuda brindada por el creador de esta aplicación
            </Text>
            <TouchableOpacity style={styles.viewLink} onPress={() => onChangeDesVisible(!desVisible)}>
                <Text style={styles.textLink}>Descripción de la app</Text>
            </TouchableOpacity>
            {(desVisible) && <View style={styles.view}>
                <Text style={styles.text}>Esta aplicación fue creada con el objetivo de demostrarle a mi esposa cuanto la amo. Aunque creería que no debería de hacerlo, ya que ella es una mala mujer, mala hembra y muy muy tóxica. Jejeje, na es en broma, es la mejor esposa de este mundo.</Text>
            </View>}
            <TouchableOpacity activeOpacity={0} style={styles.viewLink} onPress={() => onChangeAutVisible(!autVisible)}>
                <Text style={styles.textLink}>Autenticación</Text>
            </TouchableOpacity>
            {(autVisible) && <View style={styles.view}>
                <Text style={[styles.text, { fontWeight: "bold" }]}>Hola Lis, si es la primera vez que usas esta apk o simplemente no recuerdas cúal es tu usuario o tu contraseña te invito a que continues leyendo.</Text>
                <Text style={[styles.text, {}]}>En esta sección se describe el proceso de autenticación:</Text>
                <Text style={[styles.text, { marginTop: 5, fontWeight: "bold" }]}>El campo usuario de mi mala mujer es la cantidad de niños que quiere tener-fecha de nuesto casamiento... Ejemplo: 2-11022012</Text>
                <Text style={[styles.text, { marginTop: 5, fontWeight: "bold" }]}>El campo contraseña de mi tóxica esposa es la fecha de primera nuestra firma,fecha de mi cumple... Ejemplo: 20120321,12062012</Text>
                <Text style={[styles.text, { marginTop: 5, }]}>En una próxima actualización (si te lo ganas) te agregaré la funcionalidad de poder modificar el usuario y la contraseña, mientras tanto te toca usar lo que te he definido.</Text>
            </View>}
            <TouchableOpacity activeOpacity={0} style={styles.viewLink} onPress={() => onChangeReqVisible(!reqVisible)}>
                <Text style={styles.textLink}>Requerimientos</Text>
            </TouchableOpacity>
            {(reqVisible) && <View style={styles.view}>
                <Text style={styles.text}>Pues a la verdad que no se necesita de mucho para poder usar la aplicación:</Text>
                <Text style={[styles.text, { marginTop: 5, fontWeight: "bold" }]}>- Tener creado un usuario (Los usuarios los creo yo).</Text>
                <Text style={[styles.text, { marginTop: 5, fontWeight: "bold" }]}>- Conexión a internet para realizar la autenticación, obtener y crear publicaciones.</Text>
                <Text style={[styles.text, { marginTop: 5 }]}>Y ya eso sería todo, ya lo otro es tener deseo de usarla.</Text>
            </View>}
            <TouchableOpacity activeOpacity={0} style={styles.viewLink} onPress={() => onChangeFunVisible(!funVisible)}>
                <Text style={styles.textLink}>Funcionamiento</Text>
            </TouchableOpacity>
            {(funVisible) && <View style={[styles.view, { marginBottom: 30 }]}>
                <Text style={styles.text}>El funcionamiento de la aplicación es bastante simple. La cree con el propósito de publicar nuestras vivencias, podrás ponerle un título, una descripción y si lo deseas le puedes agregar imágenes. Además podrías utilizarla como un espacio para compartir cosas que quisieras dedicarme o simplemente hacérmelas saber.</Text>
            </View>}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingVertical: 20, paddingHorizontal: 10 },
    textIntro: { fontSize: 19, fontWeight: "bold", color: "#9F4ADE", marginTop: 10, marginBottom: 25 },
    viewLink: { padding: 10, borderBottomColor: "#fff", borderWidth: 1, backgroundColor: "#9F4ADE" },
    textLink: { color: "#fff", fontSize: 17, fontWeight: "bold" },
    view: { padding: 5, marginBottom: 10, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderBottomRightRadius: 5, borderBottomLeftRadius: 5, borderColor: "#8603AD" },
    text: { fontWeight: "800", fontSize: 15, marginHorizontal: 10 },
});