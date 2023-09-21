import React, { Fragment, useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ViewSettings, ViewTasks, TitleToDo, ViewBlock } from "./StylesToDoList.js";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Image } from "react-native";
import { getAllTasks, deleteTask, getTaskById, finishTask } from "../../Services/Requisicoes/Tasks";
import { AutenticacaoContext } from "../../Contexts/UserContext.js";
import convertDateISO8601 from "../../Utils/Date/index";
import ModalComponent from "./ComponentsToDo/ModalInformationsToDo";
import CardTaskToDo from "./ComponentsToDo/CardTaskToDo";
import AlertComponent from "../../Components/Alert/index";

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [modalInformation, setModalInformation] = useState(false);
    const [alertInformation, setAlertInformation] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const { tokenJWT, username } = useContext(AutenticacaoContext);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        async function fetchTasks(tokenJWT) {
            try {
                const result = await getAllTasks(tokenJWT);
                setTasks(result);
            } catch (error) {
                console.log('Erro ao obter tarefas: ', error);
            }
        }
        if (isFocused) {
            fetchTasks(tokenJWT);
        }
    }, [isFocused]);

    const showDeleteAlert = (idTask) => {
        setAlertTitle('Deseja mesmo excluir sua tarefa?');
        setAlertMessage('Essa ação é irreversível e não terá como você desfazer após a confirmação.');
        setSelectedTaskId(idTask);
        setAlertInformation(true);
    }

    const handleConfirmDelete = async () => {
        if (selectedTaskId !== null) {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTaskId));
            await deleteTask(selectedTaskId, tokenJWT);
            setSelectedTaskId(null);
        }
        setAlertInformation(false);
    }

    const handleCancelDelete = () => {
        setSelectedTaskId(null);
        setAlertInformation(false);
    }

    const fnGoToEdit = async (idTask) => {
        const result = await getTaskById(idTask, tokenJWT);
        if (result) {
            navigation.navigate('EditTodo', { objEdit: result })
        } else {
            console.log('Algo deu errado');
        }
    }

    const fnFinishTask = async (idTask) => {
        const result = await finishTask(idTask, tokenJWT);
        if (result) {
            const updateDatas = await getAllTasks(tokenJWT);
            setTasks(updateDatas);
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

                {tasks.length <= 0 ? (
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
                                onFinish={() => fnFinishTask(item.id)}
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
                state={alertInformation}
                setVisible={setAlertInformation}
                title={alertTitle}
                message={alertMessage}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </SafeAreaView>
    );
}

export default ToDoList;