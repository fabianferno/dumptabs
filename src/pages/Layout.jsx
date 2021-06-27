import Appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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
      <Appbar position="static">
        <Toolbar className="bg-dark d-flex justify-content-between">
          <Typography variant="h6" className="font-weight-bold">
            reactor-pad-app
          </Typography>
          <Button
            onClick={logout}
            variant="contained"
            className="font-weight-bold text-capitalize"
          >
            Logout
          </Button>
        </Toolbar>
      </Appbar>
      {props.children}
    </>
  );
}