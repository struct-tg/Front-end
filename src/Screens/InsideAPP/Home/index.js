import React, { useState, useEffect, useContext, Fragment } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { AutenticacaoContext } from "../../../Contexts/UserContext";
import { getTaskById, getAllFilterTasks } from "../../../Services/Requests/Tasks/index";
import { getDisciplineByID, getAllDiscipline } from "../../../Services/Requests/Disciplines/index.js";
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
import useMocks from "../../../Mocks";
import ModalPerfilSettings from "./Components/ModalPerfilHome";
import CardsHome from "./Components/CardHome/index.js";
import SpinnerComponent from "../../../Components/Spinner";
import ResponsiveImage from "react-native-responsive-image";

const Home = () => {
    const [grades, setGrades] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [calendar, setCalendar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalPerfilSettings, setModalPerfilSettings] = useState(false);
    const { tokenJWT, username } = useContext(AutenticacaoContext);
    const { HomeMocks } = useMocks();
    const isFocused = useIsFocused(false);
    const navigation = useNavigation();
    const [tasksByID, setTasksByID] = useState([]);

    useEffect(() => {
        async function fetchDatas() {
            try {
                const [disciplines, tasks] = await Promise.all([
                    getAllDiscipline(tokenJWT),
                    getAllFilterTasks(tokenJWT, { status: 'NOTCOMPLETED' })
                ]);

                setGrades(disciplines);
                setTasks(tasks);
            } catch (error) {
                console.log('Erro ao obter tarefas em home: ', error);
            } finally {
                setIsLoading(false);
            }

        }
        fetchDatas()
    }, [isFocused])

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
            navigation.navigate('EditDiscipline', { objGrade: result })
        } else {
            console.log('Algo deu errado');
        }
    }

    return (
        <ContentContainer>
            <ViewSettings>
                    <TouchableOpacity>
                        <Ionicons
                            name="person-outline"
                            size={35}
                            color={"white"}
                            onPress={() => setModalPerfilSettings(true)}
                        />
                    </TouchableOpacity>
                </ViewSettings>
            <ViewContainer style={{justifyContent: 'space-between'}}>
                {isLoading ? (
                    <SpinnerComponent state={isLoading} text={'Carregando...'} />
                ) : (
                    grades.length > 0 && tasks.length > 0 ? (
                        <ViewContainer>
                            <View>
                                <TitleContainerScroll>Suas tarefas.</TitleContainerScroll>
                                <ContainerScroll>
                                    <FlatList
                                        data={tasks}
                                        renderItem={({ item }) => (
                                            <CardsHome
                                                name={item.name}
                                                isTask={true}
                                                onOpen={() => fnGoToEditTask(item.id)}
                                            />
                                        )}
                                        showsVerticalScrollIndicator={false}
                                    />
                                </ContainerScroll>
                            </View>

                            <View>
                                <TitleContainerScroll>Suas matérias.</TitleContainerScroll>
                                <ContainerScroll>
                                    <FlatList
                                        data={grades}
                                        renderItem={({ item }) => (
                                            <CardsHome
                                                name={item.name}
                                                note={item.note}
                                                isTask={false}
                                                onOpen={() => fnGoToEditGrade(item.id)}
                                            />
                                        )}
                                        showsVerticalScrollIndicator={false}
                                    />
                                </ContainerScroll>
                            </View>
                        </ViewContainer>
                    )
                        :
                        (
                            <Fragment>
                                <Title>{HomeMocks.HomeScreen.title}</Title>
                                <ContainerImageInitial>
                                    <ResponsiveImage
                                        source={HomeMocks.HomeScreen.image.content}
                                        initWidth={HomeMocks.HomeScreen.image.width}
                                        initHeight={HomeMocks.HomeScreen.image.height}
                                        resizeMode={HomeMocks.HomeScreen.image.rezide}
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