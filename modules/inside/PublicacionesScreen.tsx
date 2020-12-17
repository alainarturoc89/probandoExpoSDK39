import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { SafeAreaView, FlatList, View, Image, Text, TouchableOpacity, Modal, ActivityIndicator, Ionicons } from '../../components/Elements';
import PublicacionScreen from "./PublicacionScreen";
import CrearScreen from "./CrearScreen";
import EditarScreen from "./EditarScreen";

export default function PublicacionesScreen({ ...props }) {

  const [loaded, changeLoaded] = React.useState(false);

  const [loading, changeLoading] = React.useState(false);

  const [modalVisible, changeModalVisible] = React.useState(false);

  const [typeModal, changeTypeModal] = React.useState(null);

  const [data, changeData] = React.useState([]);

  const [item, changeItem] = React.useState(null);

  const [publicationKey, changePublicationKey] = React.useState(null);

  const [date, changeDate] = React.useState(null);

  const [refe, changeRefe] = React.useState(null);

  if (!loaded) {
    if (global.firebase.auth().currentUser !== null) {

      changeLoading(true);

      changeLoaded(true);

      global.firebase.database().ref('publications').on("value", function (snapshot: any) {

        changeLoading(false);

        if (snapshot.val()) {

          changeData(Object.values(snapshot.val()).reverse());

        }
      }, function (errorObject: any) {

        changeLoading(false);

      });
    }
  }

  async function showCreate() {

    if (global.firebase.auth().currentUser !== null) {

      let publicationKey = await global.firebase.database().ref('publications').push().key;

      changePublicationKey(publicationKey);

      let d = new Date(),

        month = '' + (d.getMonth() + 1),

        day = '' + d.getDate(),

        year = d.getFullYear();

      if (month.length < 2)

        month = '0' + month;

      if (day.length < 2)

        day = '0' + day;

      let date = [day, month, year].join('-');
      changeDate(date);

      let refe = 'publication_contents/' + publicationKey + "/" + date + '_';

      changeRefe(refe);

      changeTypeModal("create");

      changeItem(null);

      changeModalVisible(true);

    }
  }

  async function showEdit(item: any) {

    changeTypeModal("edit");

    changePublicationKey(item.key);

    changeItem(item);

    changeModalVisible(true);

  }

  async function showShow(item: any) {

    changeTypeModal("show");

    changeItem(item);

    changeModalVisible(true);

  }

  async function cerrar() {

    changeTypeModal(null);

    changeItem(null);

    changeModalVisible(false);

  }

  async function crear(el: any) {

    changeItem(null);

    changeModalVisible(false);

    var publication = {

      date: date,

      description: el.description,

      images: el.images,

      title: el.title,

      key: publicationKey,

      uid: global.user.uid

    };

    var updates = {};

    updates['/publications/' + publicationKey] = publication;

    global.firebase.database().ref().update(updates);

    /*
    {
        to: expoPushToken,
        sound: 'default',
        title: 'Nueva publicacion',
        body: 'And here is the body!',
        data: { data: 'goes here' },
    }
    */

  }

  async function editar(item: any) {

    changeItem(null);

    changeModalVisible(false);

    global.firebase.database().ref('publications/' + publicationKey).set({

      date: date,

      description: item.description,

      images: item.images,

      title: item.title,

      key: publicationKey,

      uid: global.user.uid

    });
  }

  async function eliminar(ref: any) {

    Alert.alert(
      "Confirmación",
      "Seguro que deseas eliminar esta publicaión.",
      [
        {
          text: "No",

          style: "cancel"

        },
        {
          text: "Si", onPress: () => {

            changeItem(null);

            global.firebase.database().ref('publications/' + ref).remove();

            if (data.length === 1)

              changeData([]);

          }

        }

      ],

      { cancelable: false }

    );

  }

  const renderItem = ({ item }) => {

    return <View style={[styles.item]}>

      <TouchableOpacity style={[styles.first]} onPress={() => showShow(item)}>

        <Image source={require("../../assets/images/publicacion.jpg")} style={styles.image} />

        <Text style={styles.title}>{item.title}</Text>

      </TouchableOpacity>

      <View style={[{ justifyContent: "center" }]}>

        <Text style={styles.date}>{item.date}</Text>

        {item.uid === global.user.uid && <View style={[styles.view_actions]}>

          <TouchableOpacity style={[styles.edit]} onPress={() => showEdit(item)}>

            <Ionicons name="ios-create" size={40} color="#c96eb7" />

          </TouchableOpacity>

          <TouchableOpacity style={[styles.delete]} onPress={() => eliminar(item.key)}>

            <Ionicons name="ios-trash" size={40} color="#CD0D0D" />

          </TouchableOpacity>

        </View>}

      </View>

    </View>

  };

  return (

    <SafeAreaView style={styles.container}>

      <View style={[{ alignItems: "center" }]}>

        <TouchableOpacity

          style={{ alignItems: "center", marginHorizontal: 1, maxWidth: 60 }}
          onPress={() => showCreate()}>

          <Ionicons name="md-add-circle" size={70} color="#c96eb7" />

        </TouchableOpacity>

      </View>

      {loading && <ActivityIndicator size="large" color="#c96eb7" />}

      <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.title} />

      <Modal animationType="slide" visible={modalVisible}>

        <View style={[{ flex: 1, marginVertical: 20 }]}>

          <View style={[{ alignItems: "center" }]}>

            <TouchableOpacity
              style={{ alignItems: "center", maxWidth: 60 }}
              onPress={() => cerrar()}>

              <Ionicons name="md-close-circle" size={70} color="#CD0D0D" />

            </TouchableOpacity>

          </View>

          {typeModal === "create"

            ? <CrearScreen crear={crear} date={date} refe={refe} />

            : typeModal === "edit"

              ? <EditarScreen item={item} editar={editar} date={date} refe={refe} />

              : <PublicacionScreen item={item} />
          }

        </View>

      </Modal>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  item: { height: 80, flexDirection: "row", marginHorizontal: 3, borderBottomWidth: 0.5, borderColor: "#c96eb7", alignItems: "center" },
  first: { flex: 0.95, flexDirection: "row", alignItems: "center" },
  image: { height: 40, width: 40, marginRight: 10 },
  title: { fontSize: 19, fontFamily: 'courgette' },
  date: { fontSize: 15, fontFamily: 'courgette' },
  view_actions: { flexDirection: "row" },
  edit: { flex: 0.5, alignItems: "flex-start", marginLeft: 5 },
  delete: { flex: 0.5, alignItems: "flex-end", marginRight: 5 }
});