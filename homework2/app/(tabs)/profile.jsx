import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useRouter, Link } from 'expo-router'
import { Colors } from '@/constants/Colors'

export default function profile() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={[styles.header, styles.alignToTop]}>Welcome, User.</Text>
      <Text style={styles.sectionHeader}>Completed Lessons:</Text>
      <View style={styles.block}>
        <View style={styles.lessons}>
          <Image style={styles.img} source={require("./../../assets/images/html5.png")} />
          <Text style={styles.lessonText}>Intro to HTML</Text>
        </View>
        <View style={styles.lessons}>
          <Image style={styles.img} source={require("./../../assets/images/javascript1.png")} />
          <Text style={styles.lessonText}>Intro to Javascript</Text>
        </View>
      </View>
      <View>
            <Text>Start a new lesson</Text>
            <Link style={styles.button} href="/lessons">
            <Text>Lessons</Text>
            </Link>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  alignToTop: {
    position: 'absolute',
    top: 30
  },
  sectionHeader: {
    alignSelf: 'flex-start',
    paddingLeft: 20,
    fontSize: 18
  },
  img: {
    width: 100,
    height: 100
  },
  block: {
    width: 400,
    marginTop: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 50
  },
  lessons: {
    textAlign: 'center'
  },
  lessonText: {
    marginTop: 5,
    textAlign: 'center'
  },
  button: {
    padding: 10,
    width: '100%',
    backgroundColor: Colors.DEV_PRIMARY,
    color: '#fff',
    borderRadius: 20,
    textAlign: 'center',
    marginTop: 5
  },
})