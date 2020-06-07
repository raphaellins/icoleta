import React, { useState, ChangeEvent, useEffect } from 'react';
import { 
  ImageBackground, 
  View, 
  Text, 
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { Picker } from '@react-native-community/picker'
import ibgeApi from '../../services/igbeApi'

import styles from './styles'

interface IBGEUfResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home: React.FC = () => {
  const navigation = useNavigation()
  const [ufs, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [selectedUf, setSelectedUf] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')

  function handleNavigateToPoints() {
    if(!(selectedUf && selectedCity)) return
    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity
    })
  }

  useEffect(() => {
    ibgeApi.get<IBGEUfResponse[]>('/estados?orderBy=nome').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla)
      setUfs(ufInitials)
    })
  }, [])

  useEffect(() => {
    if(selectedUf === '0') return
    ibgeApi.get<IBGECityResponse[]>(`/estados/${selectedUf}/municipios`).then(response => {
      const cityNames = response.data.map(city => city.nome)
      setCities(cityNames)
    })
  },[cities.length, selectedUf])

  function handleSelectUf(uf: any) {
    setSelectedUf(uf)
  }

  function handleSelectCity(city: any) {
    setSelectedCity(city)
  }

  return (
    <ImageBackground 
      source={require('../../assets/home-background.png')} 
      style={styles.container}
      imageStyle={{ height: 368, width: 274 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')}/>
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
      </View> 

      <View style={styles.footer}>
        <Picker 
          style={styles.select}
          onValueChange={handleSelectUf}
          selectedValue={selectedUf}
        >
          <Picker.Item label="Selecione a UF" value={0} />
          { ufs.map(uf => (
            <Picker.Item key={uf} label={uf} value={uf} />
          )) }
        </Picker>

        <Picker 
          style={styles.select}
          onValueChange={handleSelectCity}
          selectedValue={selectedCity}
        >
          <Picker.Item label="Selecione a cidade" value={0} />
          { cities.map(city => (
            <Picker.Item key={city} label={city} value={city} />
          )) }
        </Picker>

        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#fff" size={24}/>
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground> 
  );
}

export default Home;