import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCU5uGd4e7pM1dHp-vLSt6ucZCFcDj82zs",
  authDomain: "fe24-js2-slutprojekt.firebaseapp.com",
  databaseURL: "https://fe24-js2-slutprojekt-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fe24-js2-slutprojekt",
  storageBucket: "fe24-js2-slutprojekt.appspot.com",
  messagingSenderId: "404616321749",
  appId: "1:404616321749:web:30eef7b70eda219804205c",
  measurementId: "G-005XQ01WLS"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const membersRef = ref(db, "members");
const tasksRef = ref(db, "tasks");

export { db, membersRef, tasksRef };
