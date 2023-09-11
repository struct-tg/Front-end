import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AutenticacaoContext } from "../../Contexts/UserContext";
import ModalPerfilSettings from "./Components/ModalPerfilHome";

const Home = () => {
    const [modalPerfilSettings, setModalPerfilSettings] = useState(false);
    const { tokenJWT } = useContext(AutenticacaoContext);
    
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
                <Text style={{ alignSelf: "center" }}>{tokenJWT}</Text>
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