import React from 'react';
import Routes from './src/routes'
import { AppLoading } from 'expo'
import { StatusBar } from 'react-native'
import { Roboto_400Regular, Roboto_500Medium, useFonts } from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'

export default function App() {
  const [fontsLoader] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })

  if(!fontsLoader) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </>
  );
}
