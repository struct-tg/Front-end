import React, { Fragment, useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ViewSettings, ViewTasks, TitleToDo, ViewBlock } from "./StylesToDoList.js";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Image } from "react-native";
import { getAllTasks, deleteTask, getTaskById } from "../../Services/Requisicoes/Tasks";
import { AutenticacaoContext } from "../../Contexts/UserContext.js";
import ModalComponent from "./ComponentsToDo/ModalInformationsToDo";
import CardTaskToDo from "./ComponentsToDo/CardTaskToDo";

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [modalInformation, setModalInformation] = useState(false);
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

    const fnDeleteTask = async (idTask) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== idTask))
        await deleteTask(idTask, tokenJWT);
    }

    const fnGoToEdit = async (idTask) => {
        const result = await getTaskById(idTask, tokenJWT);
        if (result) {
            navigation.navigate('EditTodo', { objEdit: result })
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
                                name={"search-circle-outline"}
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
                                onDelete={() => fnDeleteTask(item.id)}
                                onOpen={() => fnGoToEdit(item.id)}
                            />
                            }
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
        </SafeAreaView>
    );
}

export default ToDoList;