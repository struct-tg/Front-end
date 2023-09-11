import React from 'react';
import {
    Card,
    ViewText,
    CardTitle,
    CardSubTitle,
    CardBlockNote,
    CardTextNote,
    CardButton
} from "./StylesCardGrades.js";
import { Ionicons } from "@expo/vector-icons";

const CardGrades = ({ titleGrades, status, note }) => {
    return (
        <Card>
            <ViewText>
                <CardTitle>{titleGrades}</CardTitle>
                <CardSubTitle>{status}</CardSubTitle>
            </ViewText>

            <CardBlockNote>
                <CardTextNote>{`Nota: ${note}`}</CardTextNote>
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