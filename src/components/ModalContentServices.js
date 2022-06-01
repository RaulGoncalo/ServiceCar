import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import CardService from './CardService';

import Eletrica from '../assets/svgAvatar/svgEletrica.svg';
import Funilaria from '../assets/svgAvatar/svgFunilaria.svg';
import Limpeza from '../assets/svgAvatar/svgLimpeza.svg';
import Mecanica from '../assets/svgAvatar/svgMecanica.svg';
import Pintura from '../assets/svgAvatar/svgPintura.svg';
import Outros from '../assets/svgAvatar/svgOutros.svg';

import Star from '../assets/fi-rr-star';
import IconClose from '../assets/fi-rr-angle-down';
import StarFilled from '../assets/starFilled';
import Api from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Modal from '../components/Modal';
import ModalContentSchedule from './ModalContentSchedule';


const Body = styled.View`
    width: 100%;
    max-height: 100%;
    margin-bottom: 16px;
`;

const AreaHeader = styled.View`
    flex-direction: row;
`;

const Svg = styled.View`
    margin-top: 10px;
`;

const AreaTitle = styled.View`
    flex-direction: column;    
    width: 220px;
    margin-top: 10px;
`;
const Title = styled.Text`
    font-weight: bold;
    font-size: 22px;
    color: #fff;
    margin:0px 32px 0px 0px;
`;

const Desc = styled.Text`

`;

const Favorite = styled.View`
    flex: 1;
    max-width: 30px;
    flex-direction: column;
    margin-top: 10px;
    margin-right: 20px;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`;

const AreaIcon = styled.TouchableOpacity`
    flex-direction: column;
    padding: 5px;
`;

const Sevices = styled.ScrollView`
    flex-direction: column;
    padding: 10px;
    margin-top: 20px;
`;

const SubTitle = styled.Text`
    font-weight: 600;
    font-size: 18px;
    color: #fff;
    margin:0px 0px 10px 0px;
`;

const Close = styled.View`
    flex-direction: row;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 5px;
`;

const AreaIconClose = styled.TouchableOpacity`
    padding: 5px;
`;

const IconLoading = styled.ActivityIndicator`
    margin: 30px 0px 30px 0px;
`;


export default (props) => {
    const specialty = props.data.specialty
    
    const [isLoading, setIsloading] = useState();
    const [isFavorite, setIsFavorite] = useState();

    const [data, setData] = useState('');
    const [listServices, setListServices] = useState([])

    const [isModalVisible, setModalVisible] = useState(false); 
    
    useEffect(()=>{

        if(props.data.id){
            async function getServices() {
                setIsloading(true)
        
                const token = await AsyncStorage.getItem('token');
                
                const resIsFavorite = await Api.getfavorites(token, props.data.id);

                if(resIsFavorite.status === 200){
                    setIsFavorite(true)
                }else{
                    setIsFavorite(false)
                }
                const res = await Api.services(token, props.data.id);

                if(res.status === 200){
                    const json = await res.json();
                    setListServices(json.services);
                    
                }else{
                    alert("Ocorreu um problema")
                }
        
                setIsloading(false)
            }

            getServices()
        }
    },[props]);


    
    const handleFavorite = async () => {
        const token = await AsyncStorage.getItem('token')

        if(isFavorite){
            const res =await Api.deleteFavorite(token, props.data.id)

            if(res.status === 201){
                setIsFavorite(!isFavorite)
            }
        }else{
            const res = await Api.favorite(token, props.data.id)

            if(res.status === 201){
                setIsFavorite(!isFavorite)
            }
        }
    }

    return(
        
        <Body>
            <Close>
                <AreaIconClose onPress = {()=> props.onRequestClose()}>
                    <IconClose  width = "24px" height = "24px" fill = "#fff"/>
                </AreaIconClose>
            </Close>

            <AreaHeader>
                <Svg>
                    {
                        specialty == "Elétrica" ? <Eletrica width = "110" height = "110"fill = "#FFF"/> 
                        : 
                        specialty == "Funilaria" ? <Funilaria width = "110" height = "110" fill = "#FFF"/> 
                        :
                        specialty == "Limpeza" ? <Limpeza width = "110" height = "110" fill = "#FFF"/> 
                        :
                        specialty == "Mecânica" ? <Mecanica width = "110" height = "110" fill = "#FFF"/> 
                        :
                        specialty == "Pintura" ? <Pintura width = "110" height = "110" fill = "#FFF"/> 
                        :
                        <Outros width = "110" height = "110" fill = "#FFF"/>
                    }
                </Svg>
                <AreaTitle>
                    
                    <Title>
                        {props.data.nomeEmpresa}
                    </Title>
                    
                    <Desc>
                        Empresa especializada em {specialty}
                    </Desc>
                </AreaTitle>
                          
                <Favorite>
                    <AreaIcon onPress = {handleFavorite}>
                        {
                            isFavorite
                            ? 
                                <StarFilled width = "24px" height = "24px" fill = "#ff0043"/>
                            :
                                <Star width = "22px" height = "22px" fill = "#ff0043"/>  
                        }
                    </AreaIcon>
                </Favorite>
            </AreaHeader>   
            {
                isLoading?
                <IconLoading size = "large" color = "#fff" width = "28px" height = "28px"/>:

                <Sevices>
                    <SubTitle>
                        Lista de serviços
                    </SubTitle>
                        {
                            listServices.map((item, index)=>{
                                return <CardService 
                                    key = {index} 
                                    data = {item}
                                    showModal = {() => setModalVisible(!isModalVisible)}
                                    setData = {() => setData(item)}
                                />
                            })
                        }
                </Sevices>
            }

            <Modal 
                modalActive = {isModalVisible} 
                modalCancel ={() => setModalVisible(false)} 
                children = {
                    <ModalContentSchedule  
                    service = {data} 
                    onRequestClose = {() => setModalVisible(false)}
                />}
            />
        
        </Body>
    );
}

