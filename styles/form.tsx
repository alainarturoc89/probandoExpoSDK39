import { StyleSheet } from 'react-native';

import { colors, dimensions } from './base';

export default StyleSheet.create({
    container: {
        padding: 10,
        margin: 15,
        borderWidth: 0.1,
        borderColor: "gray",
        shadowRadius: 7,
        backgroundColor: "#FFFFFF"
    },
    input: {
        height: 35,
        borderRadius: 3,
        borderColor: 'gray',
        borderWidth: 0.5,
        marginBottom: 10
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        backgroundColor: colors.primary,
    }
});