import React, {useState, useEffect} from 'react'
import db from '../firebase/firebase'

import Dialog from '@material-ui/core/Dialog'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'
import {Avatar, Switch} from '@material-ui/core'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined'
import {Button} from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import PhoneIcon from '@material-ui/icons/Phone'
import MoreVertIcon from '@material-ui/icons/MoreVert'

export default function UserProfilePopup({open, setOpen, userId}) {
  const [user, setUser] = useState({})
  const [isFetching, setIsFetching] = useState(true)
  const [checked, setChecked] = useState(true)

  useEffect(() => {
    db.collection('users')
      .doc(userId)
      .get()
      .then((res) => {
        setUser(res.data())
        setIsFetching(false)
      })
  }, [userId])

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      maxWidth="xs"
      aria-labelledby="form-dialog-title"
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <DialogTitle id="form-dialog-title">Информация</DialogTitle>
        <div>
          <IconButton style={{marginRight: '5px'}}>
            <PhoneIcon />
          </IconButton>
          <IconButton className="MoreVertProfile" style={{marginRight: '5px'}}>
            <MoreVertIcon />
          </IconButton>
          <IconButton style={{marginRight: '24px'}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <Divider />
      <DialogContent>
        {isFetching ? (
          <CircularProgress />
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              margin: '10px 0',
            }}
          >
            <Avatar
              style={{width: '70px', height: '70px'}}
              src={user.photoURL}
            />
            <div style={{marginLeft: '15px'}}>
              <h4>{user.displayName}</h4>
              <span style={{color: 'gray', fontSize: '14px'}}>
                был(а) сегодня
              </span>
            </div>
          </div>
        )}
      </DialogContent>
      <Divider />
      <DialogContent>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            margin: '10px 0',
          }}
        >
          <InfoOutlinedIcon style={{color: 'gray', margin: '10px 30px 0 0'}} />
          <div>
            {user.email && (
              <div>
                <div>{user.email}</div>
                <div style={{color: 'gray', fontSize: '15px'}}>Email</div>
              </div>
            )}
            {user.status && (
              <div style={{marginTop: `${user.email ? '15px' : '0'}`}}>
                <div>{user.status}</div>
                <div style={{color: 'gray', fontSize: '15px'}}>О себе</div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
      <Divider />
      <DialogContent>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: '10px 0',
          }}
        >
          <NotificationsNoneOutlinedIcon
            style={{color: 'gray', margin: '0 30px 0 0'}}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <span>Уведомления</span>
            <Switch
              color="primary"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          </div>
        </div>
      </DialogContent>
      <Divider />
      <DialogActions style={{justifyContent: 'center', padding: '15px 24px'}}>
        <Button fullWidth={true} color="secondary">
          Заблокировать
        </Button>
      </DialogActions>
    </Dialog>
  )
}
