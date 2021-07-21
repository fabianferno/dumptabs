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
      <section className="">
        <div className="bg-dark d-flex p-3 justify-content-between align-items-center">
          <h2 className="font-weight-bold">react-dump-tabs</h2>
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
