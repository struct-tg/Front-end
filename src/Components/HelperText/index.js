import * as React from 'react';
import { HelperText } from 'react-native-paper';

const HelperTextComponent = ({ helperType, fnError, helperText }) => {
    return (
        <HelperText type={helperType} visible={fnError}>
            {helperText}
        </HelperText>
    );
};

export default HelperTextComponent;