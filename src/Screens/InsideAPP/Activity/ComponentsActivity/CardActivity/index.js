import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import {
    CardActivity,
    SituationCardActivity,
    TitleCardActivity,
    TopBlock, BottomBlock,
    BotaoCardActivity,
    LineBlock,
    TitleNotesActivity,
    BotoesCardActivity
} from "./StylesCardActivity";

const CardActivityComponent = ({ titleActivity, typeAc, isFinishedActivity, type, onDelete, onEdit, isModify, data, note, weight }) => {

    const verifyTypeAc = (type) => {
        switch (type) {
            case 'EXAMINATION':
                return 'Prova'
            case 'WORK':
                return 'Trabalho';
            case 'ACTIVITY':
                return 'Atividade';
        }
    }

    return (
        <CardActivity onPress={onEdit}>
            <TopBlock>
                <TitleCardActivity>{titleActivity}</TitleCardActivity>
                <LineBlock>
                    <View>
                        <SituationCardActivity>{`Tipo de atividade: ${verifyTypeAc(type)}.`}</SituationCardActivity>
                        <SituationCardActivity>{`Data: ${data}`}</SituationCardActivity>
                    </View>
                    {isModify && isFinishedActivity
                        &&
                        (<BotoesCardActivity>
                            <BotaoCardActivity onPress={onDelete}>
                                <Ionicons
                                    name={"trash-outline"}
                                    size={30}
                                    color={"white"}
                                />
                            </BotaoCardActivity>
                        </BotoesCardActivity>
                        )
                    }
                </LineBlock>
            </TopBlock>
            <BottomBlock>
                <LineBlock>
                    <TitleNotesActivity>{`Nota: ${note.toFixed(2)}`}</TitleNotesActivity>

                    {typeAc
                        &&
                        (<TitleNotesActivity>{`Peso: ${weight === null ? '0.00' : weight.toFixed(2)}%`}</TitleNotesActivity>)
                    }
                </LineBlock>
            </BottomBlock>
        </CardActivity>
    );
}

export default CardActivityComponent;