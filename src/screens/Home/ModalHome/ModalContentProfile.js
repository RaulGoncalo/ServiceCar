import React, {useState, useEffect} from 'react'; 
import styled from 'styled-components/native';
import IconClose from '../../../assets/fi-rr-angle-down';
import IconSignOut from '../../../assets/fi-rr-sign-out';

const Body = styled.View`
    width: 100%;
    max-height: 100%;
    margin-bottom: 16px;
`;

const Close = styled.View`
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
    margin-top: 15px;
    padding: 10px;
`;

const AreaIcon = styled.TouchableOpacity`
    padding: 5px;
`;

const AreaHeader = styled.View`
    padding: 20px;

    justify-content: center;
    align-items: flex-start;
`;

const Initials = styled.View`
    width: 80px;
    height: 80px;

    border-radius: 40px;

    justify-content: center;
    align-items: center;

    background-color: #ff0043;
`;

const TextInitials = styled.Text`
    color: #fff;
    font-weight: 700;
    font-size: 24px;
`;

const TextEmail = styled.Text`
    color: #fff;
    font-weight: 500;
    font-size: 18px;

    margin-top: 8px;
`;

export default ({onRequestClose}) => {
  
    return(
        <Body>
            <Close>
                <AreaIcon onPress = {()=> onRequestClose()}>
                    <IconClose  width = "24px" height = "24px" fill = "#fff"/>
                </AreaIcon>

                <AreaIcon>
                    <IconSignOut width = "24px" height = "24px" fill = "#fff"/>
                </AreaIcon>
            </Close>

            <AreaHeader>
                <Initials>
                    <TextInitials>
                        RS
                    </TextInitials>
                </Initials>

                <TextEmail>
                    raulpoyer@gmail.com
                </TextEmail>
            </AreaHeader>
           
        </Body>
    );
}

