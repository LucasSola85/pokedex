import { ActivityIndicator, View } from "react-native"
import { useTheme } from "react-native-paper"



export const FullScreenLoaders = () => {

  const { colors } = useTheme();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background}}>
        <ActivityIndicator size={50} />
    </View>
  )
}
