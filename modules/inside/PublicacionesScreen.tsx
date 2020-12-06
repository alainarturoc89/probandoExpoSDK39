import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, FlatList, View, Image, Text, TouchableOpacity, Modal, ScrollView, Ionicons } from '../../components/Elements';
import * as FileSystem from 'expo-file-system';

import PublicacioneScreen from "./PublicacionScreen";
import CrearScreen from "./CrearScreen";

export default function PublicacionesScreen({ ...props }) {
  const [loaded, changeLoaded] = React.useState(false);
  const [modalVisible, changeModalVisible] = React.useState(false);
  const [createType, changeCreateType] = React.useState(true);
  const [data, changeData] = React.useState([]);
  const [images, changeImages] = React.useState([]);
  const [item, changeItem] = React.useState(null);

  React.useEffect(() => {
    if (!loaded) {
      changeLoaded(true);
      global.firebase.database().ref('publications').on("value", function (snapshot: any) {
        changeData(Object.values(snapshot.val()));
      }, function (errorObject: any) {
        console.warn("Error al obtener las publicaciones");
      });
    }
  });

  async function create() {
    changeCreateType(true);
    changeItem(null);
    changeModalVisible(true);
  }

  async function show(item: any) {
    changeCreateType(false);
    changeItem(item);
    changeModalVisible(true);
  }

  async function cerrar() {
    changeCreateType(true);
    changeItem(null);
    changeModalVisible(false);
  }

  async function crear(el: any) {
    changeCreateType(true);
    changeItem(null);
    changeModalVisible(false);

    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    let fecha = [day, month, year].join('-');

    if (el.medias.length) {
      var storage = global.firebase.storage();
      for (var i = 0; i < el.medias.length; i++) {
      //  let image = 'images/' + fecha + '_' + el.medias[i].name;
        var imagesStorageRef = storage.ref('images/' + fecha + '_' + el.medias[i].name);
        let file = el.medias[i].base64;
        file += await FileSystem.readAsStringAsync(el.medias[i].uri, { encoding: FileSystem.EncodingType.Base64 });
        imagesStorageRef.putString(file, 'data_url', { contentType: el.medias[i].format.type }).then(function (snapshot) {
          changeImages(images => [...images, 'images/' + fecha + '_' + el.medias[i].name]);
        });
      }
    }

    var publication = {
      date: [day, month, year].join('/'),
      description: el.description,
      images,
      title: el.title,
      user: "alain",
    };
    var newPublicationKey = global.firebase.database().ref('publications').push().key;
    var updates = {};
    updates['/publications/' + newPublicationKey] = publication;
    updates['/users/' + 'alain' + '/publications/' + newPublicationKey] = publication;

    global.firebase.database().ref().update(updates)
      .then(() => {
        changeImages([])});
  }

  const renderItem = ({ item }) => {
    return <TouchableOpacity style={styles.item} onPress={() => show(item)}>
      {(item.avatar_url && item.avatar_url !== "")
        ? <Image source={item.avatar_url} style={styles.image} />
        : <Image source={require("../../assets/images/publicacion.png")} style={styles.image} />
      }
      <View style={{ marginLeft: 15 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => create()}>
        <Ionicons name="md-add-circle" size={70} color="#9F4ADE" />
      </TouchableOpacity>
      <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.title} />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => { }}
      >
        <View style={[{ flex: 1, marginVertical: 20 }]}>
          <ScrollView>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => cerrar()}>
              <Ionicons name="md-close-circle" size={70} color="#9F4ADE" />
            </TouchableOpacity>
            {(createType)
              ? <CrearScreen crear={crear} />
              : <PublicacioneScreen item={item} />
            }
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  item: {
    borderWidth: 0.5, borderRadius: 3, borderColor: "#9F4ADE",
    padding: 10,
    flexDirection: "row",
    alignItems: "center", marginBottom: 3, marginHorizontal: 3
  },
  image: { height: 40, width: 40 },
  title: { fontSize: 17, fontWeight: "bold", color: "#9F4ADE" },
  date: { fontSize: 15, color: "#9F4ADE" },
});