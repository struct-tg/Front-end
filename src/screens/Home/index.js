import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import ModalPerfilSettings from "./components/Perfil";
import ToastComponent from "../../Components/Toast";

const Home = () => {
    const [modalPerfilSettings, setModalPerfilSettings] = useState(false);

    return (
        <SafeAreaView style={{ flexGrow: 1, paddingHorizontal: 24, justifyContent: "space-between", backgroundColor: "#2aabbf" }}>
            <TouchableOpacity>
                <Ionicons
                    name="settings-outline"
                    size={35}
                    color={"white"}
                    onPress={() => setModalPerfilSettings(true)}
                />
            </TouchableOpacity>
            <View style={{ width: "100%", height: "25%", borderColor: "white", borderStyle: "solid", borderWidth: 3, borderRadius: 20 }}>
                <Text style={{ alignSelf: "center" }}>TodoList</Text>
            </View>
            <View style={{ width: "100%", height: "25%", borderColor: "white", borderStyle: "solid", borderWidth: 3, borderRadius: 20 }}>
                <Text style={{ alignSelf: "center" }}>Matérias</Text>
            </View>
            <View style={{ width: "100%", height: "25%", borderColor: "white", borderStyle: "solid", borderWidth: 3, borderRadius: 20 }}>
                <Text style={{ alignSelf: "center" }}>Calendario</Text>
            </View>
            <ModalPerfilSettings
                state={modalPerfilSettings}
                setModalPerfilSettings={setModalPerfilSettings}
            />
        </SafeAreaView>
    );
}

export default Home;