import React, { Fragment, useState, useEffect, useContext } from "react"
import { ContentContainer, ViewContainer, ViewSettings, ContainerImageInitial, Title } from "../../../Styles/DefaultStyles/index.js";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createActivity, getActivityById, getAllActivity } from "../../../Services/Requests/Activity";
import { AutenticacaoContext } from "../../../Contexts/UserContext.js";
import useMocks from "../../../Mocks/index.js";
import ResponsiveImage from "react-native-responsive-image";
import SpinnerComponent from "../../../Components/Spinner";

const Activity = () => {
    const { ActivityMocks } = useMocks();
    const { tokenJWT } = useContext(AutenticacaoContext);
    const [activities, setActivities] = useState([]);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useEffect(() => {

    }, [isFocused]);

    return (
        <ContentContainer>
            <ViewContainer>
                <ViewSettings>
                    <TouchableOpacity onPress={() => navigation.navigate('AddActivity')}>
                        <Ionicons
                            name={"add-circle-outline"}
                            size={35}
                            color={"white"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('FilterActivity')}>
                        <Ionicons
                            name={"options-outline"}
                            size={35}
                            color={"white"}
                        />
                    </TouchableOpacity>
                </ViewSettings>

                <Title>{ActivityMocks.ActivityScreen.title}</Title>
                <ContainerImageInitial>
                    <ResponsiveImage
                        source={ActivityMocks.ActivityScreen.image.content}
                        initWidth={ActivityMocks.ActivityScreen.image.width}
                        initHeight={ActivityMocks.ActivityScreen.image.height}
                        resizeMode={ActivityMocks.ActivityScreen.image.rezide}
                    />
                </ContainerImageInitial>
            </ViewContainer>
        </ContentContainer>
    );
}

export default Activity;