import React, {useState, useEffect} from 'react'
import {Avatar} from '@material-ui/core'
import '../scss/SidebarChat.scss'

const SidebarChat = ({addNewChat}) => {
  const [seed, setSeed] = useState('')
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  const createChat = () => {
    const roomName = prompt('Введите название комнаты')
    if(roomName) {
      //
    }
  }

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat__info">
        <h2>Room name</h2>
        <p>Last message...</p>
      </div>
    </div>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Добавить новый чат</h2>
    </div>
  )
}

export default SidebarChat
