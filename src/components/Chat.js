import React from 'react'
import Picker from 'emoji-picker-react'
import {menu, isLink} from './../utils/common'
import UserProfilePopup from './UserProfilePopup'

import MenuIcon from '@material-ui/icons/Menu'
import EditIcon from '@material-ui/icons/Edit'
import {Avatar} from '@material-ui/core'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFile from '@material-ui/icons/AttachFile'
import IconButton from '@material-ui/core/IconButton'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import SendIcon from '@material-ui/icons/Send'

const Chat = ({
  user,
  el,
  popup,
  onEmojiClick,
  input,
  setShowSend,
  setInput,
  showSend,
  setPopup,
  showUserProfile,
  messageUserId,
  sendMessage,
  changeRoomName,
  color,
  changeName,
  setNewRoomName,
  newRoomName,
  messages,
  roomName,
  setChangeName,
  room,
  setMessageUserId,
  setShowUserProfile,
}) => {
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
