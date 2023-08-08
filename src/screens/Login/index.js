import React from "react";
import styles from "./LoginStyles";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text, SafeAreaView } from "react-native";
import Input from "../../Components/Inputs";
import Button from "../../Components/Button";

const ScreenLogin = () => {
    const navigation = useNavigation();

    const goToRegister = () => {
        navigation.navigate('Register');
    };

    const goToForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.title}>Seja bem-vindo ao Struct!</Text>

                <Input
                    secureText={false}
                    text="Informe o seu E-mail: "
                />

                <Input
                    secureText={true}
                    text="Informe a senha: "
                />
                <View style={styles.block}>
                    <Button text="Entrar" />

                    <TouchableOpacity onPress={goToForgotPassword}>
                        <Text style={styles.navigators}>Esqueceu a senha?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToRegister}>
                        <Text style={styles.navigators}>Não tem conta? Registre-se!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ScreenLogin;