import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { Button } from "react-native-paper"

export default function lessons() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lessons</Text>
      <Text style={styles.subHeader}>Learn Code with these Available Lessons:</Text>
      <ScrollView contentContainerStyle={styles.wrap}>
        <View style={styles.lesson}>
            <Image style={styles.img} source={require("./../../assets/images/html5.png")} />
            <Text>Intro to HTML</Text>
            <Text style={styles.innerMargin}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima animi numquam rem, deleniti vel exercitationem culpa consequuntur officiis quidem saepe, veritatis magni, unde aperiam laborum vitae dolorem doloremque illum? Tempore.</Text>
            <Button style={styles.innerMargin} mode="outlined">
                <Text>Start Lesson</Text>
            </Button>
        </View>
        <View style={styles.lesson}>
            <Image style={styles.img} source={require("./../../assets/images/javascript1.png")} />
            <Text>Intro to Javascript</Text>
            <Text style={styles.innerMargin}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima animi numquam rem, deleniti vel exercitationem culpa consequuntur officiis quidem saepe, veritatis magni, unde aperiam laborum vitae dolorem doloremque illum? Tempore.</Text>
            <Button style={styles.innerMargin} mode="outlined">
                <Text>Start Lesson</Text>
            </Button>
        </View>
        <View style={styles.lesson}>
            <Image style={styles.img} source={require("./../../assets/images/sass1.png")} />
            <Text>Intro to Styling</Text>
            <Text style={styles.innerMargin}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima animi numquam rem, deleniti vel exercitationem culpa consequuntur officiis quidem saepe, veritatis magni, unde aperiam laborum vitae dolorem doloremque illum? Tempore.</Text>
            <Button style={styles.innerMargin} mode="outlined">
                <Text>Start Lesson</Text>
            </Button>
        </View>
      </ScrollView>
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
        fontSize: 20,
        fontWeight: 'bold'
    },
    subHeader: {
        fontSize: 18
    },
    img: {
        width: 200,
        height: 200
    },
    wrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: 500
    },
    lesson: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 400,
        marginVertical: 30
    },
    innerMargin: {
        marginTop: 10
    }
})