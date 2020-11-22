import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, } from '../../components/Elements';

export default function PublicacionScreen({ ...props }) {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[styles.title, { flex: 0.7 }]}>{props.item.title}</Text>
                <Text style={[styles.date, { flex: 0.3 }]}>{props.item.date}</Text>
            </View>
            <View style={{ borderWidth: 0.5, borderRadius: 3, borderColor: "gray",padding: 10,marginVertical:5}}>
                <Text style={[styles.description]}>{props.item.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 20, fontWeight: "bold", color: "#9F4ADE" },
    date: { fontSize: 15, color: "#9F4ADE", fontWeight: "700" },
    description: { fontSize: 17, fontWeight: "500" },

});