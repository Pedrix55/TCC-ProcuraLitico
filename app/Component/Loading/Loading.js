import * as React from 'react'
import {View} from 'react-native'
import { ActivityIndicator, Colors,  } from 'react-native-paper';

const Loading = () =>{
  return (
    <View style={{flex: 1, height: "100%",alingItems: "center", justifyContent: "center"}}>
      <ActivityIndicator animating={true} color="green"/>
    </View>
  )
}
export default Loading