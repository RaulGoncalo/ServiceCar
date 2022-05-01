import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import Loading from '../screens/Loading';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ResetPassword from '../screens/ResetPassword';
import ForgetPassword from '../screens/ForgetPassword';
import MainTab from '../stacks/MainTab';

const Stack = createNativeStackNavigator();


export default() => {

    const prefix = (Platform.OS === 'ios')
    ? 'servicecar://'
    : 'servicecar://servicecar/';

    return(
        <Stack.Navigator
            initialRouteName = "Loading"
            screenOptions = {{headerShown : false}}
            
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
                name = "ForgetPassword" 
                component={ForgetPassword}
            />

            <Stack.Screen 
                name = "ResetPassword" 
                component={ResetPassword}
                uriPrefix={prefix} 
                path = 'servicecar/:servicecar'
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