import React, { Fragment } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
    CardPomodoro,
    TimeCardPomodoro,
    TitleCardPomodoro,
    TopBlock, BottomBlock,
    BotaoCardPomodoro,
    LineBlock,
    TitleStopsPomodoro,
    BotoesCardPomodoro
} from "./StylesCardPomodoro";

const CardPomodoroComponent = ({ time, shortStop, longStop, onDelete, onEdit, onSelect, isModify }) => {
    const formatMinutes = (minutes) => {
        return String(minutes).padStart(2, "0");
    };

    const formattedTime = `${formatMinutes(time)}:00`;
    const formattedShortStop = `${formatMinutes(shortStop)}:00`;
    const formattedLongStop = `${formatMinutes(longStop)}:00`;

    return (
        <CardPomodoro onPress={onEdit}>
            <TopBlock>
                <TitleCardPomodoro>Pomodoro</TitleCardPomodoro>
                <LineBlock>
                    <TimeCardPomodoro>{formattedTime}</TimeCardPomodoro>
                    {isModify
                        ? <BotoesCardPomodoro>
                            <BotaoCardPomodoro onPress={onSelect}>
                                <Ionicons
                                    name={"alarm-outline"}
                                    size={30}
                                    color={"white"}
                                />
                            </BotaoCardPomodoro>
                            <BotaoCardPomodoro onPress={onDelete}>
                                <Ionicons
                                    name={"trash-outline"}
                                    size={30}
                                    color={"white"}
                                />
                            </BotaoCardPomodoro>
                        </BotoesCardPomodoro>
                        :
                        null
                    }
                </LineBlock>
            </TopBlock>
            <BottomBlock>
                <LineBlock>
                    <TitleStopsPomodoro>{`Pausa curta: ${formattedShortStop}`}</TitleStopsPomodoro>
                    <TitleStopsPomodoro>{`Pausa longa: ${formattedLongStop}`}</TitleStopsPomodoro>
                </LineBlock>
            </BottomBlock>
        </CardPomodoro>
    );
}

export default CardPomodoroComponent;