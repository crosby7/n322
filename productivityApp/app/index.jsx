import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../FirebaseConfig";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { router } from "expo-router";
import { TextInput, Button } from "react-native-paper";
import Colors from "@/constants/Colors";

export default function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // router.replace("/(tabs)");
        setUser(user);
      } else {
        console.log("no user");
      }
    });
  });

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)");
    } catch (error) {
      console.log(error);
      alert("Failed to sign in" + error.message);
    }
  };

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)");
    } catch (error) {
      console.log(error);
      alert("Failed to sign up" + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        router.replace("/(tabs)")
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.hdr1}>Productivity Focus</Text>
            <Text style={styles.hdr2}>Sign In/Create Account</Text>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={email}
              keyboard-type="email-address"
              placeholder="Email Address..."
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              style={styles.input}
              value={password}
              secureTextEntry={true}
              placeholder="Password..."
              onChangeText={(text) => setPassword(text)}
            />

            <View style={styles.buttons}>
              <Button style={styles.button} mode="outlined" onPress={signUp}>
                <Text style={styles.darkText}>Sign Up</Text>
              </Button>

              <Button style={styles.button} mode="outlined" onPress={signIn}>
                <Text style={styles.darkText}>Sign In</Text>
              </Button>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: Colors.site.background,
  },
  header: {
    marginVertical: 20,
    justifyContent: "center",
    width: "100%",
    color: Colors.site.text,
  },
  hdr1: {
    textAlign: "center",
    fontSize: 20,
    color: Colors.site.text,
    fontWeight: "bold",
  },
  hdr2: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.site.text,
    marginVertical: 10,
  },
  form: {
    width: "90%",
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  input: {
    marginBottom: 10,
    backgroundColor: Colors.site.inputs,
    color: Colors.site.text,
    borderColor: Colors.site.tint,
  },
  buttons: {
    marginBottom: 10,
    flexDirection: "row",
    width: "90%",
    marginHorizontal: "auto",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: 150,
    backgroundColor: Colors.site.tint,
    borderColor: Colors.site.tint,
  },
  darkText: {
    color: Colors.site.text,
  },
});
