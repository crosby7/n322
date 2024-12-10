// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { Platform } from "react-native";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH_gLpGxgwkRa5ScZj5ls6K9ddLe-SXQw",
  authDomain: "mobileclassprojectscc.firebaseapp.com",
  projectId: "mobileclassprojectscc",
  storageBucket: "mobileclassprojectscc.appspot.com",
  messagingSenderId: "278997697185",
  appId: "1:278997697185:web:574c8221c84d323ccba6e0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// init auth
const auth = initializeAuth(app, {
  persistence: ["ios", "android"].includes(Platform.OS)
    ? getReactNativePersistence(ReactNativeAsyncStorage)
    : browserLocalPersistence,
});

export { auth, db };
