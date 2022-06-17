import React from 'react';
import styled from 'styled-components/native';

export const Container =  styled.ScrollView`
    flex : 1;
    background-color: #1E1923;
    padding: 20px;
`;

export const AreaWelcome = styled.View`
    flex: 1;
    justify-content: center;
    align-items : center;

    margin-top: 24px;
    margin-bottom: 32px;
`;

export const TitleWelcome = styled.Text`
    font-family: 'Poppins-Bold';
    font-size: 28px;
    color: #ffffff;
    margin-bottom:8px;
    margin-left: 10px;
`;

export const SubTitle = styled.Text`
    font-size: 20px;
    font-family: 'Poppins-Bold';
    color: #ffffff;
    margin-top: 16px;
    margin-bottom:32px;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 55px;
    background-color: #ff0043;
    border-radius: 8px;
    justify-content: center;
    align-items : center;
`;

export const CustomButtonText = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 20px;
    color: #fff;
`;

export const InputArea = styled.View`
    width: 100%;
`;

export const InputAreaRegister = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;

export const SignMessageButtonForget = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 30px;
    width: 160px;
`;

export const SignMessageButtonTextForget = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 14px;
    color: #ffffff;
`;

export const SignMessageButtonText2 = styled.Text`
    font-size: 16px;
    color: #ffffff;
    font-family: 'Poppins-Bold';
`;

export const IconLoading = styled.ActivityIndicator`
    margin: 30px 0px 30px 0px;
    
`;