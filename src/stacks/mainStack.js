import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from '../screens/Loading';
import SingIn from '../screens/SignIn';
import SingUp from '../screens/SingUp';
import ResetPass from '../screens/ResetPass'

const Stack = createNativeStackNavigator();


export default() => {
    return(
        <Stack.Navigator
            initialRouteName = "Loading"
            screenOptions = {{headerShown : false}}
        >

            <Stack.Screen name = "Loading" component={Loading}/>
            <Stack.Screen name = "SingIn" component={SingIn}/>
            <Stack.Screen name = "SingUp" component={SingUp}/>
            <Stack.Screen name = "ResetPass" component={ResetPass}/>
        </Stack.Navigator> 
    );
}