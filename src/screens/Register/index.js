import React from "react";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text } from "react-native";
import Input from "../../Components/Inputs";
import Button from "../../Components/Button";
import styles from "./RegisterStyles";

const ScreenRegister = () => {
    const navigation = useNavigation();

    const returnLogin = () => {
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.title}>Faça o seu cadastro.</Text>

                <Input
                    secureText={false}
                    text="Informe o seu nome: "
                />

                <Input
                    secureText={true}
                    text="Informe o seu E-mail: "
                />

                <Input
                    secureText={true}
                    text="Informe a sua senha: "
                />

                <Input
                    secureText={true}
                    text="Confirme a sua senha: "
                />
                <View style={styles.containerButton} >
                    <Button text="Registrar!" onPress={returnLogin} />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ScreenRegister;