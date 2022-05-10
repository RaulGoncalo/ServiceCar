import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';
import UserContextProvider from './src/context/UserContext';

export default () => {
  
  const config = {
    screens: {
      ResetPassword: 'resetpassword',
    }
  }

  return(



    <UserContextProvider>
      <NavigationContainer 
        linking={{
          prefixes: ['https://app.com',"app://app"],
          config,
          params: {token: ''}
        }}
      >
        <MainStack/>
      </NavigationContainer>
    </UserContextProvider>
  );
}