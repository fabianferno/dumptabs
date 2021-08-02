import React from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import runAtDb from "./features/harper-db";

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          this.setState({
            isLoaded: true,
            user: user,
          });
        } else {
          this.setState({
            isLoaded: true,
            user: false,
          });
        }
      }.bind(this)
    );
  }

  render() {
    const { isLoaded, user } = this.state;
    if (!isLoaded) {
      //If the user has no entries in the database yet, we create them
      // var insertStatus = runAtDb({
      //   operation: "insert",
      //   schema: "dumptabs",
      //   table: "dumps",
      //   records: [
      //     {
      //       uid: firebase.auth().currentUser.uid,
      //       perhaps: [],
      //       wants: [],
      //       musts: [],
      //     },
      //   ],
      // });
      // console.log(insertStatus);
      // // Check for a user's data in the database
      // var userData = runAtDb({
      //   operation: "search_by_value",
      //   schema: "dumptabs",
      //   table: "dumps",
      //   search_attribute: "uid",
      //   search_value: firebase.auth().currentUser.uid,
      //   get_attributes: ["perhaps", "wants", "musts"],
      // });
      // if (userData.length === 0) {
      //   // If the user has no entries in the database yet, we create them
      //   var insertStatus = runAtDb({
      //     operation: "insert",
      //     schema: "dumptabs",
      //     table: "dumps",
      //     records: [
      //       {
      //         uid: firebase.auth().currentUser.uid,
      //         perhaps: [],
      //         wants: [],
      //         musts: [],
      //       },
      //     ],
      //   });
      //   console.log(insertStatus);
      //}

      return (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "100vh",
            width: "100vw",
          }}
        >
          <div
            style={{ width: "30rem", height: "30rem" }}
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    } else {
      if (user) {
        const Component = this.props.component;
        return <Component />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        );
      }
    }
  }
}

export default PrivateRoute;
