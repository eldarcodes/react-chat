import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {setUserData} from './../reducers/authReducer'
import Sidebar from './../components/Sidebar'
import db, {auth} from '../firebase/firebase'

const SidebarContainer = (props) => {
  const [rooms, setRooms] = useState([])
  const [searchInput, setSearch] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [alert, setAlert] = useState(false)
  const [userStatus, setUserStatus] = useState('')

  useEffect(() => {
    db.collection('users')
      .doc(props.user.uid)
      .onSnapshot((snap) => {
        setUserStatus(snap.data().status)
      })

    const sortPin = (testRoom) => {
      let pinnedRooms = []
      let unpinnedRooms = []
      if (testRoom) {
        testRoom.forEach((room) => {
          if (room.data.isPinned.length === 0) {
            unpinnedRooms.push(room)
          }

          room.data.isPinned.forEach((pin) => {
            if (props.user.uid === pin) {
              pinnedRooms.push(room)
            } else {
              unpinnedRooms.push(room)
            }
          })
        })
      }
      let newRooms = pinnedRooms.concat(unpinnedRooms)
      newRooms = Array.from(new Set(newRooms))

      return newRooms
    }

    const unsubscribe = db
      .collection('rooms')
      .orderBy('id', 'desc')
      .onSnapshot((snapshot) => {
        setRooms(
          sortPin(snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})))
        )
      })
    return () => {
      unsubscribe()
    }
  }, [props.user.uid])

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        window.location.href = '/'
      })
      .catch((err) => {
        alert(err)
      })
  }

  const showAlert = () => {
    setAlert(!alert)
  }

  const search = (e) => {
    let titles = document.querySelectorAll('.rooms')
    setSearch(e.target.value)
    titles.forEach((title) => {
      e.target.value = e.target.value.replace(/\\/g, '\\\\')
      let re = new RegExp(e.target.value, 'gi')

      if (
        e.target.value.search(
          /` ! @ # $ % ^ & * ( ) _ + | - = { } [ ] : " ; ' < > ? , . /g
        ) === -1
      ) {
        if (title.querySelector('.room_name').innerHTML.search(re) !== -1) {
          title.style.display = 'flex'
          title.classList.remove('removed')
          document.querySelector('.nothing-found').style.display = 'none'
        } else {
          title.style.display = 'none'
          title.classList.add('removed')
          let sum = 0
          titles.forEach((check) => {
            if (check.classList.contains('removed')) {
              sum++
            }
          })
          if (sum === titles.length) {
            document.querySelector('.nothing-found').style.display = 'block'
          }
        }
      }
    })
  }

  return (
    <Sidebar
      {...props}
      search={search}
      showPopup={showPopup}
      rooms={rooms}
      userStatus={userStatus}
      setShowPopup={setShowPopup}
      signOut={signOut}
      searchInput={searchInput}
      alert={alert}
      setAlert={setAlert}
      showAlert={showAlert}
    />
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, {
  setUserData,
})(SidebarContainer)
