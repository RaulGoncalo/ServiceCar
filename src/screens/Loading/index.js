import React, {useEffect} from "react";
import {Container, LoadingIcon, Text} from './styles'
import SvgLoading from '../../assets/svgLoading.svg'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import StatusBar from "../../components/StatusBar";
import Api from '../../Api';
import {alert} from 'react-native';

export default() => {

    const navigation = useNavigation();

    useEffect(()=>{
        const checkLocationToken = async () => {
            const token = await AsyncStorage.getItem('token');

            const res = await Api.checkToken(token);

            if(token != null){
                if(res.status == 200){
                    navigation.reset({
                        routes: [{name: 'MainTab'}]
                    });
                }else{
                    navigation.reset({
                        routes: [{name: 'SignIn'}]
                    });
                }
            }else{
                navigation.reset({
                    routes: [{name: 'SignIn'}]
                });
            }
        }
        checkLocationToken();
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