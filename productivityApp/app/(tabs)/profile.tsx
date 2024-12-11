import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
import { useFocusEffect, useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import React from "react";

export default function Profile() {
  const [remainingTasks, setRemainingTasks] = React.useState(0);

  const navigation = useNavigation();
  const auth = getAuth();

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const checkRemainingTasks = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "ReactUser"));

          if (isActive) {
            setRemainingTasks(querySnapshot.size); // returns the count of docs
          }
        } catch (e) {
          console.error("error getting remaining tasks: ", e.message);
        }
      };

      checkRemainingTasks();

      return () => {
        isActive = false;
      };
    }, [])
  );

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
        <Text style={styles.statistics}>{remainingTasks}</Text>
        <Text style={styles.statsText}>
          Thanks for your hard work today! You did great!
        </Text>
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
    textAlign: "center",
  },
  statistics: {
    marginTop: 5,
    width: 50,
    marginHorizontal: "auto",
    height: 50,
    backgroundColor: Colors.site.cards,
    borderRadius: 5,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 50,
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
