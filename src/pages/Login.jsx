import { useHistory } from "react-router-dom";

import "../firebase";

import firebase from "firebase/app";
import "firebase/auth";

import { SocialIcon } from "react-social-icons";

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

  function signInWithGitHub() {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;

        console.log(token);
        console.log(user);
      })
      .catch(function (error) {
        console.log(error.code);
        console.log(error.message);
      });
  }

  return (
    <section>
      <div
        className="container d-flex align-items-center justify-content-center flex-column"
        style={{ minHeight: "100vh" }}
      >
        <h1 className="text-white bg-primary container text-center p-5 ">
          react-<strong>dump</strong>-tabs
        </h1>
        <p className="text-white bg-dark container text-center p-2 ">
          Sign in below to start
        </p>

        <div className="d-flex justify-content-around mt-5">
          <div className="mx-3" onClick={signInWithGitHub}>
            <SocialIcon network="github" fgColor="#ffffff" bgColor="#3500D3" />
            <span className="btn social-pill mr-5 font-weight-bold text-capitalize">
              Github
            </span>
          </div>

          <div className="mx-3" onClick={signInWithGoogle}>
            <SocialIcon network="google" fgColor="#ffffff" bgColor="#3500D3" />
            <span className="btn social-pill mr-5 font-weight-bold">
              Google
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
