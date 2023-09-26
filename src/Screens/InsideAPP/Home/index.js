import React, { useState, useEffect, useContext, Fragment } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { AutenticacaoContext } from "../../../Contexts/UserContext";
import { getAllTasksPendings } from "../../../Services/Requisicoes/Tasks/Filters/index";
import { getTaskById } from "../../../Services/Requisicoes/Tasks/index";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ContainerScroll, TitleContainer, ViewSettings } from "./StylesHome.js";
import ModalPerfilSettings from "./Components/ModalPerfilHome";
import CardFinishedHome from "./Components/CardFinishedsHome";
import SpinnerComponent from "../../../Components/Spinner";

const Home = () => {
    const [tasksFinisheds, setTasksFinisheds] = useState([]);
    const [grades, setGrades] = useState([]);
    const [agenda, setAgenda] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalPerfilSettings, setModalPerfilSettings] = useState(false);
    const { tokenJWT } = useContext(AutenticacaoContext);
    const isFocused = useIsFocused(false);
    const navigation = useNavigation();

    useEffect(() => {
        async function fetchDatas() {
            try {
                setTasksFinisheds(await getAllTasksPendings(tokenJWT));
            } catch (error) {
                console.log('Erro ao obter tarefas em home: ', error);
            } finally {
                setIsLoading(false);
            }

        }
        if (isFocused) {
            fetchDatas()
        }
    }, [isFocused, tokenJWT])

    const fnGoToEdit = async (idTask) => {
        const result = await getTaskById(idTask, tokenJWT);
        if (result) {
            navigation.navigate('EditTodo', { obj: result })
        } else {
            console.log('Algo deu errado');
        }
    }

    const goToChart = () => {
        navigation.navigate("ChartHome");
    }

    return (
        <SafeAreaView style={{ flexGrow: 1, paddingHorizontal: 24, justifyContent: "space-between", backgroundColor: "#2aabbf" }}>
            {isLoading ? (
                <SpinnerComponent state={isLoading} text={'Carregando...'}/>
            )
                :
                (<Fragment>
                    <ViewSettings>
                        <TouchableOpacity>
                            <Ionicons
                                name="settings-outline"
                                size={35}
                                color={"white"}
                                onPress={() => setModalPerfilSettings(true)}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={goToChart}>
                            <Ionicons
                                name="bar-chart-outline"
                                size={35}
                                color={"white"}
                            />
                        </TouchableOpacity>
                    </ViewSettings>

                    <TitleContainer>Suas tarefas.</TitleContainer>
                    <ContainerScroll>
                        <FlatList
                            data={tasksFinisheds}
                            renderItem={({ item }) => (
                                <CardFinishedHome
                                    name={item.name}
                                    onOpen={() => fnGoToEdit(item.id)}
                                    isTask={true}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    </ContainerScroll>

                    <TitleContainer>Suas matérias.</TitleContainer>
                    <ContainerScroll>
                        <CardFinishedHome
                            name={'Estrutura de dados'}
                            isTask={false}
                            note={'10.00'}
                        />
                        <CardFinishedHome
                            name={'Banco de dados'}
                            isTask={false}
                            note={'9.50'}
                        />
                        <CardFinishedHome
                            name={'Sistemas Operacionais'}
                            isTask={false}
                            note={'5.50'}
                        />
                    </ContainerScroll>

                    <TitleContainer>Agenda.</TitleContainer>
                    <ContainerScroll>
                    </ContainerScroll>

                    <ModalPerfilSettings
                        state={modalPerfilSettings}
                        setModalPerfilSettings={setModalPerfilSettings}
                    />
                </Fragment>
                )
            }
        </SafeAreaView>
    );
}

export default Home;