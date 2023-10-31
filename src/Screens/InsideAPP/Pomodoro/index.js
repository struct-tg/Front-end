import React, { useState, useContext, useEffect, Fragment } from "react";
import { Image } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ContentContainer, ViewContainer, ViewSettings, Title, ContainerImageInitial } from "../../../Styles/DefaultStyles/index.js";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { AutenticacaoContext } from "../../../Contexts/UserContext.js";
import { getAllPomodoro, getPomodoroByID, deletePomodoro } from "../../../Services/Requisicoes/Pomodoro/index.js";
import { AntDesign } from '@expo/vector-icons';
import useMocks from "../../../Mocks/index.js";
import structSpeak from "../../../Device/Speech.js";
import SpinnerComponent from "../../../Components/Spinner";
import ModalInformationPomodoro from "./Components/ModalInformationsPomodoro/index.js";
import CardPomodoro from "../Pomodoro/Components/CardPomodoro/index.js";
import AlertComponent from "../../../Components/Alert/index.js";
import ResponsiveImage from "react-native-responsive-image";


const Pomodoro = () => {
    const [pomodoros, setPomodoros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alertDelete, setAlertDelete] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [pomodoroSelectedId, setPomodoroSelectedId] = useState(null);
    const { username, tokenJWT } = useContext(AutenticacaoContext);
    const { PomodoroMocks } = useMocks();
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        async function fetchPomodoros() {
            try {
                const result = await getAllPomodoro(tokenJWT);
                setPomodoros(result);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPomodoros();
    }, [isFocused]);

    const showDeleteAlert = (idPomodoro) => {
        setPomodoroSelectedId(idPomodoro);
        setAlertDelete(true);
    }

    const handleConfirmDelete = async () => {
        if (pomodoroSelectedId !== null) {
            setPomodoros((prevPomodoros) => prevPomodoros.filter((pomodoro) => pomodoro.id !== pomodoroSelectedId));
            const result = await deletePomodoro(pomodoroSelectedId, tokenJWT)
            if (result) {
                setPomodoroSelectedId(null);
            } else {
                console.log('algo deu errado na delecao de dados do pomodoro');
            }
        }
        setAlertDelete(false);
    }

    const handleCancelDelete = () => {
        setPomodoroSelectedId(null);
        setAlertDelete(false);
    }

    const fnGoToEdit = async (idPomodoro) => {
        const result = await getPomodoroByID(idPomodoro, tokenJWT)
        if (result) {
            navigation.navigate('EditPomodoro', { objEdit: result });
        } else {
            console.log('Algo deu errado na captura do pomodoro');
        }
    }

    const fnGoToPomodoro = (ciclo) => {
        navigation.navigate('ClockPomodoro', { cicloSelecionado: ciclo })
    }

    return (
        <ContentContainer>
            <ViewContainer>
                <ViewSettings>
                    <TouchableOpacity>
                        <Ionicons
                            name="add-circle-outline"
                            size={35}
                            color={"white"}
                            onPress={() => navigation.navigate('AddPomodoro')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => structSpeak(PomodoroMocks.PomodoroScreen.speech)}>
                        <AntDesign
                            name="aliwangwang-o1"
                            size={30}
                            color="white"
                        />
                    </TouchableOpacity>
                </ViewSettings>

                {isLoading
                    ?
                    (<SpinnerComponent state={isLoading} text={"Carregando"} />)
                    :
                    pomodoros.length <= 0
                        ?
                        (<Fragment>
                            <Title>{PomodoroMocks.PomodoroScreen.title}</Title>
                            <ContainerImageInitial>
                                <ResponsiveImage
                                    source={PomodoroMocks.PomodoroScreen.image.content}
                                    initWidth={PomodoroMocks.PomodoroScreen.image.width}
                                    initHeight={PomodoroMocks.PomodoroScreen.image.height}
                                    resizeMode={PomodoroMocks.PomodoroScreen.image.rezide}
                                />
                            </ContainerImageInitial>
                        </Fragment>
                        )
                        :
                        (
                            <FlatList
                                data={pomodoros}
                                renderItem={({ item }) => <CardPomodoro
                                    time={item.timer}
                                    shortStop={item.timerPauseShort}
                                    longStop={item.timerPauseLong}
                                    onDelete={() => showDeleteAlert(item.id)}
                                    onEdit={() => fnGoToEdit(item.id)}
                                    onSelect={() => fnGoToPomodoro(item)}
                                    isModify={true}
                                />
                                }
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        )
                }
            </ViewContainer>

            <ModalInformationPomodoro
                state={modalVisible}
                setModalInformation={setModalVisible}
            />

            <AlertComponent
                state={alertDelete}
                setVisible={setAlertDelete}
                title={PomodoroMocks.PomodoroScreen.alerts.deleteTask.title}
                message={PomodoroMocks.PomodoroScreen.alerts.deleteTask.description}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </ContentContainer>
    )
}

export default Pomodoro;
