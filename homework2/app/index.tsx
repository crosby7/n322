import { Text, View, StyleSheet, Image } from "react-native";
import { Colors } from "@/constants/Colors"
import { Button } from "react-native-paper"
import { useRouter } from "expo-router"
import LoginScreen from "@/components/LoginScreen"

export default function index() {
  const router = useRouter();
  return <LoginScreen />
}