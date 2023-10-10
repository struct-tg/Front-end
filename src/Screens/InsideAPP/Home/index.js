import React, { useState, useEffect, useContext, Fragment } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { AutenticacaoContext } from "../../../Contexts/UserContext";
import { getAllTasksPendings } from "../../../Services/Requisicoes/Tasks/Filters/index";
import { getAllDisciplineReproved } from "../../../Services/Requisicoes/Grades/Filters/index";
import { getTaskById } from "../../../Services/Requisicoes/Tasks/index";
import { getDisciplineByID } from "../../../Services/Requisicoes/Grades/index";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
    ContentContainer,
    ContainerScroll,
    ViewContainer,
    ViewSettings,
    Title,
    ContainerImageInitial,
    TitleContainerScroll
} from "../../../Styles/DefaultStyles/index.js";
import ModalPerfilSettings from "./Components/ModalPerfilHome";
import CardsHome from "./Components/CardFinishedsHome";
import SpinnerComponent from "../../../Components/Spinner";
import { getAllTasksByDiscipline } from "../../../Services/Requisicoes/Grades/Filters";

const Home = () => {
    const [tasksFinisheds, setTasksFinisheds] = useState([]);
    const [grades, setGrades] = useState([]);
    const [calendar, setCalendar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalPerfilSettings, setModalPerfilSettings] = useState(false);
    const { tokenJWT, username } = useContext(AutenticacaoContext);
    const isFocused = useIsFocused(false);
    const navigation = useNavigation();
    const [tasksByID, setTasksByID] = useState([]);

    useEffect(() => {
        async function fetchDatas() {
            try {
                setTasksFinisheds(await getAllTasksPendings(tokenJWT));
                setGrades(await getAllDisciplineReproved(tokenJWT));
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

    const fnGoToEditTask = async (idTask) => {
        const result = await getTaskById(idTask, tokenJWT);
        if (result) {
            navigation.navigate('EditTodo', { obj: result })
        } else {
            console.log('Algo deu errado');
        }
    }

    const fnGoToEditGrade = async (idGrade) => {
        const result = await getDisciplineByID(tokenJWT, idGrade);
        if (result) {
            navigation.navigate('EditGrade', { objGrade: result })
        } else {
            console.log('Algo deu errado');
        }
    }

    const goToChart = () => {
        navigation.navigate("ChartHome");
    }

    return (
        <ContentContainer>
            <ViewContainer>
                <ViewSettings>
                    <TouchableOpacity>
                        <Ionicons
                            name="person-outline"
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

                {isLoading ? (
                    <SpinnerComponent state={isLoading} text={'Carregando...'} />
                ) : (
                    tasksFinisheds.length > 0 || grades.length > 0 || calendar.length > 0 ? (
                        <Fragment>
                            <TitleContainerScroll>Suas tarefas.</TitleContainerScroll>
                            <ContainerScroll>
                                <FlatList
                                    data={tasksFinisheds}
                                    renderItem={({ item }) => (
                                        <CardsHome
                                            name={item.name}
                                            onOpen={() => fnGoToEditTask(item.id)}
                                            isTask={true}
                                        />
                                    )}
                                    showsVerticalScrollIndicator={false}
                                />
                            </ContainerScroll>

                            <TitleContainerScroll>Suas matérias.</TitleContainerScroll>
                            <ContainerScroll>
                                <FlatList
                                    data={grades}
                                    renderItem={({ item }) => (
                                        <CardsHome
                                            name={item.name}
                                            note={item.noteMin.toFixed(2)}
                                            isTask={false}
                                            onOpen={() => fnGoToEditGrade(item.id)}
                                        />
                                    )}
                                    showsVerticalScrollIndicator={false}
                                />
                            </ContainerScroll>

                            <TitleContainerScroll>Seus compromissos.</TitleContainerScroll>
                            <ContainerScroll>
                            </ContainerScroll>
                        </Fragment>
                    )
                        :
                        (
                            <Fragment>
                                <Title>{`Seja bem-vindo ao Struct, ${username}!`}</Title>
                                <ContainerImageInitial>
                                    <Image
                                        source={require('./Home.png')}
                                        style={{ width: "100%", height: "50%" }}
                                        resizeMode="cover"
                                    />
                                </ContainerImageInitial>
                            </Fragment>
                        )
                )}
            </ViewContainer>
            <ModalPerfilSettings
                state={modalPerfilSettings}
                setModalPerfilSettings={setModalPerfilSettings}
            />
        </ContentContainer>
    );
}

export default Home;