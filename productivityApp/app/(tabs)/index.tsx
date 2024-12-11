import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "@/constants/Colors";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Productivity Focus</Text>
      <Image
        source={require("../../assets/images/trophy.png")}
        style={styles.logo}
      />
      <Text style={styles.text}>
        This productivity app is all you need to stay focused for the day. Add
        tasks and recover them with each sign in.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.site.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.site.text,
  },
  logo: {
    width: 200,
    height: 200,
    marginVertical: 30,
  },
  text: {
    width: 250,
    textAlign: "center",
  },
});
