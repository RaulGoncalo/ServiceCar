import React from 'react';
import styled from 'styled-components/native';

export const Container =  styled.SafeAreaView`
    flex : 1;
    justify-content: center;
    align-items: center;
    background-color: #1E1923;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 100px;
`;

export const Text = styled.Text`
    margin-top: 8px;
    font-size: 20px;
    font-family: 'roboto';
    color: #fff;
`;