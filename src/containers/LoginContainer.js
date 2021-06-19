import React, { useState } from "react";
import { connect } from "react-redux";
import Login from "../components/Login";
import { setUserData } from "./../reducers/authReducer";
import db, { auth, provider } from "../firebase/firebase";

const LoginContainer = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      let result = await auth.signInWithPopup(provider);

      setUserData(result.user);

      db.collection("users").doc(result.user.uid).set(
        {
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          uid: result.user.uid,
          email: result.user.email,
        },
        { merge: true }
      );
    } catch (err) {
      alert(err);
    }
  };

  const signInWithPassword = async (e) => {
    e.preventDefault();
    let result = await auth.signInWithEmailAndPassword(email, password);
    try {
      db.collection("users").doc(result.user.uid).set({
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        uid: result.user.uid,
        email: result.user.email,
      });
    } catch (err) {
      alert(err);
    }
  };
  return (
    <Login
      signInWithGoogle={signInWithGoogle}
      signInWithPassword={signInWithPassword}
      setEmail={setEmail}
      setPassword={setPassword}
      {...props}
    />
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  setUserData,
})(LoginContainer);
