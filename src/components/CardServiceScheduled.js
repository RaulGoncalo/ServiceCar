import React from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import Api from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconDollar from '../assets/fi-rr-dollar';

const Card = styled.View`
    background-color: #221f29;
    width: 100%;
    min-height: 160px;

    justify-content: flex-start;
    align-items: flex-start;

    padding: 16px;

    margin-bottom: 24px;
    border-radius: 8px;
`;
const InfoHeader = styled.View`
    flex-direction: row;
`;

const InfoArea = styled.View`
    flex-direction: column;
    flex:1;
`;

const AreaValue = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;;
`;

const Title = styled.Text`
    font-weight: 700;
    font-size: 18px;
    color: #fff;
    margin:0px 0px 6px 0px;
`;

const SubTitle = styled.Text`
    font-weight: 500;
    font-size: 16px;
    color: #fff;
    margin:0px 0px 0px 0px;
`;

const InfoScheduled = styled.View`
    flex: 1;
    width: 100%;
    flex-direction: row;
    
    padding: 10px;
    justify-content: space-between;
    align-items: flex-end;

`;

const AreaScheduled =styled.View`
    border: 1px #fff;
    border-radius: 4px;
    padding: 5px;
`;

const ButtonCancel = styled.TouchableOpacity`
    border-radius: 8px;
    width: 100%;
    height: 24px;
    
    margin-top: 20px;

    background-color: #ff0043;
    opacity: 0.8;
    justify-content: center;
    align-items: center;
`;

const TextButton = styled.Text`
    font-weight: 400;
    font-size: 14px;
    color: #fff;
`;

export default ({data, cancelSchedule}) =>{
    
    const formatDate = (date) =>{
        const dateFormt = date.split("T")[0].split("-")[2]+"/"+date.split("T")[0].split("-")[1]+"/"+date.split("T")[0].split("-")[0]
        
        return dateFormt;
    }

    const handleClickCancelSchedule = async () =>{

        Alert.alert("Cancelar","Agendamento realizado", [{ text : "Ok", onPress : () => navigation.navigate('Schedule')}]);

        const token = await AsyncStorage.getItem('token');
        

        Alert.alert("Cancelar?", "Deseja realmente cancelar este serviço?", [
            { text : "Ok", 
                onPress : async () => {
                    const res = await Api.cancelSchedule(token, data.id);

                    if(res.status === 200){
                        cancelSchedule()
                    }
                }
            },
            {
                text : "Cancelar"
            }
        ]);
        
    }

    return(
        <Card>
            <InfoHeader>
                <InfoArea>
                    <Title>
                        {data.service}
                    </Title>

                    <SubTitle>
                        {data.nomeEmpresa}
                    </SubTitle>
                
                </InfoArea>

                <AreaValue>
                    <IconDollar width = '18' height = '18' fill = "#ff0043"/>
                    <SubTitle>
                        {data.price}
                    </SubTitle> 
                </AreaValue>
            </InfoHeader>

            <InfoScheduled>
                <AreaScheduled>
                    <SubTitle>
                        {formatDate(data.dataservico)}
                    </SubTitle>
                </AreaScheduled>

                <AreaScheduled>
                    <SubTitle>
                        {data.horaservico.split("-")[0] + " horas"}
                    </SubTitle>
                </AreaScheduled>
            </InfoScheduled>
            
            {
                data.statusagenda == 0 || data.statusagenda == 1 ?

                <ButtonCancel onPress = {handleClickCancelSchedule}>
                    <TextButton>Cancelar</TextButton>
                </ButtonCancel>

                :

                <></>
            }

        </Card>
    )
}