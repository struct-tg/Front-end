import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { AutenticacaoContext } from "../../Contexts/UserContext";
import { getAllTasksFinisheds } from "../../Services/Requisicoes/Tasks/Filters/index";
import { useIsFocused } from "@react-navigation/native";
import ModalPerfilSettings from "./Components/ModalPerfilHome";
import ContainerScrool from "./StylesHome";
import CardFinishedHome from "./Components/CardFinishedsHome";

const Home = () => {
    const [tasksFinisheds, setTasksFinisheds] = useState([]);
    const [modalPerfilSettings, setModalPerfilSettings] = useState(false);
    const { tokenJWT } = useContext(AutenticacaoContext);
    const isFocused = useIsFocused(false);

    useEffect(() => {
        async function fetchDatas() {
            setTasksFinisheds(await getAllTasksFinisheds(tokenJWT));
        }
        if (isFocused) {
            fetchDatas()
        }
    }, [isFocused, tokenJWT])

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

            <ContainerScrool>
                <FlatList
                    data={tasksFinisheds}
                    renderItem={({ item }) => <CardFinishedHome name={item.name} />}
                    showsVerticalScrollIndicator={false}
                />
            </ContainerScrool>

            <ContainerScrool>
            </ContainerScrool>

            <ContainerScrool>
            </ContainerScrool>

            <ModalPerfilSettings
                state={modalPerfilSettings}
                setModalPerfilSettings={setModalPerfilSettings}
            />
        </SafeAreaView>
    );
}

export default Home;