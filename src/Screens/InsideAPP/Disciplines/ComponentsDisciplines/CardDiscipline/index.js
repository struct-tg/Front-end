import React, { Fragment } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
    CardGrades,
    SituationCardGrades,
    TitleCardGrades,
    TopBlock, BottomBlock,
    BotaoCardGrades,
    LineBlock,
    TitleNotesGrades,
    BotoesCardGrades
} from "./StylesCardDiscipline";

const CardDisciplineComponent = ({ titleGrades, status, onDelete, onOFF, onEdit, onSelectActivity, isModify, noteMin, noteCurrent }) => {

    return (
        <CardGrades onPress={onEdit} onLongPress={onOFF}>
            <TopBlock>
                <TitleCardGrades>{titleGrades}</TitleCardGrades>
                <LineBlock>
                    <SituationCardGrades>{`Situação: ${status === null ? 'Em andamento' : noteCurrent >= noteMin ? 'Aprovado' : 'Reprovado'}`}</SituationCardGrades>
                    {isModify
                        &&
                        (<BotoesCardGrades>
                            <BotaoCardGrades onPress={onSelectActivity}>
                                <Ionicons
                                    name={"school-outline"}
                                    size={30}
                                    color={"white"}
                                />
                            </BotaoCardGrades>
                            <BotaoCardGrades onPress={onDelete}>
                                <Ionicons
                                    name={"trash-outline"}
                                    size={30}
                                    color={"white"}
                                />
                            </BotaoCardGrades>
                        </BotoesCardGrades>
                        )
                    }
                </LineBlock>
            </TopBlock>
            <BottomBlock>
                <LineBlock>
                    <TitleNotesGrades>{`Nota Minima: ${noteMin.toFixed(2)}`}</TitleNotesGrades>
                    <TitleNotesGrades>{`Nota Atual: ${noteCurrent === null ? '0.00' : noteMin.toFixed(2)}`}</TitleNotesGrades>
                </LineBlock>
            </BottomBlock>
        </CardGrades>
    );
}

export default CardDisciplineComponent;