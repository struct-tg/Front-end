import React, { Fragment, useState } from "react";
import ModalComponent from "../ModalTaskForms";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card, TituloCard, BotaoCard, BotoesCard } from "../../styles/ToDoList";


const CardTask = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <Fragment>
            <Card onPress={toggleModal}>
                <TituloCard>
                    <Text>Task 1</Text>
                </TituloCard>

                <BotoesCard>
                    <BotaoCard >
                        <Ionicons
                            name={"checkmark-outline"}
                            size={30}
                            color={"white"}
                        />
                    </BotaoCard>

                    <BotaoCard>
                        <Ionicons
                            name={"trash-outline"}
                            size={30}
                            color={"white"}
                        />
                    </BotaoCard>
                </BotoesCard>
            </Card>

            <ModalComponent
                visible={isModalVisible}
                state={toggleModal}
            />
        </Fragment>
    );
}

export default CardTask;