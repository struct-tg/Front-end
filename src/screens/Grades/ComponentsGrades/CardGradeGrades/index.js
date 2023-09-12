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

const CardGrades = ({ titleGrades, status }) => {
    return (
        <Card>
            <ViewText>
                <CardTitle>{titleGrades}</CardTitle>
            </ViewText>

            <CardBlockNote>
                <CardTextStatus>{status}</CardTextStatus>
            </CardBlockNote>

            <CardButton>
                <Ionicons
                    name={"trash-outline"}
                    size={30}
                    color={"white"}
                />
            </CardButton>
        </Card>
    )
}

export default CardGrades;