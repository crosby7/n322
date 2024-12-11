import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { auth, db } from "../../FirebaseConfig";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";

export default function TabTwoScreen() {
  const [taskName, setTaskName] = useState("");
  const [taskAssigned, setTaskAssigned] = useState("");
  const [data, setData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "ReactUser"), (snapshot) => {
      const docs = [];
      snapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
        console.log(doc.id, " => ", doc.data());
      });
      setData(docs);
    });
    return () => unsubscribe();
  }, []);

  const addTask = async () => {
    console.log(taskName, taskDueDate);
    console.log(auth.currentUser);
    const taskObj = {
      name: taskName,
      assigned: taskAssigned,
    };
    try {
      const docRef = await addDoc(collection(db, "ReactUser"), taskObj);
      setTaskName("");
      setTaskAssigned("");
      console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error.message);
    }
  };

  const showTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ReactUser"));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setData(docs);
    } catch (e) {
      console.error("Error viewing document: ", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Office Tasks</Text>
      <Text>Create a task!</Text>
      <TextInput
        value={taskName}
        style={styles.nameInput}
        placeholder="TODO: Clean the office"
        onChangeText={(text) => setTaskName(text)}
      />
      <TextInput
        value={taskAssigned}
        style={styles.nameInput}
        placeholder="Assigned to:"
        onChangeText={(text) => setTaskAssigned(text)}
      />
      <Button style={styles.button} mode="contained" onPress={addTask}>
        Add Task
      </Button>
      <Button style={styles.button} mode="contained" onPress={showTasks}>
        View All Tasks
      </Button>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
            <Text>{item.assigned}</Text>
            <Button style={styles.button} mode="contained" onPress={updateTask}>
              <Text style={styles.btnText}>Update Task</Text>
            </Button>
            <Button style={styles.button} mode="contained" onPress={deleteTask}>
              <Text style={styles.btnText}>Delete Task</Text>
            </Button>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 2,
    width: "80%",
  },
  button: {
    marginTop: 20,
  },
  nameInput: {
    height: 40, // Make the input box height more standard
    width: "80%", // Add width to make it easier to type into
    marginVertical: 10,
  },
});
