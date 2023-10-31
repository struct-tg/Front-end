import React, { Fragment, useEffect, useState, useContext } from "react";
import { ContentContainer, ViewContainer, Title, ViewSettings, ViewBlock, ContainerImageInitial } from "../../../Styles/DefaultStyles/index.js";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getAllTasks, deleteTask, getTaskById, finishTask } from "../../../Services/Requisicoes/Tasks";
import { AutenticacaoContext } from "../../../Contexts/UserContext.js";
import ModalComponent from "./ComponentsToDo/ModalInformationsToDo";
import useMocks from "../../../Mocks/index.js";
import CardTaskToDo from "./ComponentsToDo/CardTaskToDo";
import AlertComponent from "../../../Components/Alert";
import SpinnerComponent from "../../../Components/Spinner/index.js";
import ResponsiveImage from "react-native-responsive-image";
import structSpeak from "../../../Device/Speech.js";

const ToDoList = () => {
    const { tokenJWT } = useContext(AutenticacaoContext);
    const { ToDoMocks } = useMocks();
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [modalInformation, setModalInformation] = useState(false);

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [alertDelete, setAlertDelete] = useState(false);
    const [alertFinish, setAlertFinish] = useState(false);
    const [alertFinished, setAlertFinished] = useState(false);

    useEffect(() => {
        async function fetchTasks(tokenJWT) {
            try {
                const result = await getAllTasks(tokenJWT)
                setTasks(result);
            } catch (error) {
                console.log('Erro ao obter tarefas: ', error);
            } finally {
                setIsLoading(false);
            }
        }
        if (isFocused) {
            fetchTasks(tokenJWT);
        }
    }, [isFocused]);

    const showDeleteAlert = (idTask) => {
        setSelectedTaskId(idTask);
        setAlertDelete(true);
    }

    const handleConfirmDelete = async () => {
        if (selectedTaskId !== null) {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTaskId));
            const result = await deleteTask(selectedTaskId, tokenJWT);
            if (result) {
                setSelectedTaskId(null);
            } else {
                console.log('algo deu errado na delecao de dados');
            }
        }
        setAlertDelete(false);
    }

    const handleCancelDelete = () => {
        setSelectedTaskId(null);
        setAlertDelete(false);
    }

    const showFinishAlert = (idTask) => {
        setSelectedTaskId(idTask);
        setAlertFinish(true);
    }

    const handleConfirmFinish = async () => {
        if (selectedTaskId !== null) {
            const result = await finishTask(selectedTaskId, tokenJWT);
            if (result) {
                const updateDatas = await getAllTasks(tokenJWT);
                setTasks(updateDatas);
            } else {
                console.log('Algo deu errado ao finalizar uma tarefa')
            }
            setSelectedTaskId(null);
        }
        setAlertFinish(false);
    }

    const showAlertFinished = () => {
        setAlertFinished(true);
    }

    const handleConfirmAlertFinished = () => {
        setAlertFinished(false);
    }

    const fnGoToEdit = async (idTask) => {
        const result = await getTaskById(idTask, tokenJWT);
        if (result) {
            navigation.navigate('EditTodo', { obj: result })
        } else {
            console.log('Algo deu errado');
        }
    }

    const transformConvertDateISO8601 = (dateString) => {
        return new Date(dateString);
    };

    return (
        <ContentContainer>
            <ViewContainer>
                <ViewSettings>
                    <TouchableOpacity onPress={() => { navigation.navigate('AddTodo') }}>
                        <Ionicons
                            name={"add-circle-outline"}
                            size={35}
                            color={"white"}
                        />
                    </TouchableOpacity>

                    <ViewBlock>
                        <TouchableOpacity>
                            <AntDesign
                                name="aliwangwang-o1"
                                size={30}
                                color="white"
                                onPress={() => structSpeak(ToDoMocks.ToDoScreen.speech)}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { navigation.navigate('ChartTodo') }}>
                            <Ionicons
                                name={"stats-chart-outline"}
                                size={30}
                                color={"white"}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { navigation.navigate('FiltersTodo') }}>
                            <Ionicons
                                name={"options-outline"}
                                size={35}
                                color={"white"}
                            />
                        </TouchableOpacity>
                    </ViewBlock>
                </ViewSettings>

                {isLoading
                    ?
                    (
                        <SpinnerComponent state={isLoading} text={'Carregando...'} />
                    )
                    : tasks.length <= 0
                        ?
                        (<Fragment>
                            <Title>{ToDoMocks.ToDoScreen.title}</Title>
                            <ContainerImageInitial>
                                <ResponsiveImage
                                    source={ToDoMocks.ToDoScreen.image.content}
                                    initWidth={ToDoMocks.ToDoScreen.image.width}
                                    initHeight={ToDoMocks.ToDoScreen.image.height}
                                    resizeMode={ToDoMocks.ToDoScreen.image.rezide}
                                />
                            </ContainerImageInitial>
                        </Fragment>
                        )
                        :
                        (
                            <FlatList
                                data={tasks}
                                renderItem={({ item }) => {
                                    const dateEnd = item.dateEnd ? transformConvertDateISO8601(item.dateEnd) : null;
                                    const dateWishEnd = item.dateWishEnd ? transformConvertDateISO8601(item.dateWishEnd) : null;
                                    let state = 0;
                                    if (dateEnd) {
                                        if (dateWishEnd) {
                                            if (dateEnd > dateWishEnd) {
                                                state = 3;
                                            } else {
                                                state = 1;
                                            }
                                        }
                                    }
                                    return (
                                        <CardTaskToDo
                                            title={item.name}
                                            state={state}
                                            onDelete={() => showDeleteAlert(item.id)}
                                            onOpen={() => fnGoToEdit(item.id)}
                                            onFinish={() => item.dateEnd ? showAlertFinished() : showFinishAlert(item.id)}
                                            isModify={true}
                                        />
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        )
                }
            </ViewContainer>

            <ModalComponent
                state={modalInformation}
                setModalInformation={setModalInformation}
            />

            <AlertComponent
                state={alertDelete}
                setVisible={setAlertDelete}
                title={ToDoMocks.ToDoScreen.alerts.deleteTask.title}
                message={ToDoMocks.ToDoScreen.alerts.deleteTask.description}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

            <AlertComponent
                state={alertFinish}
                setVisible={setAlertFinish}
                title={ToDoMocks.ToDoScreen.alerts.finishTask.title}
                message={ToDoMocks.ToDoScreen.alerts.finishTask.description}
                isInformation={true}
                onConfirm={handleConfirmFinish}
            />

            <AlertComponent
                state={alertFinished}
                setVisible={setAlertFinished}
                isInformation={true}
                title={ToDoMocks.ToDoScreen.alerts.unfinishedTask.title}
                message={ToDoMocks.ToDoScreen.alerts.unfinishedTask.description}
                onConfirm={handleConfirmAlertFinished}
            />
        </ContentContainer >
    );
}

export default ToDoList;