import React, { useEffect, useState } from 'react';
import { 
  View,
  TouchableOpacity, 
  Image,
  Text,
  Linking
} from 'react-native';
import * as MailComposer from 'expo-mail-composer'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'

import styles from './styles'
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
    image_url: string;
  },
  items: {
    title: string;
  }[]
}

const Detail: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute()

  const routeParams = route.params as Params;
  const [data, setData] = useState<Data>({} as Data)

  function handleNavigateBack(){
    navigation.goBack()
  }

  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`)
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email],
    })
  }

  useEffect(() => {
    api.get(`/points/${routeParams.point_id}`).then(response => setData(response.data))
  }, [])

  if (!data.point) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Icon name="rotate-cw" size={34} color="#322153" /> 
        <Text style={{ 
          color: "#322153", 
          fontWeight: 'bold',
          fontSize: 16,
          marginTop: 15
        }}>Carregando...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateBack}>
        <Icon name="arrow-left" color="#34cb79" size={20} />
      </TouchableOpacity>

      <Image style={styles.pointImage} source={{ uri: data.point.image_url }}/>
    
      <Text style={styles.pointName}>{data.point.name}</Text>
      <Text style={styles.pointItems}>
        { data.items.map(item => item.title).join(', ') }
      </Text>

      <View style={styles.address}>
        <Text style={styles.addressTitle}>Endereço</Text>
        <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
      </View>

      <View style={styles.footer}>
        <RectButton  style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" color="#fff" size={20} />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Icon name="mail" color="#fff" size={20} />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </View>
  )
}

export default Detail;