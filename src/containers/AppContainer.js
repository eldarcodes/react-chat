import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import App from '../App'
import {setUserData} from './../reducers/authReducer'
import {auth} from '../firebase/firebase'

const AppContainer = (props) => {
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        props.setUserData(user)
      }
      setIsFetching(false)
    })
  }, [props])

  return <App {...props} isFetching={isFetching} />
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, {
  setUserData,
})(AppContainer)
