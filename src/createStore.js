import * as firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
})

const db = firebase.firestore()
export default db
