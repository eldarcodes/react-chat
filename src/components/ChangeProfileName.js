import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import db from '../firebase/firebase'
import {auth} from '../firebase/firebase'
import {connect} from 'react-redux'
import {setUserData} from './../reducers/authReducer'

function ChangeProfileName({popupName, setPopupName, user, setUsername}) {
  const [input, setInput] = React.useState(user.displayName)

  const handleClose = () => {
    setPopupName(false)
  }

  const saveName = () => {
    if (input.length > 30) {
      alert('Слишком длинное имя!')
      return
    } else if (input) {
      auth.currentUser.updateProfile({
        displayName: input,
      })
      setUserData(auth.currentUser)
      db.collection('users').doc(user.uid).set(
        {
          displayName: input,
        },
        {merge: true}
      )
      setPopupName(false)
      setUsername(input)
    }
  }

  return (
    <Dialog
      open={popupName}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Редактирование имени</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && saveName()}
          label="Имя"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={saveName} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {
  setUserData,
})(ChangeProfileName)
