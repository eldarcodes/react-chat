import React, {useState, useEffect} from 'react'
import {Avatar} from '@material-ui/core'
import db from './../firebase/firebase'
import {NavLink} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import {useStateValue} from './../StateProvider'

const SidebarChat = ({addNewChat, id, name, color}) => {
  const [{user}, dispatch] = useStateValue()
  const [message, setMessages] = useState([])
  const colors = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#8e44ad',
    '#e74c3c',
    '#95a5a6',
    '#d35400',
    '#f1c40f',
    '#16a085',
    '#0abde3',
    '#10ac84',
    '#00d2d3',
    '#54a0ff',
    '#5f27cd',
    '#c8d6e5',
    '#576574',
    '#01a3a4',
    '#ff9ff3',
    '#feca57',
  ]
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
      db.collection('rooms').add({
        name: roomName,
        color: colors[Math.floor(Math.random() * colors.length)],
        creator: user.email,
      })
    }
  }

  return !addNewChat ? (
    <NavLink
      onClick={() => {
        document.querySelector('.sidebar').classList.remove('open')
        document.querySelector('.sidebar').classList.add('close')
      }}
      activeClassName="activeLink"
      to={`/rooms/${id}`}
    >
      <div className="sidebarChat rooms">
        <Avatar style={{backgroundColor: color}} />
        <div className="sidebarChat__info">
          <h2 className="room_name">{name}</h2>
          <p className="old__message">
            {message[0]?.message ? message[0]?.message : ' '}
          </p>
        </div>
      </div>
    </NavLink>
  ) : (
    <div className="sidebarChat plus__icon" onClick={createChat}>
      <h2 className="addChat">Добавить новый чат</h2>
      <AddIcon className="addChatIcon" />
    </div>
  )
}

export default SidebarChat
