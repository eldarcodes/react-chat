import React, {useState, useEffect} from 'react'
import {Avatar} from '@material-ui/core'
import '../scss/SidebarChat.scss'
import db from './../firebase/firebase'
import {Link} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'

const SidebarChat = ({addNewChat, id, name}) => {
  const [seed, setSeed] = useState('')
  const [message, setMessages] = useState([])

  useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()))
        })
    }
  }, [id])

  const createChat = () => {
    const roomName = prompt('Введите название комнаты')
    if (roomName) {
      db.collection('rooms').add({name: roomName})
    }
  }

  const randomColor = () => {
    return '#' + (((1 << 24) * Math.random()) | 0).toString(16)
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar style={{backgroundColor: `${randomColor()}`}} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p className="old__message">
            {message[0]?.message ? message[0]?.message : ' '}
          </p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Добавить новый чат</h2>
      <AddIcon />
    </div>
  )
}

export default SidebarChat
