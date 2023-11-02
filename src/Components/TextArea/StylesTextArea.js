import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

export default StyledInput = styled(TextInput)`
  background-color: ${(props) => (props.disabled ? '#ffffff' : '#ffffff')};
  border: 1.2px solid ${(props) => (props.disabled ? '#000000' : '#ccc')};
`;