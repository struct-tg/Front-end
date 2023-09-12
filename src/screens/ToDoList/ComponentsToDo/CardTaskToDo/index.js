import React from "react";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card, TituloCard, BotaoCard, BotoesCard } from "./StylesCardTask.js";

const CardTask = ({ title, onDelete, onOpen }) => {
    return (
        <Card onPress={onOpen}>
            <TituloCard>
                <Text>{title}</Text>
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
                        onPress={onDelete}
                    />
                </BotaoCard>
            </BotoesCard>
        </Card>
    );
}

export default CardTask;