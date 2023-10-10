import React from "react";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card, TituloCard, BotaoCard, BotoesCard, DateInformation } from "./StylesCardTask.js";

const CardTask = ({ title, date, state, onDelete, onOpen, onFinish, isModify }) => {
    let borderColorStyle = {};

    if (state === 1) {
        borderColorStyle = {
            borderColor: '#02f78d',
            backgroundColor: 'rgba(255, 255, 255, 0.10)',
        };
    } else if (state === 3) {
        borderColorStyle = {
            borderColor: '#fa2d6a',
        };
    }

    return (
        <Card onPress={onOpen} style={borderColorStyle}>
            <TituloCard>
                <Text>{title}</Text>
            </TituloCard>

            {isModify ? <BotoesCard>
                <BotaoCard >
                    <Ionicons
                        name={"checkmark-outline"}
                        size={30}
                        color={state !== 0 ? "#02f78d" : "white"}
                        onPress={onFinish}
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
            </BotoesCard> : <DateInformation>{date}</DateInformation>
            }
        </Card>
    );
}

export default CardTask;