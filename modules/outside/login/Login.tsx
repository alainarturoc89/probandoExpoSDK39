import * as React from 'react';
import api from "../../../constants/Axios";
import { TextInput, View, TouchableOpacity, Text } from '../../../components/Elements';
import { form } from "../../../styles/styles";

export default function LoginModule({ ...props }) {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    async function login() {
        await api.post("security/login", { email, password })
            .then((r: any) => {
                if (r.data.success) {
                    props.navigation.navigate("Inside", { screen: 'Inside', });
                } else {
                    console.warn("No autenticado");
                }
            })
            .catch((error: any) => {
                console.warn(error.response);
            })
    }

    return (
        <View style={[form.container]}>
            <TextInput
                style={[form.input]}
                onChangeText={text => onChangeEmail(text)}
                value={email}
            />
            <TextInput
                secureTextEntry
                style={[form.input]}
                onChangeText={text => onChangePassword(text)}
                value={password}
            />
            <TouchableOpacity
                style={[form.button]}
                onPress={() => login()}
            >
                <Text>{(global as any).language.t("modules.outside.login.button-text")}</Text>
            </TouchableOpacity>
        </View>
    );
}
