import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, FlatList, View, Image, Text, TouchableOpacity, Modal, ScrollView, Ionicons } from '../../components/Elements';

import PublicacioneScreen from "./PublicacionScreen";
import CrearScreen from "./CrearScreen";

export default function PublicacionesScreen({ ...props }) {
  const [loaded, changeLoaded] = React.useState(false);
  const [modalVisible, changeModalVisible] = React.useState(false);
  const [createType, changeCreateType] = React.useState(true);
  const [data, changeData] = React.useState([]);
  const [item, changeItem] = React.useState(null);

  const [newPublicationKey, changeNewPublicationKey] = React.useState(null);
  const [date, changeDate] = React.useState(null);
  const [refe, changeRefe] = React.useState(null);

  if (!loaded) {
    changeLoaded(true);
    global.firebase.database().ref('publications').on("value", function (snapshot: any) {
      if (snapshot.val())
        changeData(Object.values(snapshot.val()));
    }, function (errorObject: any) {
      console.warn("Error al obtener las publicaciones");
    });
  }

  async function create() {
    let newPublicationKey = await global.firebase.database().ref('publications').push().key;
    changeNewPublicationKey(newPublicationKey);
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
    let refe = 'contents/' + newPublicationKey + "/" + date + '_';
    changeRefe(refe);
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
    var publication = {
      date: date,
      description: el.description,
      images: el.images,
      title: el.title,
      key: newPublicationKey,
      user: "alain",
    };
    var updates = {};
    updates['/publications/' + newPublicationKey] = publication;

    global.firebase.database().ref().update(updates);
  }

  const renderItem = ({ item }) => {
    return <TouchableOpacity style={[styles.item, styles.view]} onPress={() => show(item)}>
      {(item.avatar_url && item.avatar_url !== "")
        ? <Image source={item.avatar_url} style={styles.image} />
        : <Image source={require("../../assets/images/publicacion.jpg")} style={styles.image} />
      }
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>
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
      <Modal animationType="slide" visible={modalVisible}      >
        <View style={[{ flex: 1, marginVertical: 20 }]}>
          <ScrollView>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => cerrar()}>
              <Ionicons name="md-close-circle" size={70} color="#CD0D0D" />
            </TouchableOpacity>
            {(createType)
              ? <CrearScreen crear={crear} date={date} newPublicationKey={newPublicationKey} refe={refe} />
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
    height: 80,
    flexDirection: "row",
    marginHorizontal: 3
  },
  image: { height: 40, width: 40, marginRight: 10 },
  view: {
    marginLeft: 10, flex: 1, flexDirection: "row", alignItems: "center",
    borderBottomWidth: 0.5, borderRadius: 3, borderColor: "#CDC1C1"
  },
  title: { fontSize: 19, fontFamily: 'courgette', color: "black", flex: 0.95 },
  date: { fontSize: 15, color: "black", fontFamily: 'courgette' },
});