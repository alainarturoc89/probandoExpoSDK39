import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { SafeAreaView, FlatList, View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, Ionicons, MaterialIcons } from '../../components/Elements';
import { sendPushNotification } from "../../hooks/useNotifications";
import { firebase } from "../../hooks/useFirebase";

export default function PublicacionesScreen({ ...props }) {

  const [search, changeSearch] = React.useState("");

  const [loaded, changeLoaded] = React.useState(false);

  const [loading, changeLoading] = React.useState(false);

  const [data, changeData] = React.useState([]);

  const [copyData, changeCopyData] = React.useState([]);

  async function cargaInicial() {

    if (!loaded) {
      if (firebase.auth().currentUser !== null) {

        changeLoading(true);

        changeLoaded(true);

        await firebase.database().ref('publications').on("value", function (snapshot: any) {

          changeLoading(false);

          if (snapshot.val()) {

            let d = Object.values(snapshot.val()).reverse();

            changeData(d);

            changeCopyData(d);

          }
        }, function (errorObject: any) {

          changeLoading(false);

        });
      }
    }

  }

  cargaInicial();

  async function showCreate() {

    if (await firebase.auth().currentUser !== null) {

      let publicationKey = await firebase.database().ref('publications').push().key;

      let d = new Date(),

        month = '' + (d.getMonth() + 1),

        day = '' + d.getDate(),

        year = d.getFullYear();

      if (month.length < 2)

        month = '0' + month;

      if (day.length < 2)

        day = '0' + day;

      let date = [day, month, year].join('-');

      let refe = 'publication_contents/' + publicationKey + "/" + date + '_';

      props.navigation.navigate("CrearScreen", { crear, date, refe, publicationKey });

    }
  }

  async function crear(el: any) {

    var publication = {

      date: el.date,

      description: el.description,

      images: el.images,

      title: el.title,

      key: el.key,

      uid: global.user.uid

    };

    var updates = {};

    updates['/publications/' + el.key] = publication;

    await firebase.database().ref().update(updates);

    sendPushNotification({ title: 'Nueva publicación', body: `${global.user.email} ha creado una publicación` });

    props.navigation.navigate("PublicacionesScreen");

  }

  async function showEdit(item: any) {

    props.navigation.navigate("EditarScreen", { item, editar });

  }

  async function editar(item: any) {

    await firebase.database().ref('publications/' + item.key).set({

      date: item.date,

      description: item.description,

      images: item.images,

      title: item.title,

      key: item.key,

      uid: global.user.uid

    });

    sendPushNotification({ title: 'Publicación editada', body: `${global.user.email} ha modificado una publicación` });

    props.navigation.navigate("PublicacionesScreen");

  }

  async function showShow(item: any) {

    props.navigation.navigate("PublicacionScreen", { item });

  }

  function eliminar(ref: any) {

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

            del(ref);

          }

        }

      ],

      { cancelable: false }

    );

  }

  async function del(ref: any) {

    await firebase.database().ref('publications/' + ref).remove();

    if (data.length === 1)

      changeData([]);

    sendPushNotification({ title: 'Publicación eliminada', body: `${global.user.email} ha eliminado una publicación` });

  }

  async function filter(filtro = null, op_cl = null) {

    changeSearch(filtro);

    if (filtro) {

      let filterData = copyData.filter(el => {

        return el.title.toLowerCase().indexOf(filtro.toLowerCase()) > -1;

      });

      changeData(filterData);

    } else {

      changeData(copyData);

    }

  }

  const Actions = ({ item }) => {

    const [showActions, changeShowActions] = React.useState(false);

    return (

      showActions

        ? <View style={[styles.view_actions]}>

          <TouchableOpacity style={[styles.actions]} onPress={() => showEdit(item)}>

            <Ionicons name="ios-create" size={28} color="#c96eb7" />

          </TouchableOpacity>

          <TouchableOpacity style={[styles.actions]} onPress={() => eliminar(item.key)}>

            <Ionicons name="ios-trash" size={28} color="#CD0D0D" />

          </TouchableOpacity>

          <TouchableOpacity style={[styles.actions]} onPress={() => changeShowActions(!showActions)}>

            <MaterialIcons name="not-interested" size={28} color="#959595" />

          </TouchableOpacity>

        </View>

        : <TouchableOpacity style={[styles.showActions]} onPress={() => changeShowActions(!showActions)}>

          <MaterialIcons name="more-horiz" size={28} color="#959595" />

        </TouchableOpacity>

    )
  }

  const renderItem = ({ item }) => {

    return <View>

      <View style={[styles.item]}>

        {(item.uid === global.user.uid)

          ? <View style={[styles.editItem]}>

            <TouchableOpacity style={[styles.firstItem]} onPress={() => showShow(item)}>

              <Image source={require("../../assets/images/alain_lisbet.png")} style={styles.image} />

              <Text style={styles.title}>{item.title}</Text>

            </TouchableOpacity>

            <View style={[styles.secondItem]}>

              <Text style={styles.date}>{item.date}</Text>

              <Actions item={item} />

            </View>

          </View>

          : <TouchableOpacity style={[styles.touchableItem]} onPress={() => showShow(item)}>

            <Image source={require("../../assets/images/alain_lisbet.png")} style={[styles.image, { flex: 0.1 }]} />

            <Text style={[styles.title, { flex: 0.65 }]}>{item.title}</Text>

            <Text style={[styles.date, { flex: 0.25 }]}>{item.date}</Text>

          </TouchableOpacity>

        }

      </View>

      <View style={[styles.divider]}></View>

    </View>

  };

  return (

    <SafeAreaView style={styles.container}>

      <View style={[styles.viewSearch]}>

        <TextInput
          style={[styles.inputSearch]}
          onChangeText={search => { filter(search); }}
          value={search} />

        <TouchableOpacity

          style={[styles.touchableSearch]}
          onPress={() => filter(null, true)}>

          <Ionicons name="ios-search" size={30} color="#737173" />

        </TouchableOpacity>

      </View>

      {loading && <ActivityIndicator size="large" color="#c96eb7" />}

      <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.title} style={[styles.flatList]} />

      <TouchableOpacity

        style={[styles.butoomCreate]}
        onPress={() => showCreate()}>

        <Ionicons name="md-add-circle" size={70} color="#c96eb7" />

      </TouchableOpacity>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  viewSearch: { marginVertical: 5, flexDirection: "row", alignItems: "center", borderColor: 'silver', borderBottomWidth: 0.3 },
  inputSearch: { flex: 0.90, height: 40, paddingHorizontal: 5, fontFamily: "courgette", fontSize: 15, },
  touchableSearch: { flex: 0.10, width: 30, height: 30 },
  butoomCreate: { width: 60, height: 60, position: 'absolute', bottom: 10, right: 10, },
  flatList: { paddingVertical: 5 },
  item: { marginBottom: 1, paddingVertical: 5, flexDirection: "row", alignItems: "center", marginVertical: 0.2 },
  touchableItem: { flexDirection: "row", alignItems: "center" },
  editItem: { flexDirection: "row" },
  firstItem: { flex: 0.75, flexDirection: "row", alignItems: "center" },
  secondItem: { justifyContent: "center", flex: 0.25, alignItems: "center" },
  image: { height: 40, width: 40, marginRight: 10, marginLeft: 5 },
  title: { fontSize: 16, fontFamily: 'courgette' },
  date: { fontSize: 13, fontFamily: 'courgette' },
  view_actions: { flexDirection: "row" },
  actions: { flex: 0.33, alignItems: "center" },
  showActions: { maxWidth: 30 },
  divider: { borderBottomWidth: 1, borderBottomColor: "#E7E4E4", marginLeft: 50 }
});