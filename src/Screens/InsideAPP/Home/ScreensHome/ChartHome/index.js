import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { TitleChart, View } from "./StylesChartHome";
import { AutenticacaoContext } from "../../../../../Contexts/UserContext";

const ChartHome = () => {
    const { username } = useContext(AutenticacaoContext);

    return (
        <SafeAreaView style={{ flexGrow: 1, padding: 24, justifyContent: "space-between", backgroundColor: "#2aabbf" }}>
            <TitleChart>{`Cadastre informações para usar os nossos gráficos, ${username}!`}</TitleChart>

            <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('./Chart-Image.png')}
                    style={{ width: "100%", height: "50%" }}
                    resizeMode="cover"
                />
            </View>
            
        </SafeAreaView>
    );
}

export default ChartHome;