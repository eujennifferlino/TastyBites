import {View, Text, StyleSheet} from 'react-native'

export function Logo(){
  return(
    <View style={styles.logoArea}>
      <Text style={styles.logoTexto}>Tasty Bites</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  logoArea:{
    backgroundColor:'#e06e3b',
    alignSelf:'flex-start',
    padding:8,
    paddingLeft:16,
    paddingRight:16,
    borderTopRightRadius:8,
    borderBottomLeftRadius:8,
    marginBottom:8
  },
  logoTexto:{
    fontSize:20,
    fontWeight:"bold",
    color:"#FFFFFF"

  }
})