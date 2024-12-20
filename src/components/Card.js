import React from 'react';
import styled from 'styled-components/native';
import Eletrica from '../assets/svgAvatar/svgEletrica.svg';
import Funilaria from '../assets/svgAvatar/svgFunilaria.svg';
import Limpeza from '../assets/svgAvatar/svgLimpeza.svg';
import Mecanica from '../assets/svgAvatar/svgMecanica.svg';
import Pintura from '../assets/svgAvatar/svgPintura.svg';
import Outros from '../assets/svgAvatar/svgOutros.svg';
import IconGo from '../assets/fi-rr-undo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';

const Card = styled.View`
    background-color: #221f29;
    width: 100%;
    height: 180px;

    flex-direction: row;

    justify-content: flex-start;
    align-items: center;

    padding: 8px;

    margin-bottom: 24px;
    border-radius: 8px;
`;

const Title = styled.Text`
    font-weight: bold;
    font-size: 18px;
    color: #fff;
    margin:0px 0px 0px 0px;
`;

const TextInfos = styled.Text`
    font-weight: 400;
    font-size: 14px;
    color: #fff;
    margin:0px 0px 0px 0px;
`;

const Infos = styled.View`
    width: 180px;
`;

const Icon = styled.View`
    flex-direction: column;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`;

const AreaIcon = styled.TouchableOpacity`
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
`;

const Svg = styled.View`
`;

export default (props) => {
    const specialty = props.data.especialidade

    return(
        <Card>
            <Svg>
                {
                    specialty == "Elétrica" ? <Eletrica width = "120" height = "120"fill = "#FFF"/> 
                    : 
                    specialty == "Funilaria" ? <Funilaria width = "120" height = "120" fill = "#FFF"/> 
                    :
                    specialty == "Limpeza" ? <Limpeza width = "120" height = "120" fill = "#FFF"/> 
                    :
                    specialty == "Mecânica" ? <Mecanica width = "120" height = "120" fill = "#FFF"/> 
                    :
                    specialty == "Pintura" ? <Pintura width = "120" height = "120" fill = "#FFF"/> 
                    :
                    <Outros width = "120" height = "120" fill = "#FFF"/>
                }
            </Svg>

            <Infos>
                <Title>
                    {props.data.nomeEmpresa}
                </Title>

                <TextInfos>
                    {props.data.especialidade}
                </TextInfos>

                <TextInfos>
                    {props.data.cidade}
                </TextInfos>

                <TextInfos>
                    {props.data.email}
                </TextInfos>

                <TextInfos>
                    {props.data.telefone}
                </TextInfos>
            </Infos>

            <Icon>
                <AreaIcon 
                    onPress= {
                        () => {
                            props.setData();
                            props.showModal();
                        }
                    }
                >
                    <IconGo  width = "32" height = "32"fill = "#FFF"/>
                </AreaIcon>
            </Icon>
        </Card>
    );
}

