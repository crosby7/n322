import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Button } from "react-native-paper"
import { Colors } from "@/constants/Colors"
import { useClerk } from "@clerk/clerk-expo"
import { useNavigation } from 'expo-router'

export default function index() {
  const { signOut } = useClerk();
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigation.replace("index");
    }
    catch (e) {
      console.log("sign out error", e);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.homeText}>Home</Text>
      <Image style={styles.img} source={require("./../../assets/images/dev-workshop-logo.png")} />
      <Text>Welcome. Use the tabs at the bottom to navigate to lessons.</Text>
      <Button style={styles.btn} mode="outlined" onPress={handleSignOut}>
        <Text style={styles.whiteText}>Sign Out</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1, 
    alignItems: 'center',
    justifyContent: "center",
    padding: 20
  },
  homeText: {
    fontSize: 20,
    textAlign: 'center'
  },
  img: {
    width: 300,
    height: 300,
    marginVertical: 20
  },
  midText: {
    textAlign: 'center'
  },
  btn: {
    backgroundColor: Colors.DEV_PRIMARY,
    color: "#fff",
    padding: 10,
    borderRadius: 50,
    marginTop: 50,
    width: "50%"
  },
  whiteText: {
    color: "#fff",
    textAlign: "center"
  }
})