import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import "../firebase";

import firebase from "firebase/app";
import "firebase/auth";

export default function Login() {
  const history = useHistory();
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log(user);
      history.push("/home");
    }
  });

  function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        /** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;
      })
      .catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
      });
  }

  return (
    <section>
      <div
        className="container d-flex align-items-center justify-content-center flex-column"
        style={{ minHeight: "100vh" }}
      >
        <h1 className="text-primary">
          <strong>reactor</strong>-pad-app
        </h1>
        <Button
          variant="contained"
          color="primary"
          className="mt-3"
          style={{ textTransform: "capitalize" }}
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
      </div>
    </section>
  );
}