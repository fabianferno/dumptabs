import firebase from "firebase/app";
import { useHistory } from "react-router-dom";

export default function Layout(props) {
  const history = useHistory();
  function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // SignOut Successful
        history.push("/");
      })
      .catch((error) => {
        // An error happened
      });
  }

  return (
    <>
      <section className="bg-dark shadow">
        <div className=" d-flex p-3 justify-content-between align-items-center">
          <h1 className="text-white font-weight-bold mt-2">
            <strong>dump</strong>-tabs&trade;
          </h1>
          <button
            onClick={logout}
            className="btn btn-lg btn-primary font-weight-bold text-capitalize"
          >
            Logout
          </button>
        </div>
      </section>
      {props.children}
    </>
  );
}
