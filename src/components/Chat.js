import React, {useState, useEffect, useRef} from 'react'
import {Avatar} from '@material-ui/core'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFile from '@material-ui/icons/AttachFile'
import IconButton from '@material-ui/core/IconButton'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import {useParams} from 'react-router-dom'
import db from './../firebase/firebase'
import {useStateValue} from './../StateProvider'
import firebase from 'firebase'
import SendIcon from '@material-ui/icons/Send'
import Picker from 'emoji-picker-react'
import MenuIcon from '@material-ui/icons/Menu'
import EditIcon from '@material-ui/icons/Edit'
import {menu, isLink} from './../utils/common'
import UserProfilePopup from './UserProfilePopup'

const Chat = () => {
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

  const [chosenEmoji, setChosenEmoji] = useState(null)

  const {roomId} = useParams()
  const [{user}, dispatch] = useStateValue()
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
    if (input) {
      db.collection('rooms').doc(roomId).collection('messages').add({
        name: user.displayName,
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: user.uid,
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
      user.uid === room.creator
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

  return (
    <div className="chat">
      <div className="chat__header">
        <MenuIcon
          className="menu"
          style={{marginRight: '15px', display: 'none'}}
          onClick={menu}
        />
        <Avatar style={{backgroundColor: color}} />
        <div className="chat__headerInfo">
          <div style={{display: 'flex', alignItems: 'center'}}>
            {changeName ? (
              <input
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && changeRoomName()}
                className="form-control change__title-chat"
                onBlur={changeRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                value={newRoomName}
                type="text"
              />
            ) : (
              <h3>{roomName}</h3>
            )}
            <IconButton
              onClick={() => {
                setNewRoomName(roomName)
                setChangeName(!changeName)
              }}
              style={{
                padding: '5px',
                marginLeft: '10px',
                visibility: `${
                  user.uid === room.creator ? 'visible' : 'hidden'
                }`,
              }}
            >
              <EditIcon />
            </IconButton>
          </div>
          <p>
            Был в сети:
            {messages.length
              ? ' ' +
                new Date(messages[messages.length - 1]?.timestamp?.toDate())
                  .toString()
                  .slice(0, -45)
              : ' -'}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message, i) => (
          <p
            key={i}
            className={`chat__message ${
              message.userId === user.uid ? 'chat__reciever' : ''
            }`}
          >
            {user.uid !== message.userId && (
              <span
                style={{cursor: 'pointer'}}
                onClick={() => {
                  setMessageUserId(message.userId)
                  setShowUserProfile(!showUserProfile)
                }}
                className="chat__name"
              >
                {message.name}
              </span>
            )}

            {isLink(message.message) ? (
              <a
                rel="noopener noreferrer"
                className="message__link"
                href={message.message}
                target="_blank"
              >
                <span> {message.message}</span>
              </a>
            ) : (
              message.message
            )}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toString().slice(16, -45)}
            </span>
          </p>
        ))}
        {showUserProfile && (
          <UserProfilePopup
            userId={messageUserId}
            open={showUserProfile}
            setOpen={setShowUserProfile}
          />
        )}
        <div id="el" ref={el}></div>
      </div>
      <div className="chat__footer">
        {popup && (
          <Picker
            disableSkinTonePicker={true}
            disableSearchBar={true}
            disableAutoFocus={true}
            preload={true}
            onEmojiClick={onEmojiClick}
          />
        )}
        <form action="">
          <input
            value={input}
            onChange={(e) => {
              setShowSend(true)
              setInput(e.target.value)
              if (!e.target.value) {
                setShowSend(false)
              }
            }}
            placeholder="Напишите сообщение"
            type="text"
          />
          <IconButton onClick={() => setPopup(!popup)}>
            <InsertEmoticonIcon />
          </IconButton>
          {showSend ? (
            <button
              className="send_mes"
              style={{padding: 0}}
              type="submit"
              onClick={sendMessage}
            >
              <IconButton>
                <SendIcon />
              </IconButton>
            </button>
          ) : (
            <IconButton className="mic_icon">
              <MicIcon />
            </IconButton>
          )}
        </form>
      </div>
    </div>
  )
}

export default Chat
