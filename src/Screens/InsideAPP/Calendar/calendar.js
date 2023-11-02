import React, { useState } from "react";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ContentContainer, ViewSettings } from "../../../Styles/DefaultStyles/index";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import ModalInformationCalendar from "./ComponentsCalendar/ModalInformationsCalendar/ModalCalendar";


LocaleConfig.locales['fr'] = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ],
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ],
    monthNamesShort: ['Jan.', 'Fer.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set', 'Out.', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
    today: "Hoje"
};

LocaleConfig.defaultLocale = 'fr';

const CalendarTeste = () => {
    const [selected, setSelected] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'red' };
    const massage = { key: 'massage', color: 'ligth-blue', selectedDotColor: 'green' };
    const workout = { key: 'workout', color: 'green' };

    return (
        <ContentContainer>
            <ViewSettings>
                <TouchableOpacity>
                    <Ionicons
                        name="help-circle-outline"
                        size={35}
                        color={"white"}
                        onPress={() => setModalVisible(true)}
                    />
                </TouchableOpacity>
            </ViewSettings>
            <Calendar
                onDayPress={day => {
                    setSelected(day.dateString);
                    console.log('dia', day);
                }}
                markingType={'multi-dot'}
                markedDates={{
                    [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'},
                    '2023-11-02': {dots: [vacation, massage, workout], selectedColor: 'blue'},
                    '2023-11-03': {dots: [massage, workout]}
                  }}
            />

            <ModalInformationCalendar
                state={modalVisible}
                setModalInformation={setModalVisible}
            />
        </ContentContainer>
    );
}

export default CalendarTeste;