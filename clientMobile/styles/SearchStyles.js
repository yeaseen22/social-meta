import styled from 'styled-components';

export const Container = styled.View`
    margin-top: 80px;
    align-items: center;
    justify-content: center;
`;

export const InputWrapper = styled.View`
    flex-direction: row;    
    align-items: center;
    border: 1px solid lightgrey;
    margin-left: 40px;
    margin-right: 40px;
    border-radius: 50px;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 10px;
`;

export const TextInput = styled.TextInput`
    padding: 10px;
    width: 100%;
    height: 50px;
    font-size: 20px;
    text-align: center;
`;

export const InnerContainer = styled.View`
    height: 100%;
`;

export const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;