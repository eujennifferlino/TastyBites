import {useLayoutEffect, useState} from 'react';

import {View, Text, StyleSheet, Pressable, ScrollView, Image, Modal, Share} from 'react-native'
import {useRoute, useNavigation} from '@react-navigation/native'

import {Entypo, AntDesign, Feather} from '@expo/vector-icons'
import {Ingredients} from '../../components/ingredients'

import {Instructions} from '../../components/instructions'
import { VideoView } from '../../components/video'

import {isFavorite, removeFavorite, saveFavorite} from '../../utils/storage'

export function Detail(){
  const route = useRoute();
  const navigation = useNavigation();

  const [showVideo, setShowVideo] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useLayoutEffect(() => {
    async function getStatusFavorites(){
      const receipeFavorite = await isFavorite(route.params?.data)
      setFavorite(receipeFavorite)
    }
  
    getStatusFavorites();

    navigation.setOptions({
      title:route.params?.data ? route.params?.data.name : "Detalhes da receita",
      headerRight: () => (
        <Pressable onPress={ () => handleFavoriteReceipe(route.params?.data)}>
          {favorite ? (
            <Entypo
              name="heart"
              size={28}
              color="#FF0000"
            />
          ) : (
            <Entypo
              name="heart-outlined"
              size={28}
              color="#100f0f "
            />
          ) }
        </Pressable>
      )
    })
  }, [navigation, route.params?.data, favorite])

  async function handleFavoriteReceipe(receipe){
    if(favorite){
      removeFavorite(receipe.id)
      setFavorite(false);
    }else{
      await saveFavorite('@appreceitas',receipe)
      setFavorite(true);
    }
  }

  function handleOpenvideo(){
    setShowVideo(true);
  }

  async function shareReceipe(){
    try{
      await Share.share({
        url:'https://sujeitoprogramador.com',
        message:`Receita: ${route.params?.data.name}\nOlha essa receita que vi no aplicativo TastyBites`
      })
    }catch(error){
      console.log
    }
  }

  return(
    <ScrollView contentContainerStyle={{paddingBottom:14}} style={styles.container} showsVerticalScrollIndicator={false}>
      <Pressable onPress={handleOpenvideo} >
        <View style={styles.playIcon}>
        <AntDesign name="playcircleo" size={50} color="#FAFAFA"/>
        </View>
        <Image
        source={{uri: route.params?.data.cover}}
        style={styles.cover}
        />
      </Pressable>

      <View style={styles.headerDetails}>
        <View>
          <Text style={styles.title}>{route.params?.data.name}</Text>
          <Text style={styles.ingredientsText}>Ingredientes ({route.params?.data.total_ingredients})</Text>
        </View>

        <Pressable onPress={shareReceipe} >
          <View style={styles.shareIcon}>
          <Feather name='share-2' size={24} color='#100f0f' />
          </View>
        </Pressable>
      </View>

        {route.params?.data.ingredients.map((item) => (
          <Ingredients  key={item.id} data={item} />
        ) )}

          <View style={styles.instructionsArea}>
            <Text style={styles.instructionsText}>Modo de Preparo
              <Feather name='arrow-down' size={24} color='#FFF' />
            </Text>
          </View>

          {route.params?.data.instructions.map((item, index) => (
          <Instructions  key={item.id} data={item} index={index} />
        ) )}

        <Modal visible={showVideo} animationType='slide'>
          <VideoView
            handleClose={() => setShowVideo(false) }
            videoUrl={route.params?.data.video}
          />
        </Modal>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#F3F9FF',
    paddingTop:14,
    paddingEnd:14,
    paddingStart:14
  },
  cover:{
    height:200,
    borderRadius:14,
    width:'100%'
  },
  playIcon:{
    position:'absolute',
    zIndex:9,
    top:0, left:0, right:0, bottom:0,
    alignItems:'center',
    justifyContent:'center'
  },
  headerDetails:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:14,
  },
  title:{
    fontSize:18,
    marginTop:14,
    fontWeight:'bold',
    color:'#100f0f',
    marginBottom:4
  },
  ingredientsText:{
    marginBottom:14,
    fontSize:16
  },
  instructionsArea:{
    backgroundColor:'#c62c0e',
    flexDirection:'row',
    padding:8,
    borderRadius:5,
    marginBottom:14
  },
  instructionsText:{
    color:'#FFF',
    fontWeight:500,
    fontSize:18,
    marginRight:8
    
  }
})