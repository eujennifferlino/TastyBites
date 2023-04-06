import { Text, StyleSheet } from 'react-native'
import { View } from 'moti'

export function Logo(){
  return(
    <View 
    style={styles.logoArea}
    from={{
      opacity:0,
      translateX:-50
    }}
    animate={{
      opacity:1,
      translateX:0
    }}
    transition={{
      type:'spring',
      duration:850
    }}
    >
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