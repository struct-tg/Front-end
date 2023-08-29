import React, { useEffect, useState } from "react";
import { View, ContainerToDo, ViewSettings, ViewTasks } from "../../screens/ToDoList/StylesToDoList.js";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CardTask from "../../Components/CardTask";

const ToDoList = ({ route }) => {
    const [tasks, setTasks] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        if (route.params && route.params.datasForm) {
            const { datasForm } = route.params;
            setTasks(prevTasks => [...prevTasks, datasForm]);
        }
    }, [route.params]);

    const goToAddTodo = () => {
        navigation.navigate('AddTodo');
    }

    const deleteTask = (item) => {
        setTasks((tasks) => tasks.filter((task) => item.id !== task.id));
    }

    const goToEdit = (item) => {
        navigation.navigate('EditTodo', { objEdit: item });
    }

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
            </View>
        </ContainerToDo>
    );
}

export default ToDoList;