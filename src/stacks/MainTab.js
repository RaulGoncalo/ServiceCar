import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../screens/Search';
import Home from '../screens/Home';
import Schedule from '../screens/Schedule';
import TabCustom from '../components/TabCustom';

const Tab = createBottomTabNavigator();

export default () => {
    return(
        <Tab.Navigator 
            tabBar= {props => <TabCustom {...props}/>}
            screenOptions={{
                headerShown: false,
                swipeEnabled: true,
              }}
                
        >
            <Tab.Screen name = 'Home' component = {Home}/>
            <Tab.Screen name = 'Search' component = {Search}/>
            <Tab.Screen name = 'Schedule' component = {Schedule}/>
        </Tab.Navigator>
    )
}