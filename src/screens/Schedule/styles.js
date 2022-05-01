import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #1E1923;
    flex: 1;
`;

export const Title = styled.Text`
    font-weight: bold;
    font-size: 24px;
    color: #fff;
    margin-left: 10px;
`;

export const AreaHeader = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #221f29;
    height: 80px;

    elevation: 10;
`;