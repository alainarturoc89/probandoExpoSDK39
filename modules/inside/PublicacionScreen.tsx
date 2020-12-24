import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { Text, View, FlatList, Image, TouchableOpacity, Ionicons, Modal, TextInput } from '../../components/Elements';
import { dimensions } from "../../styles/base";
import { firebase } from "../../hooks/useFirebase";
import { sendPushNotification } from "../../hooks/useNotifications";

export default function PublicacionScreen({ route: { params } }) {

  const [modalVisible, changeModalVisible] = React.useState(false);

  const [item, changeItem] = React.useState(null);

  const [createCommentaryVisible, changeCreateCommentaryVisible] = React.useState(false);

  const [commentary, changeCommentary] = React.useState('');

  const [rating, changeRating] = React.useState('');

  const [loadedRatings, changeLoadedRatings] = React.useState(false);

  const [ratings, changeRatings] = React.useState([]);

  async function getRatings() {

    if (!loadedRatings) {

      let aux = new Array;

      await firebase.database().ref('ratings/' + params.item.key).once('value').then((snapshot) => {

        changeLoadedRatings(true);

        aux = Object.values(snapshot.val()).reverse();

        changeRatings(aux);

      });

    }

  }

  getRatings();

  function open(item: any) {

    changeItem(item);

    changeModalVisible(true);

  }

  function cerrar() {

    changeItem(null);

    changeModalVisible(false);

  }

  async function createRating() {

    var aux = {

      commentary,

      email: global.user.email,

      rating

    };

    var updates = {};

    updates[`ratings/${params.item.key}/${global.user.uid}`] = aux;

    await firebase.database().ref().update(updates);

    sendPushNotification({ title: 'Nuevo comentario', body: `${global.user.email} ha comentado una publicación` });

    changeCommentary("");

    changeRating("");

    changeLoadedRatings(false);

    changeCreateCommentaryVisible(false);

  }

  function cancelRating() {

    changeCommentary("");

    changeRating("");

    changeCreateCommentaryVisible(false);

  }

  function showCreate() {

    let uid = global.user.uid;

    if (params.item.uid === uid) {

      return false;

    } else {

      let found = true;

      let length = ratings.length;

      let email = global.user.email;

      for (var i = 0; i < length; i++) {

        if (ratings[i].email === email) {

          found = false;

          break;

        }

      }

      return found;
    }

  }

  const renderItem = ({ item }) => {

    return <View style={[styles.itemRating]}>

      <View style={[styles.first]} >

        <Text style={styles.email}>{item.email}</Text>

        <Text style={styles.rating}>{item.rating}</Text>

        <Ionicons name="ios-star" size={25} color="#FFC300" />

      </View>

      <View style={[{ marginTop: 5 }]}>

        <Text style={styles.commentary}>{item.commentary}</Text>

      </View>

    </View>

  };

  return (

    <View style={styles.container}>

      <View style={{ flexDirection: "row", marginHorizontal: 5, marginVertical: 10 }}>

        <Text style={[styles.title, { flex: 0.7 }]}>{params.item.title}</Text>

        <Text style={[styles.date, { flex: 0.3 }]}>{params.item.date}</Text>

      </View>

      <Text style={[styles.description, { marginHorizontal: 5 }]}>{params.item.description}</Text>

      {
        params.item.images && <FlatList
          data={params.item.images}
          keyExtractor={(item: object, index: number) => index.toString()}
          numColumns={2}
          renderItem={({ item, index }) => {

            return <TouchableOpacity style={styles.viewFile} onPress={() => open(item)}>

              {item.type === "image"

                ? <Image source={{ uri: item.uploadUrl }}
                  style={{ width: 120, height: 120 }}></Image>

                : item.type === "video"

                  ? <Video
                    source={{ uri: item.uploadUrl }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay={false}
                    style={{ width: 120, height: 120 }}
                  />

                  : <Ionicons name="md-musical-notes" size={80} color="#c96eb7" />

              }

            </TouchableOpacity>

          }
          }
        />
      }

      <View style={[{ flexDirection: "row", marginHorizontal: 3, alignItems: "center", marginTop: 20 }]} >

        <View style={[{ flex: 0.5, flexDirection: "row", alignItems: "center" }]}>

          <Text style={[styles.titleRatings, { marginRight: 10 }]}>Comentarios</Text>

          <Ionicons name="md-chatbubbles" size={40} color="#FFC300" />

        </View>

        {showCreate() && <View style={[{ flex: 0.5, alignItems: "flex-end" }]}>

          <TouchableOpacity
            style={[{ width: 50, height: 50 }]}
            onPress={() => changeCreateCommentaryVisible(true)}>

            <Ionicons name="md-add-circle" size={45} color="#c96eb7" />

          </TouchableOpacity>

        </View>}

      </View>

      {createCommentaryVisible && <View style={[{ backgroundColor: "#DFDFDF", paddingVertical: 15, paddingHorizontal: 20, marginVertical: 10, marginHorizontal: 3, borderRadius: 5 }]}>

        <Text style={[styles.text]}>Creando comentario</Text>

        <TextInput
          placeholder="Comentario... *"
          multiline
          style={[styles.input, { height: 120, textAlignVertical: "top" }]}
          onChangeText={text => changeCommentary(text)}
          value={commentary} />

        <TextInput
          placeholder="Calificación... *"
          keyboardType="numeric"
          style={[styles.input]}
          onChangeText={text => changeRating(text)}
          value={rating} />

        <View style={[{ flexDirection: "row", alignItems: "center", justifyContent: "center" }]}>

          <TouchableOpacity
            style={[{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "#c96eb7", borderRadius: 5, marginRight: 4 }]}
            disabled={(commentary !== "" && rating !== "") ? false : true}
            onPress={() => createRating()}>

            <Text style={[{ textAlign: "center", color: "#fff", fontSize: 20, fontFamily: 'courgette' }]}>Comentar</Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={[{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "#F64A4A", borderRadius: 5, marginLeft: 4 }]}
            onPress={() => cancelRating()}>

            <Text style={[{ textAlign: "center", color: "#fff", fontSize: 20, fontFamily: 'courgette' }]}>Cancelar</Text>

          </TouchableOpacity>


        </View>

      </View>}

      <FlatList data={ratings} renderItem={renderItem} keyExtractor={item => item.email} style={[{ marginBottom: 10 }]} />

      <Modal animationType="slide" visible={modalVisible}>

        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => cerrar()}>

          <Ionicons name="md-close-circle" size={70} color="#CD0D0D" />

        </TouchableOpacity>

        {
          item && <View style={[{ flex: 1, marginVertical: 10 }]}>

            {
              item.type === "video"

                ? <Video
                  source={{ uri: (item) ? item.uploadUrl : "" }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay={true}
                  isLooping={true}
                  style={{ height: 100 + "%", marginHorizontal: 10 }}
                />

                : <Image
                  source={{ uri: item.uploadUrl }}
                  resizeMode="stretch"
                  style={{ height: dimensions.fullHeight - 100, width: dimensions.fullWidth - 20, marginHorizontal: 10 }}
                ></Image>

            }

          </View>

        }

      </Modal>

    </View>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 19, fontFamily: "courgette" },
  date: { fontSize: 15, fontFamily: "courgette" },
  description: { fontSize: 17, fontFamily: "courgette", marginTop: 15, marginBottom: 10, },
  viewFile: { width: 120, height: 120, margin: 15 },
  titleRatings: { fontSize: 25, fontFamily: "courgette", marginVertical: 10 },
  itemRating: { backgroundColor: "#CBCBCB", padding: 10, borderWidth: 0.5, borderColor: "#BAB9BA", borderRadius: 5, marginHorizontal: 3, marginBottom: 3 },
  first: { flex: 0.70, flexDirection: "row", alignItems: "center" },
  email: { fontSize: 17, fontFamily: "notoSerif-bold", flex: 0.90 },
  rating: { fontSize: 19, fontFamily: "notoSerif-bold", flex: 0.05 },
  commentary: { fontSize: 17, fontFamily: "notoSerif-italic" },
  text: { fontFamily: "courgette", fontSize: 18, marginBottom: 10, textAlign: "center" },
  input: { backgroundColor: "#fff", height: 50, borderRadius: 3, borderColor: '#c96eb7', borderWidth: 0.5, marginBottom: 10, paddingHorizontal: 5, fontFamily: "courgette", fontSize: 15, },
});