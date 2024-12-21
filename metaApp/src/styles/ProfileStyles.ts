import styled from 'styled-components';
import { Dimensions } from 'react-native';

// Get the screen width
const screenHeight = Dimensions.get('window').height;

export const Container = (styled as any).View`
    flex: 1;
    width: 100%;
    align-items: center;
    background-color: #fff;
    padding-left: 5px;
    padding-right: 5px;
    max-height: ${screenHeight - 120};
`;

