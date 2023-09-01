import React, { useEffect, useState } from "react";
import { View, ContainerToDo, ViewSettings, ViewTasks } from "../../screens/ToDoList/StylesToDoList.js";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import CardTask from "../../Components/CardTask";

const ToDoList = ({ route }) => {
    const [tasks, setTasks] = useState([]);
    const navigation = useNavigation();

    const goToAddTodo = () => {
        navigation.navigate('AddTodo');
    }

    const goToEdit = (item) => {
        navigation.navigate('EditTodo', { objEdit: item });
    }

    const deleteTask = (item) => {
        setTasks((tasks) => tasks.filter((task) => item.id !== task.id));
    }

    useEffect(() => {
        if (route.params && route.params.datasForm) {
            const { datasForm } = route.params;
            setTasks(prevTasks => [...prevTasks, { ...datasForm, subtasks: datasForm.subtasks.map(subtask => ({ id: subtask.id, text: subtask.text })) }]);
        }
        if (route.params && route.params.updatedTask) {
            const { updatedTask } = route.params;
            setTasks(prevTasks => prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
        }
    }, [route.params]);

    return (
        <ContainerToDo>
            <View>
                <ViewSettings>
                    <TouchableOpacity >
                        <Ionicons
                            name={"add-circle-outline"}
                            size={35}
                            color={"white"}
                            onPress={goToAddTodo}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons
                            name={"options-outline"}
                            size={35}
                            color={"white"}
                        />
                    </TouchableOpacity>
                </ViewSettings>


                {tasks.length <= 0 ? (
                    <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('./Home-Students.png')}
                            style={{ width: "100%", height: "50%" }}
                            resizeMode="cover"
                        />
                    </View>
                ) : (
                    <ViewTasks>
                        <FlatList
                            data={tasks}
                            renderItem={({ item }) => <CardTask
                                title={item.taskName}
                                onDelete={() => deleteTask(item)}
                                onOpen={() => goToEdit(item)}
                            />}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ViewTasks>
                )
                }
            </View>
        </ContainerToDo>
    );
}

export default ToDoList;