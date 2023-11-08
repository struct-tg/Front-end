import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
    CardTask,
    TitleCardTask,
    SituationCardTask,
    TopBlock, BottomBlock,
    BotaoCardTask,
    LineBlock,
    TitleNotesTask,
    BotoesCardTask
} from "./StylesCardTask";

const CardTaskComponent = ({ title, situation, date, isModify, onOpen, onDelete, onFinish }) => {
    
    return (
        <CardTask onPress={onOpen}>
            <TopBlock>
                <TitleCardTask>{title}</TitleCardTask>
                <LineBlock>
                    <SituationCardTask>{`Situação: ${situation === 0 ? 'Pendente.' : situation === 1 ? 'Concluida.' : 'Atrasada.'}`}</SituationCardTask>
                    {isModify
                        ? <BotoesCardTask>
                            <BotaoCardTask>
                                <Ionicons
                                    name={"checkmark-outline"}
                                    size={30}
                                    color={"white"}
                                    onPress={onFinish}
                                />
                            </BotaoCardTask>
                            <BotaoCardTask >
                                <Ionicons
                                    name={"trash-outline"}
                                    size={30}
                                    color={"white"}
                                    onPress={onDelete}
                                />
                            </BotaoCardTask>
                        </BotoesCardTask>
                        :
                        null
                    }
                </LineBlock>
            </TopBlock>
            <BottomBlock>
                <LineBlock>
                    <TitleNotesTask>{`Data de previsão: ${date}`}</TitleNotesTask>
                </LineBlock>
            </BottomBlock>
        </CardTask>
    );
}

export default CardTaskComponent;