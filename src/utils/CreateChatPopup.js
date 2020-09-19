import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import db from '../firebase/firebase'

const CreateChatPopup = ({colors, user, showPopup, setShowPopup, setAlert}) => {
  const [roomName, setRoomName] = useState('')
  const [open, setOpen] = useState(showPopup)

  const handleClose = () => {
    setOpen(false)
    setShowPopup(false)
  }

  const createChat = async () => {
    if (roomName) {
      if (roomName.length >= 30) {
        alert('Слишком длинное название для чата!')
      } else {
        let snap = await db.collection('rooms').get()
        setAlert(true)
        db.collection('rooms').add({
          name: roomName,
          color: colors[Math.floor(Math.random() * colors.length)],
          creator: user.uid,
          id: snap.size + 1,
          isPinned: [],
        })
      }
    }
    setOpen(false)
    setShowPopup(false)
  }

  return (
    <div>
      <Dialog
        onClose={handleClose}
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Создать новый чат</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Чтобы создать новый чат, пожалуйста, введите название
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={roomName}
            label="Название чата"
            type="text"
            onKeyDown={(e) => e.key === 'Enter' && createChat()}
            onChange={(e) => setRoomName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
          <Button onClick={createChat} color="primary">
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreateChatPopup
