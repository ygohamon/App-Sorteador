import { borderWidth } from "polished";
import { StyleSheet, Dimensions} from "react-native";
const { width: ScreenWidth } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  container: {
      backgroundColor: "#fff",
      justifyContent: "center",
  },
  input: {
    width: ScreenWidth * 0.7
  },
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 8,
    shadowOpacity: 0.3,
    shadowColor: "#2a41cb",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    borderRadius: "100%"
  },

  headers:{
    marginTop: 24,
  },
  title: {
 
  },
});