import React, {useState, useEffect} from 'react'
import {Avatar} from '@material-ui/core'
import db from './../firebase/firebase'
import {NavLink} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import {useStateValue} from './../StateProvider'
import {colors, menu} from './../utils/common'
import {ReactComponent as PinToTop} from '../assets/pushpin.svg'
import LongPress from './../utils/LongPress'
import FormDialog from './../utils/FormDialog'

const SidebarChat = ({addNewChat, id, name, color, isPinned, roomNumber}) => {
  const [{user}, dispatch] = useStateValue()
  const [message, setMessages] = useState([])
  const [showPopup, setShowPopup] = useState(false)

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

  const pinToTop = () => {
    db.collection('rooms')
      .doc(id)
      .get()
      .then((snap) => {
        let result = []
        snap.data().isPinned.forEach((item) => {
          if (!result.includes(item)) {
            result.push(item)
          }
        })
        let isFind = false
        result.forEach((res) => {
          if (res === user.uid) {
            isFind = true
            let index = result.indexOf(user.uid)
            result.splice(index, 1)
            db.collection('rooms').doc(id).set(
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
            .doc(id)
            .set(
              {
                isPinned: [...snap.data().isPinned, user.uid],
              },
              {merge: true}
            )
        }
      })
  }

  const isUserPinnedChat = () => {
    let pinned = false
    if (isPinned) {
      isPinned.forEach((item) => {
        if (user.uid === item) {
          pinned = true
        }
      })
    }
    return pinned
  }
  return !addNewChat ? (
    <LongPress time={400} onPress={() => menu()} onLongPress={() => pinToTop()}>
      <NavLink to={`/rooms/${id}`} activeClassName="activeLink">
        <div
          className={`sidebarChat rooms ${isUserPinnedChat() && 'isPinned'}`}
        >
          <Avatar style={{backgroundColor: color}} />
          <div className="sidebarChat__info">
            <h2 className="room_name">{name}</h2>
            <p className="old__message">
              {message[0]?.message ? message[0]?.message : ' '}
            </p>
          </div>
          <div data-id={`${id}`} className="pin__toTop" onClick={pinToTop}>
            <PinToTop />
          </div>
        </div>
      </NavLink>
    </LongPress>
  ) : (
    <>
      {showPopup && (
        <FormDialog
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          colors={colors}
          user={user}
        />
      )}
      <div
        onClick={() => setShowPopup(!showPopup)}
        className="sidebarChat plus__icon"
      >
        <h2 className="addChat">Добавить новый чат</h2>
        <AddIcon className="addChatIcon" />
      </div>
    </>
  )
}

export default SidebarChat
