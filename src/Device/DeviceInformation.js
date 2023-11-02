import { Dimensions } from "react-native";

const deviceDimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};

export default deviceDimensions;