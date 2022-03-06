import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default() => {
    return(
        <Stack.Navigator>
            <Stack.Screen name = "Loading" component={Loading}/>
            <Stack.Screen name = "SingIn" component={SingIn}/>
            <Stack.Screen name = "SingUp" component={SingUp}/>
        </Stack.Navigator>
    );
}