import React, { useState } from "react";
import CardTask from "../../Components/CardTask";
import ModalComponent from "../../Components/ModalTaskForms";
import { View, ContainerToDo, ViewSettings, ViewTasks } from "../../styles/ToDoList";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const ToDoList = () => {
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const tasks = [1, 2, 3, 4, 5, 6];

    return (
        <ContainerToDo>
            <View>
                <ViewSettings>
                    <TouchableOpacity >
                        <Ionicons
                            name={"add-circle-outline"}
                            size={35}
                            color={"white"}
                            onPress={toggleModal}
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
                        renderItem={() =>
                            <CardTask />
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ViewTasks>
            </View>

            <ModalComponent
                visible={showModal}
                state={toggleModal}
            />
        </ContainerToDo>
    );
}

export default ToDoList;