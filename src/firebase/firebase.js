import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCd8OZo0ainbVr3ArzQtoIiHsqRkPzYBm4',
  authDomain: 'react-chat-85412.firebaseapp.com',
  databaseURL: 'https://react-chat-85412.firebaseio.com',
  projectId: 'react-chat-85412',
  storageBucket: 'react-chat-85412.appspot.com',
  messagingSenderId: '271626338896',
  appId: '1:271626338896:web:775afa38e43a392f10c755',
  measurementId: 'G-PMR66HSCVX',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider}
export default db
