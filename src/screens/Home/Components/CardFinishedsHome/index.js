import React from 'react';
import { CardFinishedHome, CardTitle, BotaoCard } from "./StylesCardFinishedsHome.js";
import { Ionicons } from "@expo/vector-icons";

const CardFinished = ({ name }) => {
    return (
        <CardFinishedHome>
            <CardTitle>{name}</CardTitle>
            <BotaoCard>
                <Ionicons
                    name={"checkmark-circle-outline"}
                    size={30}
                    color={"#02f78d"}
                />
            </BotaoCard>
        </CardFinishedHome>
    )
}

export default CardFinished;