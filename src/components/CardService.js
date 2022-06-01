import React from 'react';
import styled from 'styled-components/native';
import IconDollar from '../assets/fi-rr-dollar';

const Card = styled.View`
    width: 100%;
    height: 60px;
    
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 16px;

`;

const Title = styled.Text`
    font-weight: 700;
    font-size: 16px;
    color: #fff;
    margin:0px 0px 0px 0px;
`;

const TextInfo = styled.Text`
    font-weight: 400;
    font-size: 14px;
    color: #fff;
    margin:0px 0px 0px 0px;
`;


const Infos = styled.View`
    max-width: 250px;
`;

const AreaValue = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const ButtonToSchedule = styled.TouchableOpacity`
    width: 80px;
    height: 35px;

    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: #ff0043;
    border-radius: 8px;
`;


export default (props) => {

    return(
        <Card>
            <Infos>
                <Title numberOflines = {1}> 
                {
                    props.data.service.length < 20 ?
                    props.data.service :
                    `${props.data.service.substring(0, 20)}...`
                }
                </Title>
                <AreaValue>
                    <IconDollar width = '18' height = '18' fill = "#ff0043"/>
                    <TextInfo>
                        {props.data.price}
                    </TextInfo> 
                </AreaValue>
            </Infos>
            
            <ButtonToSchedule
               onPress= {
                () => {
                    props.setData();
                    props.showModal();
                }
            }
            >
                <TextInfo>
                    Agendar
                </TextInfo>
            </ButtonToSchedule>
        </Card>
    );
}

