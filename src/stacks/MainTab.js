import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '../screens/Home';
import Favorites from '../screens/Favorites';
import Schedule from '../screens/Schedule';


import TabCustom from '../components/TabCustom';

const Tab = createMaterialTopTabNavigator();

export default () => {
    return(
        <Tab.Navigator 
            tabBar= {props => <TabCustom {...props}/>}
            tabBarPosition =  'bottom'
            initialRouteName = 'Home'
            screenOptions={{
                swipeEnabled: true,
                lazy : true,
              }}
                
        >
            <Tab.Screen name = 'Favorites' component = {Favorites}/>
            <Tab.Screen name = 'Home' component = {Home}/>
            <Tab.Screen name = 'Schedule' component = {Schedule}/>
        </Tab.Navigator>
    )
}