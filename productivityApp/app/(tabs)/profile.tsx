import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "expo-router";
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
      <Text style={styles.title}>How Productive Have I Been Today?</Text>
      <View style={styles.stats}>
        <Text style={styles.statsText}>Tasks Remaining:</Text>
        <Text style={styles.statistics}></Text>
        <Text style={styles.statsText}>Tasks Completed:</Text>
        <Text style={styles.statistics}></Text>
      </View>
      <Text style={styles.subHeader}>All Finished?</Text>
      <Button style={styles.button} mode="contained" onPress={runSignOut}>
        <Text style={styles.btnText}>Sign Out</Text>
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
  stats: {
    height: 110,
    justifyContent: "space-between",
    marginBottom: 40,
    marginTop: 10,
  },
  statsText: {
    fontSize: 14,
    fontWeight: "500",
  },
  statistics: {
    marginTop: 5,
    width: 50,
    marginHorizontal: "auto",
    height: 50,
    backgroundColor: Colors.site.cards,
    borderRadius: 5,
  },
  subHeader: {
    fontWeight: "500",
    marginBottom: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.site.tint,
  },
  btnText: {
    color: Colors.site.text,
  },
});
