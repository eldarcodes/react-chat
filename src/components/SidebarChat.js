import React from 'react'
import {NavLink} from 'react-router-dom'
import {colors, menu} from './../utils/common'
import {ReactComponent as PinToTop} from '../assets/pushpin.svg'
import LongPress from './../utils/LongPress'
import CreateChatPopup from './../utils/CreateChatPopup'

import {Avatar} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import {Snackbar} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

const SidebarChat = ({
  pinToTop,
  isUserPinnedChat,
  message,
  showPopup,
  setShowPopup,
  addNewChat,
  name,
  color,
  id,
  user,
  setAlert,
  showAlert,
  alert
}) => {
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
        <CreateChatPopup
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          colors={colors}
          user={user}
          setAlert={setAlert}
        />
      )}
      <Snackbar open={alert} autoHideDuration={5000} onClose={showAlert}>
        <Alert onClose={showAlert} severity="success">
          Комната успешно создана!
        </Alert>
      </Snackbar>
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
