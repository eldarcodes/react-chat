import React, {useState, useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import db from '../firebase/firebase'
import Chat from './../components/Chat'
import {setUserData} from './../reducers/authReducer'
import firebase from 'firebase'
import {useParams} from 'react-router-dom'

const ChatContainer = (props) => {
  const [input, setInput] = useState('')
  const [changeName, setChangeName] = useState(false)
  const [popup, setPopup] = useState(false)
  const [messages, setMessages] = useState([])
  const [roomName, setRoomName] = useState('')
  const [showSend, setShowSend] = useState(false)
  const [room, setRoom] = useState({})
  const [newRoomName, setNewRoomName] = useState('')
  const [color, setColor] = useState('')
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [messageUserId, setMessageUserId] = useState('')
  const [alert, setAlert] = useState(false)

  const [, setChosenEmoji] = useState(null)

  const {roomId} = useParams()
  const el = useRef(null)

  useEffect(() => {
    el.current.scrollIntoView({block: 'end', behavior: 'auto'})
  })

  useEffect(() => {
    setInput('')
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => {
          if (snapshot.data().name) {
            setRoom(snapshot.data())
            setRoomName(snapshot.data().name)
            setNewRoomName(snapshot.data().name)
            setColor(snapshot.data().color)
          }
        })
    }
    db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        if (
          window.location.href
            .toString()
            .substr(window.location.href.length - 20) === roomId
        ) {
          setMessages(snapshot.docs.map((doc) => doc.data()))
        }
      })
  }, [roomId])

  const sendMessage = (e) => {
    e.preventDefault()
    setPopup(false)
    if (input && input.trim().length > 0) {
      db.collection('rooms').doc(roomId).collection('messages').add({
        name: props.user.displayName,
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: props.user.uid,
      })
    }
    setInput('')
  }

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject)
    setInput(input + emojiObject.emoji)
  }

  const changeRoomName = () => {
    setChangeName(!changeName)
    if (newRoomName.length > 30) {
      alert('Слишком длинное название!')
      return
    } else if (
      roomName !== newRoomName &&
      newRoomName &&
      props.user.uid === room.creator
    ) {
      db.collection('rooms')
        .doc(roomId)
        .set(
          {
            name: newRoomName,
          },
          {merge: true}
        )
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    }
  }

  const showAlert = () => {
    setAlert(!alert)
  }
  return (
    <Chat
      {...props}
      el={el}
      popup={popup}
      onEmojiClick={onEmojiClick}
      input={input}
      setShowSend={setShowSend}
      setInput={setInput}
      showSend={showSend}
      setPopup={setPopup}
      showUserProfile={showUserProfile}
      messageUserId={messageUserId}
      sendMessage={sendMessage}
      changeRoomName={changeRoomName}
      color={color}
      changeName={changeName}
      setNewRoomName={setNewRoomName}
      newRoomName={newRoomName}
      messages={messages}
      roomName={roomName}
      setChangeName={setChangeName}
      room={room}
      setMessageUserId={setMessageUserId}
      setShowUserProfile={setShowUserProfile}
      showAlert={showAlert}
      alert={alert}
    />
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, {
  setUserData,
})(ChatContainer)
