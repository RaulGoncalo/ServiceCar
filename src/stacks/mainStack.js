import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from '../screens/Loading';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ResetPassword from '../screens/ResetPassword';
import MainTab from './MainTab';
import ModalServices from '../screens/ModalServices';


const Stack = createNativeStackNavigator();


export default() => {
    return(
        <Stack.Navigator
            initialRouteName = "Loading"
            screenOptions = {{
                headerShown : false,
                animation: 'default',
            }}
            
        >
            <Stack.Screen 
                name = "Loading" 
                component={Loading}
            />
            
            <Stack.Screen  
                name = "SignIn" 
                component={SignIn}
            />
            <Stack.Screen 
                name = "SignUp" 
                component={SignUp}
            />
            
            <Stack.Screen 
                name = "ResetPassword" 
                component={ResetPassword}
            />
            

            <Stack.Screen 
                name = "MainTab" 
                component = {MainTab}
                options = {
                    {
                        headerShown : false,
                    }
                } 
            />
        </Stack.Navigator> 
    );
}