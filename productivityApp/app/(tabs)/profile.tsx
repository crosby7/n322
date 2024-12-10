import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "expo-router";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";

export default function TabOneScreen() {
  const navigation = useNavigation();
  const auth = getAuth();
  const runSignOut = async () => {
    try {
      await signOut(auth).then(() => {
        console.log("sign out then");
        navigation.replace("index");
      });
    } catch (e) {
      console.log("error signing out: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button mode="contained" onPress={runSignOut}>
        <Text>Sign Out</Text>
      </Button>
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
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.site.text,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
