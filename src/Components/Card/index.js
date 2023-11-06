import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
    Card,
    TopBlock,
    LineBlock,
    TitleCard,
    SituationCard,
    BotaoCard, 
    BotoesCard,
    BottomBlock,
    BottomInformation,
} from "./StylesCardDiscipline";

const CardComponent = ({ title, status, onDelete, onFinish, onEdit, isModify, noteMin, noteCurrent }) => {

    return (
        <Card onPress={onEdit}>
            <TopBlock>
                <TitleCard>{title}</TitleCard>
                <LineBlock>
                    <SituationCard>{'teste'}</SituationCard>
                    {isModify
                        &&
                        (<BotoesCard>
                            <BotaoCard onPress={onFinish}>
                                <Ionicons
                                    name={"checkmark-outline"}
                                    size={30}
                                    color={"white"}
                                />
                            </BotaoCard>
                            <BotaoCard onPress={onDelete}>
                                <Ionicons
                                    name={"trash-outline"}
                                    size={30}
                                    color={"white"}
                                />
                            </BotaoCard>
                        </BotoesCard>
                        )
                    }
                </LineBlock>
            </TopBlock>
            <BottomBlock>
                <LineBlock>
                    <BottomInformation>{`teste`}</BottomInformation>
                    <BottomInformation>{`Peso: ${noteCurrent === null ? '0.00' : noteMin.toFixed(2)}`}</BottomInformation>
                </LineBlock>
            </BottomBlock>
        </Card>
    );
}

export default CardComponent;