import React from 'react';
import AppLoading from 'expo-app-loading';
import {ThemeProvider} from 'styled-components'

import{
  useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold
}from '@expo-google-fonts/nunito';

import theme from './src/global/styles/theme';

import {NavigationContainer} from '@react-navigation/native'
import {AppRroutes} from './src/routes/app.routes'



export default function App() {
  const [fonstLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold
  });

  if(!fonstLoaded){
    return <AppLoading/>
  }


  return (  
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppRroutes/>
      </NavigationContainer>
    </ThemeProvider>
  
  );

};

