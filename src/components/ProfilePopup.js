import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'
import Divider from '@material-ui/core/Divider'
import {Avatar} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import EditIcon from '@material-ui/icons/Edit'
import db from './../firebase/firebase'
import IconButton from '@material-ui/core/IconButton'
import ChangeProfileName from './ChangeProfileName'

export default function ProfilePopup({
  showPopup,
  setShowPopup,
  user,
  userStatus,
}) {
  const [popupName, setPopupName] = useState(false)
  const [username, setUsername] = useState(user.displayName)
  const [bioLength, setBioLength] = useState(70)
  const [status, setStatus] = useState(userStatus)

  useEffect(() => {
    if (userStatus) {
      setBioLength(70 - status.length)
    }
  }, [])

  const handleClose = () => {
    setShowPopup(false)
  }

  const changeStatus = (e) => {
    if (e.target.value.length >= 71) {
      return
    }
    setStatus(e.target.value)
    setBioLength(70 - e.target.value.length)
  }

  const saveChanges = () => {
    db.collection('users').doc(user.uid).set(
      {
        status: status,
      },
      {merge: true}
    )
    setShowPopup(false)
  }
  return (
    <Dialog
      open={showPopup}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <div className="test" style={{maxWidth: '440px'}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <DialogTitle id="form-dialog-title">Информация</DialogTitle>
          <IconButton style={{marginRight: '24px'}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '20px 0',
          }}
        >
          <Avatar src={user.photoURL} style={{width: '70px', height: '70px'}} />
          <Button
            style={{
              borderRadius: '15px',
              height: '35px',
              backgroundColor: '#0088CC',
              margin: '12px 0',
            }}
            variant="contained"
            color="primary"
          >
            Выбрать фото
          </Button>
        </div>
        <Divider />

        <DialogContent>
          <DialogContentText style={{margin: '0'}}>
            <div
              className="profilePopup__displayName"
              style={{cursor: 'pointer'}}
              onClick={() => {
                setPopupName(!popupName)
              }}
            >
              <PersonIcon />
              <div>{username}</div>
              <EditIcon className="profilePopup__editIcon" />
            </div>
            {popupName && (
              <ChangeProfileName
                setPopupName={setPopupName}
                popupName={popupName}
                setUsername={setUsername}
                user={user}
              />
            )}
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={status}
                label="О себе"
                type="email"
                fullWidth
                onChange={changeStatus}
                onKeyDown={(e) => e.key === 'Enter' && saveChanges()}
              />
              <span>{bioLength}</span>
            </div>

            <span>
              Любые подробности, например: возраст, род занятий или город.
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={saveChanges} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  )
}
