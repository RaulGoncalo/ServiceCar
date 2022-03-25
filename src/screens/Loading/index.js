import React, {useEffect} from "react";
import {Container, LoadingIcon, Text} from './styles'
import SvgLoading from '../../assets/svgLoading.svg'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import StatusBar from "../../components/StatusBar";

export default() => {

    const navigation = useNavigation();

    useEffect(()=>{
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            await AsyncStorage.removeItem('token');
            
            if(token){
                //validar token
            }else{

                navigation.navigate('SingIn')
            }
        }
        checkToken();
    },)

    return(
        <Container>
            <StatusBar/>
            <SvgLoading/>
            <LoadingIcon size = "large" color = "#FFFFFF"/>
            <Text>carregando</Text>
        </Container>
    );
}