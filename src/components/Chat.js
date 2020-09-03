import React, {useState, useEffect} from 'react'
import '../scss/Chat.scss'
import {Avatar} from '@material-ui/core'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFile from '@material-ui/icons/AttachFile'
import IconButton from '@material-ui/core/IconButton'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import { useParams } from 'react-router-dom'

const Chat = () => {
  const [seed, setSeed] = useState('')
  const [input, setInput] = useState('')
  const [roomName, setRoomName] = useState("")
  const {roomId} = useParams()

  useEffect(() => {
      if(roomId) {
          
      }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    setInput('')
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
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
        <p className={`chat__message ${true && 'chat__reciever'}`}>
          <span className="chat__name">Eldar Myrzabekov</span>
          Hey guys
          <span className="chat__timestamp">15:32</span>
        </p>
        <p className="chat__message">Hey guys</p>
        <p className="chat__message">Hey guys</p>
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form action="">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Напишите сообщение"
            type="text"
          />
          <button type="submit" onClick={sendMessage}>
            Отправить сообщение
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat
