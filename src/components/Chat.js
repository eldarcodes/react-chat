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

const Chat = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [roomName, setRoomName] = useState('')
  const [color, setColor] = useState('')
  const {roomId} = useParams()
  const [{user}, dispatch] = useStateValue()

  const el = useRef(null)

  useEffect(() => {
    el.current.scrollIntoView({block: 'end', behavior: 'auto'})
  })

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name)
          setColor(snapshot.data().color)
        })
    }
    db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      )
  }, [roomId])

  const sendMessage = (e) => {
    e.preventDefault()
    if (input) {
      db.collection('rooms').doc(roomId).collection('messages').add({
        name: user.displayName,
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }
    setInput('')
  }
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar style={{backgroundColor: color}} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Был в сети:
            {messages.length
              ? new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toUTCString()
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
              message.name === user.displayName && 'chat__reciever'
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
        <div id="el" ref={el}></div>
      </div>
      <div className="chat__footer">
        <IconButton className="emotio">
          <InsertEmoticonIcon />
        </IconButton>
        <form action="">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Напишите сообщение"
            type="text"
          />
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
        </form>
        <IconButton className="mic_icon">
          <MicIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default Chat
