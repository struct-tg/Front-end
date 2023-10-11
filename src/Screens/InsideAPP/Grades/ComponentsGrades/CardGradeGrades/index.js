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
} from "./StylesCardGrades";

const CardGradesComponent = ({ titleGrades, status, onDelete, onEdit, onSelect, isModify }) => {

    return (
        <CardGrades onPress={onEdit}>
            <TopBlock>
                <TitleCardGrades>{titleGrades}</TitleCardGrades>
                <LineBlock>
                    <SituationCardGrades>{`Situação: ${status  === 'DISAPPROVED' ? 'Reprovado' : 'Aprovado'}`}</SituationCardGrades>
                    <BotoesCardGrades>
                        <BotaoCardGrades onPress={onSelect}>
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
                </LineBlock>
            </TopBlock>
            <BottomBlock>
                <LineBlock>
                    <TitleNotesGrades>Nota Minima: 6.00</TitleNotesGrades>
                    <TitleNotesGrades>Nota Atual: 05.75</TitleNotesGrades>
                </LineBlock>
            </BottomBlock>
        </CardGrades>
    );
}

export default CardGradesComponent;