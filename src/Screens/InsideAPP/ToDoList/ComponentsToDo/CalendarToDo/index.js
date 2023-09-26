import React from "react";
import { View } from "react-native";
import { DataInput } from "../../../../../Components/Inputs";
import { convertISODateToSlashDateString } from "../../../../../Utils/Date/index";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Calendar = ({ state, setCalendarVisible, data, setData, disabled }) => {
    const showDatePicker = () => {
        setCalendarVisible(true);
    };

    const hideDatePicker = () => {
        setCalendarVisible(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        const formattedDate = convertISODateToSlashDateString(date);
        setData(formattedDate);
    };

    return (
        <View>
            <DataInput
                edit={false}
                value={data ? data : "Data de previsão de término da tarefa:"}
                fnModal={showDatePicker}
                disabled={disabled}
            />

            <DateTimePickerModal
                isVisible={state}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};

export default Calendar;