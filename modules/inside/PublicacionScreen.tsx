import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { Text, View, FlatList, Image, TouchableOpacity, Ionicons, Modal } from '../../components/Elements';
import { dimensions } from "../../styles/base";
import { ScrollView } from 'react-native-gesture-handler';

export default function PublicacionScreen({ ...props }) {

  const [modalVisible, changeModalVisible] = React.useState(false);

  const [item, changeItem] = React.useState(null);

  function open(item: any) {

    changeItem(item);

    changeModalVisible(true);

  }

  function cerrar() {

    changeItem(null);

    changeModalVisible(false);

  }

  return (

    <View style={styles.container}>

     <View style={{ flexDirection: "row", alignItems: "center" }}>

        <Text style={[styles.title, { flex: 0.7 }]}>{props.item.title}</Text>

        <Text style={[styles.date, { flex: 0.3 }]}>{props.item.date}</Text>

      </View>

      <ScrollView style={[styles.scrollView]}>

        <Text style={[styles.description]}>{props.item.description}</Text>
        
      </ScrollView>

      {
        props.item.images && <FlatList
          data={props.item.images}
          keyExtractor={(item: object, index: number) => index.toString()}
          numColumns={2}
          renderItem={({ item, index }) => {

            return <TouchableOpacity style={styles.viewFile} onPress={() => open(item)}>

              {item.type === "image"

                ? <Image source={{ uri: item.uploadUrl }}
                  style={{ margin: 15, width: 150, height: 150 }}></Image>

                : item.type === "video"

                  ? <Video
                    source={{ uri: item.uploadUrl }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay={false}
                    style={{ width: 150, height: 150 }}
                  />

                  : <Ionicons name="md-musical-notes" size={80} color="#c96eb7" />

              }

            </TouchableOpacity>

          }
          }
        />
      }

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
  container: { flex: 1, padding: 20 },
  title: { fontSize: 19, fontFamily: "courgette" },
  date: { fontSize: 15, fontFamily: "courgette" },
  scrollView:{marginTop: 15, marginBottom: 10,},
  description: { fontSize: 17,  fontFamily: "courgette" },
  viewFile: { width: 150, height: 150, alignItems: "center", justifyContent: "center", borderWidth: 0.5, borderColor: "#c96eb7", borderRadius: 5, margin: 15 }
});