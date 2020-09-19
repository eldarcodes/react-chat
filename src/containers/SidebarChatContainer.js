import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import db from '../firebase/firebase'
import {setUserData} from './../reducers/authReducer'
import SidebarChat from './../components/SidebarChat'

const SidebarChatContainer = (props) => {
  const [message, setMessages] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    if (props.id) {
      db.collection('rooms')
        .doc(props.id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()))
        })
    }
  }, [props.id])

  const pinToTop = async () => {
    let snap = await db.collection('rooms').doc(props.id).get()

    let result = []
    snap.data().isPinned.forEach((item) => {
      if (!result.includes(item)) {
        result.push(item)
      }
    })
    let isFind = false
    result.forEach((res) => {
      if (res === props.user.uid) {
        isFind = true
        let index = result.indexOf(props.user.uid)
        result.splice(index, 1)
        db.collection('rooms').doc(props.id).set(
          {
            isPinned: result,
          },
          {merge: true}
        )
        return
      }
    })
    if (!isFind) {
      db.collection('rooms')
        .doc(props.id)
        .set(
          {
            isPinned: [...snap.data().isPinned, props.user.uid],
          },
          {merge: true}
        )
    }
  }

  const showAlert = () => {
    setAlert(!alert)
  }

  const isUserPinnedChat = () => {
    let pinned = false
    if (props.isPinned) {
      props.isPinned.forEach((item) => {
        if (props.user.uid === item) {
          pinned = true
        }
      })
    }
    return pinned
  }
  return (
    <SidebarChat
      {...props}
      pinToTop={pinToTop}
      isUserPinnedChat={isUserPinnedChat}
      message={message}
      showPopup={showPopup}
      addNewChat={props.addNewChat}
      setShowPopup={setShowPopup}
      name={props.name}
      color={props.color}
      id={props.id}
      setAlert={setAlert}
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
})(SidebarChatContainer)
