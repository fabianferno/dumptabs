import { useHistory } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

import "../features/firebase";
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
        <h1
          style={{ fontSize: "5rem" }}
          className="text-white bg-primary container text-center p-5 "
        >
          <strong>dump</strong>-tabs&trade;
        </h1>
        <p
          style={{ fontSize: "0.7rem" }}
          className="text-dark bg-success container text-center p-2 mb-2"
        >
          Developed by{" "}
          <a
            href="https://www.fabianferno.tech"
            className="font-weight-bold text-black text-decoration-none"
          >
            Fabian Ferno
          </a>
        </p>
        <p
          style={{ fontSize: "2rem" }}
          className="text-white container text-center p-2 mt-5"
        >
          Hello There, sign in below to get started.
        </p>

        <div className="d-flex justify-content-around mt-2">
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
