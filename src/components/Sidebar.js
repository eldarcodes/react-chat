import React from 'react'
import {menu} from './../utils/common'
import ProfilePopup from './ProfilePopup'
import SidebarChatContainer from '../containers/SidebarChatContainer'

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import CloseIcon from '@material-ui/icons/Close'
import {Avatar} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ChatIcon from '@material-ui/icons/Chat'
import IconButton from '@material-ui/core/IconButton'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

const Sidebar = ({
  user,
  userStatus,
  search,
  rooms,
  showPopup,
  setShowPopup,
  searchInput,
  signOut,
  handleClose,
  showAlert,
  alert,
  setAlert,
}) => {
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
              setAlert={setAlert}
            />
          )}
          <Snackbar open={alert} autoHideDuration={5000} onClose={showAlert}>
            <Alert onClose={showAlert} severity="success">
              Статус успешно изменен!
            </Alert>
          </Snackbar>
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
        <SidebarChatContainer addNewChat />
        {rooms.map((room, i) => (
          <SidebarChatContainer
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
