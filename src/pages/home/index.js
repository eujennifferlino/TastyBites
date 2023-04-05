import { useState, useEffect } from 'react'

import {View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, 
  FlatList, } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {Logo} from '../../components/logo'
import api from '../../services/api'
import { FoodList } from '../../components/foodlist'

export function Home(){
  const [inputValue, setInputValue] = useState("")
  const [foods, setFoods] = useState([])

  useEffect(() => {
    async function fetchApi(){
      const response = await api.get("/foods")
      setFoods(response.data)
    }

    fetchApi();
  }, [])
  
  function handleSearch(){
    console.log
  }
  
  return(
    <SafeAreaView style={styles.container}>
      <Logo/>
      <Text style={styles.title}>Encontre a receita</Text>
      <Text style={styles.title}>perfeita para você!</Text>

      <View style={styles.form}>
        <TextInput
        placeholder='Digite a comida que deseja'
        style={styles.input}
        value={inputValue}
        onChangeText={ (text) => setInputValue(text)}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={28} color={"#c62c0e"} />
        </TouchableOpacity>
      </View>

      <FlatList
      data={foods}
      keyExtractor={ (item) => String(item.id) }
      renderItem={ ({item}) => <FoodList data={item}/>}
      showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F3F9FF',
    paddingTop:36,
    paddingStart:14,
    paddingEnd:14,
  },
  title:{
    fontSize:26,
    fontWeight:'bold',
    color:"#100f0f",
  },
  form:{
    backgroundColor:"#FFFFFF",
    width:'100%',
    borderRadius:10,
    marginTop:16,
    marginBottom:16,
    borderWidth:1,
    borderColor:"#F3F9FF",
    paddingLeft:8,
    paddingRight:8,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  input:{
    width:'90%',
    maxWidth:'90%',
    height:54,
  }
})