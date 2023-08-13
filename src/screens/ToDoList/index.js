import React from "react";
import { SafeAreaView, Text, View } from "react-native";

const ToDoList = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>

            <View style={{ flex: 0.8, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Text>ToDoList</Text>
            </View>
        </SafeAreaView>
    );
}

export default ToDoList;