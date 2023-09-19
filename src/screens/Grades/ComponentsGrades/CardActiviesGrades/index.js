import React from 'react';
import { Ionicons } from "@expo/vector-icons";
import {
    BlockInformation,
    Card,
    TituloCard,
    DateCard,
    InlineBlock,
    BlockGradeInformation,
    TextBlockGradeInformation,
    BotaoCard
} from "./StylesCardActivies";

const CardActivies = () => {
    return (
        <Card>
            <InlineBlock>
                <BlockInformation>
                    <TituloCard>Atividades</TituloCard>
                    <DateCard>12/03/2003</DateCard>
                </BlockInformation>


                <BlockGradeInformation>
                    <TextBlockGradeInformation>Nota: 7,50</TextBlockGradeInformation>
                </BlockGradeInformation>
                <BlockGradeInformation>
                    <TextBlockGradeInformation>Peso: 0,50</TextBlockGradeInformation>
                </BlockGradeInformation>

                <BotaoCard>
                    <Ionicons
                        name={"trash-outline"}
                        size={30}
                        color={"white"}
                    />
                </BotaoCard>


            </InlineBlock>
        </Card>
    )
}

export default CardActivies;