import React from 'react';
import {
    Card,
    ViewText,
    CardTitle,
    CardBlockNote,
    CardTextStatus,
    CardButton
} from "./StylesCardGrades.js";
import { Ionicons } from "@expo/vector-icons";

const CardGrades = ({ titleGrades, status, onOpen, onDelete, onActivity, activity }) => {
    return (
        <Card onPress={onOpen}>
            <ViewText>
                <CardTitle>{titleGrades}</CardTitle>
            </ViewText>

            <CardBlockNote>
                <CardTextStatus>{status == 'DISAPPROVED' ? 'Reprovado' : 'Aprovado'}</CardTextStatus>
            </CardBlockNote>

            <CardButton>
                <Ionicons
                    name={"school-outline"}
                    size={30}
                    color={activity ? "#d7d7d9" : "gray"}
                    onPress={onActivity}
                />
            </CardButton>
            <CardButton>
                <Ionicons
                    name={"trash-outline"}
                    size={30}
                    color={"white"}
                    onPress={onDelete}
                />
            </CardButton>
        </Card>
    )
}

export default CardGrades;