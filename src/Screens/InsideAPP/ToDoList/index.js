import React, { Fragment, useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ViewSettings, ViewTasks, TitleToDo, ViewBlock } from "./StylesToDoList.js";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Image } from "react-native";
import { getAllTasks, deleteTask, getTaskById, finishTask } from "../../../Services/Requisicoes/Tasks";
import { AutenticacaoContext } from "../../../Contexts/UserContext.js";
import { convertDateISO8601 } from "../../../Utils/Date/index";
import ModalComponent from "./ComponentsToDo/ModalInformationsToDo";
import CardTaskToDo from "./ComponentsToDo/CardTaskToDo";
import AlertComponent from "../../../Components/Alert";
import SpinnerComponent from "../../../Components/Spinner/index.js";

const ToDoList = () => {
    const { tokenJWT, username } = useContext(AutenticacaoContext);
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [modalInformation, setModalInformation] = useState(false);

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [alertDelete, setAlertDelete] = useState(false);
    const [alertFinish, setAlertFinish] = useState(false);
    const [alertUnfinish, setAlertUnfinish] = useState(false);

    const [alertMessages, setAlertMessages] = useState([
        { titulo: 'Deseja mesmo excluir sua tarefa?', descricao: 'Essa ação é irreversível e não terá como você desfazer após a confirmação.' },
        { titulo: `Parabéns, ${username}`, descricao: 'Você finalizou mais uma tarefa. Continue estudando, estamos você na sua jornada.' },
        { titulo: 'Deseja reabrir esta tarefa ?', descricao: `Ao reabrir esta tarefa todas as suas subtarefas permaneceram finalizadas quando você concluir esta ação. Deseja mesmo continuar, ${username}?` },
    ]);

    useEffect(() => {
        async function fetchTasks(tokenJWT) {
            try {
                const result = await getAllTasks(tokenJWT);
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
                console.log('algo deu errado na delecao de dados')
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


    const showUnfinishAlert = (idTask) => {
        setSelectedTaskId(idTask);
        setAlertUnfinish(true);
    }

    const handleConfirmUnfinish = async () => {
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
        setAlertUnfinish(false);
    }

    const handleCancelUnfinish = () => {
        setSelectedTaskId(null);
        setAlertUnfinish(false);
    }

    const fnGoToEdit = async (idTask) => {
        const result = await getTaskById(idTask, tokenJWT);
        if (result) {
            navigation.navigate('EditTodo', { obj: result })
        } else {
            console.log('Algo deu errado');
        }
    }

    const goToAddTodo = () => {
        navigation.navigate('AddTodo');
    }

    const goToFiltersTodo = () => {
        navigation.navigate('FiltersTodo');
    }

    return (
        <SafeAreaView style={{ flexGrow: 1, paddingHorizontal: 24, justifyContent: "space-between", backgroundColor: "#2aabbf" }}>
            <View>
                <ViewSettings>
                    <TouchableOpacity>
                        <Ionicons
                            name={"add-circle-outline"}
                            size={35}
                            color={"white"}
                            onPress={goToAddTodo}
                        />
                    </TouchableOpacity>
                    <ViewBlock>
                        <TouchableOpacity>
                            <Ionicons
                                name={"help-circle-outline"}
                                size={35}
                                color={"white"}
                                onPress={() => setModalInformation(true)}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Ionicons
                                name={"options-outline"}
                                size={35}
                                color={"white"}
                                onPress={goToFiltersTodo}
                            />
                        </TouchableOpacity>
                    </ViewBlock>
                </ViewSettings>

                {isLoading ? (
                    <SpinnerComponent state={isLoading} text={'Carregando...'} />
                ) : tasks.length <= 0 ? (
                    <Fragment>
                        <TitleToDo>{`Adicione novas tarefas, ${username}!`}</TitleToDo>
                        <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('./ToDo-Image.png')}
                                style={{ width: "100%", height: "50%" }}
                                resizeMode="cover"
                            />
                        </View>
                    </Fragment>
                ) : (
                    <ViewTasks>
                        <FlatList
                            data={tasks}
                            renderItem={({ item }) => <CardTaskToDo
                                title={item.name}
                                state={item.dateEnd === null
                                    ? 0
                                    : item.dateEnd !== null
                                        ? convertDateISO8601(item.dateEnd) > convertDateISO8601(item.dateWishEnd)
                                            ? 3
                                            : 1
                                        : null}
                                onDelete={() => showDeleteAlert(item.id)}
                                onOpen={() => fnGoToEdit(item.id)}
                                onFinish={() => item.dateEnd ? showUnfinishAlert(item.id) : showFinishAlert(item.id)}
                                isModify={true}
                            />
                            }
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ViewTasks>
                )
                }
            </View>

            <ModalComponent
                state={modalInformation}
                setModalInformation={setModalInformation}
            />

            <AlertComponent
                state={alertDelete}
                setVisible={setAlertDelete}
                title={alertMessages[0].titulo}
                message={alertMessages[0].descricao}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

            <AlertComponent
                state={alertFinish}
                setVisible={setAlertFinish}
                isInformation={true}
                title={alertMessages[1].titulo}
                message={alertMessages[1].descricao}
                onConfirm={handleConfirmFinish}
            />

            <AlertComponent
                state={alertUnfinish}
                setVisible={setAlertUnfinish}
                title={alertMessages[2].titulo}
                message={alertMessages[2].descricao}
                onConfirm={handleConfirmUnfinish}
                onCancel={handleCancelUnfinish}
            />
        </SafeAreaView >
    );
}

export default ToDoList;