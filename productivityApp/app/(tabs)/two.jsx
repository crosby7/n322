import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { auth, db } from "../../FirebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Colors from "../../constants/Colors";

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
    console.log(taskName, taskAssigned);
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

  const updateTask = async (taskId) => {
    console.log("update id: ", taskId);
    const taskRef = doc(db, "ReactUser", taskId);
    const updatedTask = {
      name: taskName,
      assigned: taskAssigned,
    };

    try {
      await updateDoc(taskRef, updatedTask);
      console.log("Document updated with ID:", taskId);
      showTasks();
    } catch (e) {
      console.error("Error updating document: ", e.message);
    }
  };

  const deleteTask = async (taskId) => {
    console.log("Delete task: ", taskId);
    const taskRef = doc(db, "ReactUser", taskId);

    try {
      await deleteDoc(taskRef);
      console.log("Document deleted with ID:", taskId);
      showTasks();
    } catch (e) {
      console.error("Error deleting document: ", e.message);
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
      <View style={styles.mainButtons}>
        <Button style={styles.button} mode="contained" onPress={addTask}>
          <Text style={styles.btnText}>Add Task</Text>
        </Button>
        <Button style={styles.button} mode="contained" onPress={showTasks}>
          <Text style={styles.btnText}>View All Tasks</Text>
        </Button>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.aligned}>
            <Text style={styles.listTitle}>Tasks</Text>
            <Text>Fill out the inputs and select update to edit!</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.name}</Text>
            <Text style={styles.cardText}>
              Assigned to: <Text style={styles.assigned}>{item.assigned}</Text>
            </Text>
            <View style={styles.cardBtns}>
              <Button
                style={styles.update}
                mode="contained"
                onPress={() => updateTask(item.id)}
              >
                <Text style={styles.btnText}>Update</Text>
              </Button>
              <Button
                style={styles.cancel}
                mode="contained"
                onPress={() => deleteTask(item.id)}
              >
                <Text style={styles.btnText}>Complete</Text>
              </Button>
            </View>
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
    backgroundColor: Colors.site.background,
  },
  title: {
    fontSize: 20,
    marginTop: 60,
    fontWeight: "bold",
  },
  nameInput: {
    height: 40, // Make the input box height more standard
    width: "80%", // Add width to make it easier to type into
    marginVertical: 10,
    backgroundColor: Colors.site.inputs,
    color: Colors.site.text,
    borderColor: Colors.site.tint,
  },
  mainButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 10,
  },
  cardBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 10,
  },
  card: {
    width: 300,
    height: 140,
    backgroundColor: Colors.site.cards,
    borderRadius: 10,
    marginTop: 20,
    borderColor: "#000",
    borderWidth: 1,
  },
  cardText: {
    marginVertical: 5,
    paddingLeft: 10,
    color: Colors.site.text,
    fontSize: 14,
    fontWeight: "500",
  },
  assigned: {
    fontWeight: "200",
  },
  update: {
    backgroundColor: Colors.site.tint,
    width: 115,
  },
  cancel: {
    backgroundColor: Colors.site.error,
    width: 115,
  },
  button: {
    backgroundColor: Colors.site.tint,
    marginTop: 20,
  },
  btnText: {
    color: Colors.site.text,
  },
  aligned: {
    alignItems: "center",
  },
  listTitle: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "500",
  },
});
