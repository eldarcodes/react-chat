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
import ProfilePopup from './ProfilePopup'

const Sidebar = () => {
  const [rooms, setRooms] = useState([])
  const [searchInput, setSearch] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [userStatus, setUserStatus] = useState('')

  const [{user}, dispatch] = useStateValue()

  useEffect(() => {
    db.collection('users')
      .doc(user.uid)
      .onSnapshot((snap) => {
        setUserStatus(snap.data().status)
      })

    const sortPin = (testRoom) => {
      let pinnedRooms = []
      let unpinnedRooms = []
      if (testRoom) {
        testRoom.forEach((room) => {
          if (room.data.isPinned.length === 0) {
            unpinnedRooms.push(room)
          }

          room.data.isPinned.forEach((pin) => {
            if (user.uid === pin) {
              pinnedRooms.push(room)
            } else {
              unpinnedRooms.push(room)
            }
          })
        })
      }
      let newRooms = pinnedRooms.concat(unpinnedRooms)
      newRooms = Array.from(new Set(newRooms))

      return newRooms
    }

    const unsubscribe = db
      .collection('rooms')
      .orderBy('id', 'desc')
      .onSnapshot((snapshot) => {
        setRooms(
          sortPin(snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})))
        )
      })
    return () => {
      unsubscribe()
    }
  }, [user.uid])

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
      e.target.value = e.target.value.replace(/\\/g, '\\\\')
      let re = new RegExp(e.target.value, 'gi')

      if (
        e.target.value.search(
          /` ! @ # $ % ^ & * ( ) _ + | - = { } [ ] : " ; ' < > ? , . /g
        ) === -1
      ) {
        if (title.querySelector('.room_name').innerHTML.search(re) !== -1) {
          title.style.display = 'flex'
          title.classList.remove('removed')
          document.querySelector('.nothing-found').style.display = 'none'
        } else {
          title.style.display = 'none'
          title.classList.add('removed')
          let sum = 0
          titles.forEach((check) => {
            if (check.classList.contains('removed')) {
              sum++
            }
          })
          if (sum === titles.length) {
            document.querySelector('.nothing-found').style.display = 'block'
          }
        }
      }
    })
  }

  return (
    <div className="sidebar close">
      <div className="sidebar__header">
        <div className="sidebar__header__wrapper">
          <div
            className="avatar__wrapper"
            style={{cursor: 'pointer'}}
            onClick={() => setShowPopup(!showPopup)}
          >
            <Avatar src={user.photoURL} />
            {user.displayName && <h5>{user.displayName}</h5>}
          </div>
          {showPopup && (
            <ProfilePopup
              userStatus={userStatus}
              user={user}
              showPopup={showPopup}
              setShowPopup={setShowPopup}
            />
          )}
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
        {userStatus ? (
          <p style={{color: 'gray', marginLeft: '5px'}}>{userStatus}</p>
        ) : (
          <p
            onClick={() => setShowPopup(!showPopup)}
            style={{color: 'gray', marginLeft: '5px', cursor: 'pointer'}}
          >
            Изменить статус
          </p>
        )}
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
            isPinned={room.data.isPinned}
            roomNumber={room.data.id}
          />
        ))}
        <div className="nothing-found">
          <p>Ничего не найдено</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
