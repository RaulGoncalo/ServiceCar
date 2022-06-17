import React, {useContext} from 'react'; 
import styled from 'styled-components/native';
import IconClose from '../../../assets/fi-rr-angle-down';
import IconSignOut from '../../../assets/fi-rr-sign-out';
import IconArrowRight from '../../../assets/fi-rr-arrow-small-right';
import { useNavigation } from '@react-navigation/native';
import {UserContext} from '../../../context/UserContext'

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
    margin-bottom: 8px;
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

const TextInfos = styled.Text`
    color: #fff;
    font-weight: 500;
    font-size: 18px;

    margin-top: 8px;
`;

const Divider = styled.View`
    flex-direction: row;
    height: 1px;
    width: 100%;
    background-color: #ff0043;

`;

const Area = styled.View`
    padding: 20px;
    width: 100%;
    height: 80px;
    flex-direction: row;

    align-items: center;
    justify-content: space-between;
`;



export default ({onRequestClose, logout}) => {
    const navigation = useNavigation();
  
    const {state : user} = useContext(UserContext);

    const abrevia = (name) =>{
        const nome = name.replace(/\s(de|da|dos|das)\s/g, ' ').trim();

        return nome.split(' ')
            .map((parte, index) => (index == 0 || index == 1) ? parte[0] : `${parte[0]}.` )
            .join(' ');
    }

    return(
        <Body>
            <Close>
                <AreaIcon onPress = {()=> onRequestClose()}>
                    <IconClose  width = "24px" height = "24px" fill = "#fff"/>
                </AreaIcon>

                <AreaIcon onPress = {()=> logout()}>
                    <IconSignOut width = "24px" height = "24px" fill = "#fff"/>
                </AreaIcon>
            </Close>

            <AreaHeader>
                <Initials>
                    <TextInitials>
                        {abrevia(user.name)}
                    </TextInitials>
                </Initials>

                <TextInfos>
                    {user.email}
                </TextInfos>
            </AreaHeader>

            <Divider/>
                
            <Area>
                <TextInfos>Meus dados</TextInfos>

                <AreaIcon onPress = {() => navigation.navigate('ChangeData', user)}>
                    <IconArrowRight width = "24px" height = "24px" fill = "#fff"/>
                </AreaIcon>
            </Area>
           
            <Divider/>

           <Area>
                <TextInfos>Trocar senha</TextInfos>

                <AreaIcon onPress = {() => navigation.navigate('ChangePassword')}>
                    <IconArrowRight width = "24px" height = "24px" fill = "#fff"/>
                </AreaIcon>
           </Area>
        </Body>
    );
}

