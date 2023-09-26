import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TitleGrades, View } from "./StylesActivityFilters";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";
import { Image } from "react-native";

const ActivityFilters = () => {
    const { username } = useContext(AutenticacaoContext);
    return (
        <SafeAreaView style={{ flexGrow: 1, padding: 24, justifyContent: "space-between", backgroundColor: "#2aabbf" }}>
            <TitleGrades>{`Cadastre novas atividades avaliativas para filtrar, ${username}!`}</TitleGrades>
            <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('./ActivityFilters-Image.png')}
                    style={{ width: "100%", height: "55%" }}
                    resizeMode="cover"
                />
            </View>
        </SafeAreaView>
    )
};

export default ActivityFilters;