import React, {useState, useEffect} from 'react'
import {Avatar} from '@material-ui/core'
import '../scss/SidebarChat.scss'
import db from './../firebase/firebase'
import {Link} from 'react-router-dom'

const SidebarChat = ({addNewChat, id, name}) => {
  const [seed, setSeed] = useState('')
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  const createChat = () => {
    const roomName = prompt('Введите название комнаты')
    if (roomName) {
      db.collection('rooms').add({name: roomName})
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>Last message...</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Добавить новый чат</h2>
    </div>
  )
}

export default SidebarChat
