import * as React from 'react';
import { StyleSheet } from 'react-native';
import { dimensions } from "../../../styles/base";
import { ScrollView, Text, View, TouchableOpacity, Image } from "../../../components/Elements";

export default function HelpScreen({ ...props }) {

    const [desVisible, onChangeDesVisible] = React.useState(true);

    const [autVisible, onChangeAutVisible] = React.useState(true);

    const [reqVisible, onChangeReqVisible] = React.useState(true);

    const [funVisible, onChangeFunVisible] = React.useState(true);

    return (

        <ScrollView style={styles.container}>

            <View style={{ alignItems: "center" }}>

                <Image
                    source={require("../../../assets/images/cinta.png")}
                    resizeMode="stretch" style={styles.image}>
                </Image>

            </View>

            <Text style={styles.textIntro}>

                En este apartado encontrarás la ayuda brindada por el creador de esta aplicación

            </Text>

            <TouchableOpacity style={styles.viewLink} onPress={() => onChangeDesVisible(!desVisible)}>

                <Text style={styles.textLink}>Descripción de la app</Text>

            </TouchableOpacity>

            {(desVisible) && <View style={styles.view}>

                <Text style={styles.text}>Esta aplicación fue creada con el objetivo de demostrarle a mi esposa cuanto la amo, aunque creería que no debería de hacerlo, ya que es una mala mujer, mala hembra y muy muy tóxica. Jejeje, na es en broma, es la mejor esposa del mundo.</Text>

            </View>}

            <TouchableOpacity activeOpacity={0} style={styles.viewLink} onPress={() => onChangeAutVisible(!autVisible)}>

                <Text style={styles.textLink}>Autenticación</Text>

            </TouchableOpacity>

            {(autVisible) && <View style={styles.view}>

                <Text style={[styles.text]}>Hola amor, si es la primera vez que usas esta aplicación o simplemente no recuerdas cúal es tú usuario o tú contraseña te invito a que continues leyendo.</Text>

                <Text style={[styles.text, {}]}>En esta sección se describe el proceso de autenticación:</Text>

                <Text style={[styles.text, { marginTop: 5, fontFamily: "notoSerif-bold-italic" }]}>El campo correo es tú correo Gmail... Ejemplo: malahembra@gmail.com</Text>

                <Text style={[styles.text, { marginTop: 5, fontFamily: "notoSerif-bold-italic" }]}>El campo contraseña de mi tóxica esposa es la cantidad de niños que quiere tener, seguido de una coma, seguido del mes y día de nuestra primera firma, seguido de otra coma, seguido de la fecha de nuestra segunda firma... Ejemplo: 4,0321,12061002</Text>

                <Text style={[styles.text, { marginTop: 5, }]}>En una próxima actualización (si te lo ganas) te agregaré la funcionalidad de poder modificar el usuario y la contraseña, mientras tanto te toca usar lo que te he definido.</Text>

            </View>}

            <TouchableOpacity activeOpacity={0} style={styles.viewLink} onPress={() => onChangeReqVisible(!reqVisible)}>

                <Text style={styles.textLink}>Requerimientos</Text>

            </TouchableOpacity>

            {(reqVisible) && <View style={styles.view}>

                <Text style={styles.text}>Pues a la verdad que no se necesita de mucho para poder usar la aplicación:</Text>

                <Text style={[styles.text, { marginTop: 5, fontFamily: 'notoSerif-bold-italic' }]}>- Tener creado un usuario (Los usuarios los creo yo).</Text>

                <Text style={[styles.text, { marginTop: 5, fontFamily: "notoSerif-bold-italic" }]}>- Conexión a internet para realizar la autenticación en la aplicación, crear, obtener, modificar y eliminar publicaciones.</Text>

                <Text style={[styles.text, { marginTop: 5 }]}>Y ya, eso sería todo, lo otro es tener deseos de usarla.</Text>

            </View>}

            <TouchableOpacity activeOpacity={0} style={styles.viewLink} onPress={() => onChangeFunVisible(!funVisible)}>

                <Text style={styles.textLink}>Propósito</Text>

            </TouchableOpacity>

            {(funVisible) && <View style={[styles.view, { marginBottom: 30 }]}>

                <Text style={styles.text}>El propósito de la aplicación es bastante simple, la implementé con el objetivo de publicar nuestras vivencias, podrás ponerle un título, una descripción y si lo deseas le puedes agregar contenidos, los contenidos pueden ser imágenes o videos (trata de que los videos no sean tan pesados). Además podrías utilizarla como un espacio para compartir cosas que quisieras dedicarme o simplemente hacérmelas saber.</Text>

            </View>}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingVertical: 20, paddingHorizontal: 7 },
    image: { marginTop: 5, marginBottom: -15, width: dimensions.fullWidth - 30, height: 110 },
    textIntro: { fontSize: 21, color: "black", marginTop: 10, marginBottom: 25, fontFamily: 'notoSerif-italic' },
    viewLink: { padding: 10, borderColor: "#c96eb7", borderWidth: 1, backgroundColor: "#c96eb7" },
    textLink: { color: "#fff", fontSize: 19, fontFamily: 'notoSerif-bold' },
    view: { padding: 5, marginBottom: 10, borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderBottomRightRadius: 5, borderBottomLeftRadius: 5, borderColor: "#A7A5A7" },
    text: { fontSize: 19, marginHorizontal: 10, fontFamily: 'notoSerif-italic' },
});