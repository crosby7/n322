import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from "expo-router"
import Ionicons from "@expo/vector-icons/Ionicons"
import { Colors } from "@/constants/Colors"

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.DEV_PRIMARY
    }}>
      <Tabs.Screen name="index" options={{
        tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color} />,
        tabBarLabel: "Home"
      }} />
      <Tabs.Screen name="lessons" options={{
        tabBarIcon: ({color}) => <Ionicons name="newspaper" size={24} color={color} />,
        tabBarLabel: "Lessons"
      }} />
      <Tabs.Screen name="profile" options={{
        tabBarIcon: ({color}) => <Ionicons name="person" size={24} color={color} />,
        tabBarLabel: "Profile"
      }} />
    </Tabs>
  )
}