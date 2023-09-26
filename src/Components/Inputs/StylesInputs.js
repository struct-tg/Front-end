import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

export const ContainerIconButton = styled.SafeAreaView`
    flex-direction: row;
    justify-content: space-between;
`;

export const ContainerIconInput = styled.View`
    flex-grow: 1;
`;

export const ContainerIcons = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const StyledInput = styled(TextInput)`
  background-color: ${(props) => (props.disabled ? '#ffffff' : '#dfdfdf')};
  border: ${(props) => (props.disabled ? '1.2px solid #000000' : '#dfdfdf')};
`;