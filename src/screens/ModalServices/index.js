import React, {useState} from 'react';
import {
    OutsideModal,
    InsideModal,
    AreaHeader,
    Svg,
    AreaTitle,
    Title,
    Desc,
    Favorite,
    AreaIcon,
    Sevices,
    SubTitle,
    IconLoading,
} from './styles'
import { Modal, TouchableWithoutFeedback } from 'react-native';
import CardService from '../../components/CardService';
import Eletrica from '../../assets/svgAvatar/svgEletrica.svg';
import Funilaria from '../../assets/svgAvatar/svgFunilaria.svg';
import Limpeza from '../../assets/svgAvatar/svgLimpeza.svg';
import Mecanica from '../../assets/svgAvatar/svgMecanica.svg';
import Pintura from '../../assets/svgAvatar/svgPintura.svg';
import Outros from '../../assets/svgAvatar/svgOutros.svg';

import IconStar from '../../assets/fi-rr-star';
import IconStarFilled from '../../assets/starFilled.svg';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api';

export default (props) => {

    const specialty = props.data.especialidade
    const [isFavorite, setIsFavorite] = useState(props.data.favorite);
    
    const handleFavorite = async () =>{
        const token = await AsyncStorage.getItem('token');
        
        if(props.data.favorite){
            setIsFavorite(false)
            const res = await Api.deleteFavorite(token, props.data.id)
        }else{
            setIsFavorite(true)
            const res = await Api.favorite(token, props.data.id)
        }

    }



    return(
        <Modal
            animationType = 'slide'
            transparent = {true}
            visible ={props.modalActive}
            onRequestClose = {props.modalCancel}
        >
            <TouchableWithoutFeedback onPress={props.modalCancel}>
                <OutsideModal>
                    <TouchableWithoutFeedback>
                        <InsideModal>
                            <AreaHeader>
                                <Svg>
                                    {
                                        specialty == "Eletrica" ? <Eletrica width = "110" height = "110"fill = "#FFF"/> 
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
                                
                                <Favorite >
                                    <AreaIcon onPress ={handleFavorite}>
                                    {
                                        isFavorite?
                                            <IconStarFilled width = '26' height = '26' fill = "#ff0043"/>
                                        :
                                            <IconStar width = '26' height = '26' fill = "#ff0043"/>
                                    }
                                    </AreaIcon>
                                </Favorite>
                            </AreaHeader>   
                       
                            <Sevices>
                                <SubTitle>
                                    Lista de serviços
                                </SubTitle>
                                
                                <CardService data = {{nameService: 'Limpeza de estofados', value: '50'}}/>
                                <CardService data = {{nameService: 'Limpeza de estofados', value: '50'}}/>
                                <CardService data = {{nameService: 'Limpeza de estofados', value: '50'}}/>

                            </Sevices>
                        </InsideModal>
                    </TouchableWithoutFeedback>
                </OutsideModal>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
