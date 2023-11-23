import React from 'react';
import { CardFinishedHome, CardTitle, BotaoCard, NoteCard } from "./StylesCardFinishedsHome.js";
import { Ionicons } from "@expo/vector-icons";

const CardsHome = ({ name, note, onOpen, isTask }) => {
    return (
        <CardFinishedHome onPress={onOpen}>
            <CardTitle>{name}</CardTitle>
            {isTask ? <BotaoCard>
                <Ionicons
                    name={"time-outline"}
                    size={30}
                    color={"white"}
                />
            </BotaoCard> :
                <NoteCard>{`Nota: ${note === null ? '0.00' : note.toFixed(2)}`}</NoteCard>
            }
        </CardFinishedHome>
    )
}

export default CardsHome;