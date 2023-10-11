import React, { useState, useContext, useEffect, Fragment } from "react";
import { Image } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ContentContainer, ViewBlock, ViewContainer, ViewSettings, Title, ContainerImageInitial } from "../../../Styles/DefaultStyles/index.js";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { AutenticacaoContext } from "../../../Contexts/UserContext.js";
import { getAllPomodoro, getPomodoroByID, deletePomodoro } from "../../../Services/Requisicoes/Pomodoro/index.js";
import SpinnerComponent from "../../../Components/Spinner";
import ModalInformationPomodoro from "./Components/ModalInformationsPomodoro/index.js";
import CardPomodoro from "../Pomodoro/Components/CardPomodoro/index.js";
import AlertComponent from "../../../Components/Alert/index.js";

const Pomodoro = () => {
    const [pomodoros, setPomodoros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alertDelete, setAlertDelete] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [pomodoroSelectedId, setPomodoroSelectedId] = useState(null);
    const { username, tokenJWT } = useContext(AutenticacaoContext);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [alertMessages, setAlertMessages] = useState([
        { titulo: 'Deseja mesmo excluir este Pomodoro?', descricao: 'Essa ação é irreversível e não terá como você desfazer após a confirmação.' },
    ]);

    const goToAddPomodoro = () => {
        navigation.navigate('AddPomodoro');
    }

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
                            onPress={goToAddPomodoro}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Ionicons
                            name="help-circle-outline"
                            size={35}
                            color={"white"}
                            onPress={() => setModalVisible(true)}
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
                            <Title>{`Adicione novos Pomodoros, ${username}!`}</Title>
                            <ContainerImageInitial>
                                <Image
                                    source={require('./Pomodoro.png')}
                                    style={{ width: "100%", height: "60%" }}
                                    resizeMode="cover"
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
                title={alertMessages[0].titulo}
                message={alertMessages[0].descricao}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </ContentContainer>
    )
}

export default Pomodoro;
