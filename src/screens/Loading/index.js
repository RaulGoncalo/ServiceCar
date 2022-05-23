import React, {useEffect, useContext} from "react";
import {Container, LoadingIcon, Text} from './styles'
import SvgLoading from '../../assets/svgLoading.svg'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import StatusBar from "../../components/StatusBar";
import Api from '../../Api';
import { UserContext } from '../../context/UserContext';

export default() => {

    const navigation = useNavigation();
    const { dispatch: userDispatch } = useContext(UserContext);

    useEffect(()=>{
        const checkLocationToken = async () => {
            const token = await AsyncStorage.getItem('token');

            if(token !== undefined && token !== null && token !== ''){
                const res = await Api.checkToken(token);

                if(res.status === 200){

                    const resJson = await res.json()
                    
                    userDispatch({
                        type: 'setUser',
                        payload:{
                            name: resJson.name,
                            email: resJson.email,
                            phone: resJson.phone,
                        }
                    });

                    navigation.reset({
                        index: 0,
                        routes: [{name: 'MainTab'}]
                    });
                    
                }else{
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'SignIn'}]
                    });
                }
            }else{
                navigation.reset({
                    index: 0,
                    routes: [{name: 'SignIn'}]
                });
            }
        }
        checkLocationToken();
    },[])

    return(
        <Container>
            <StatusBar/>
            <SvgLoading/>
            <LoadingIcon size = "large" color = "#FFFFFF"/>
            <Text>carregando</Text>
        </Container>
    );
}