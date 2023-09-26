import React, { useContext } from "react"
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TitleGrades } from "./StylesEvaluativeActivity";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import { Image } from "react-native";

const EvaluativeActivity = () => {
    const { username } = useContext(AutenticacaoContext);

    return (
        <SafeAreaView style={{ flexGrow: 1, padding: 24, justifyContent: "space-between", backgroundColor: "#2aabbf" }}>
            <TitleGrades>{`Cadastre novas atividades avaliativas, ${username}!`}</TitleGrades>
            <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('./EvaluativeActivity-Image.png')}
                    style={{ width: "100%", height: "55%" }}
                    resizeMode="cover"
                />
            </View>
        </SafeAreaView>
    )
}

export default EvaluativeActivity;