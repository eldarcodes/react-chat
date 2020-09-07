import React, {useState, useEffect} from 'react'
import {Avatar} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ChatIcon from '@material-ui/icons/Chat'
import IconButton from '@material-ui/core/IconButton'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import SidebarChat from './SidebarChat'
import db from './../firebase/firebase'
import {useStateValue} from './../StateProvider'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import {auth} from '../firebase/firebase'
import CloseIcon from '@material-ui/icons/Close'
import {menu} from './../utils/common'

const Sidebar = () => {
  const [rooms, setRooms] = useState([])
  const [searchInput, setSearch] = useState('')
  const [{user}, dispatch] = useStateValue()

  useEffect(() => {
    const unsubscribe = db
      .collection('rooms')
      .orderBy('name', 'desc')
      .onSnapshot((snapshot) => {
        setRooms(snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})))
      })
    return () => {
      unsubscribe()
    }
  }, [])

  const signOut = () => {
    auth
      .signOut()
      .then((res) => {
        window.location.href = '/'
      })
      .catch((err) => {
        alert(err)
      })
  }

  const search = (e) => {
    let titles = document.querySelectorAll('.rooms')
    setSearch(e.target.value)
    titles.forEach((title) => {
      let re = new RegExp(e.target.value, 'gi')
      if (
        e.target.value.search(
          /` ! @ # $ % ^ & * ( ) _ + | - = { } [ ] : " ; ' < > ? , . /g
        ) === -1
      ) {
        if (title.querySelector('.room_name').innerHTML.search(re) !== -1) {
          title.style.display = 'flex'
        } else {
          title.style.display = 'none'
        }
      }
    })
  }

  return (
    <div className="sidebar close">
      <div className="sidebar__header">
        <Avatar src={user.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton onClick={signOut} className="exit">
            <ExitToAppIcon />
          </IconButton>
          <IconButton
            onClick={menu}
            className="close-icon"
            style={{display: 'none'}}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input
            value={searchInput}
            onChange={search}
            type="text"
            placeholder="Найдите или начните новый чат"
          />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room, i) => (
          <SidebarChat
            key={room.id}
            id={room.id}
            color={room.data.color}
            name={room.data.name}
          />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
