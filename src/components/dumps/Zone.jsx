import React from "react";
import { motion } from "framer-motion";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import runAtDb from "../../features/harper-db";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "../../features/firebase";

export default function Zone({
  title,
  color,
  isSelected,
  activePart,
  onViewportBoxUpdate,
}) {
  const [dumps, setDumps] = useState(null);

  useEffect(() => {
    var userData = runAtDb({
      operation: "search_by_value",
      schema: "dumptabs",
      table: "dumps",
      search_attribute: "uid",
      search_value: firebase.auth().currentUser.uid,
      get_attributes: ["perhaps", "wants", "musts"],
    });
    setDumps(userData);
    console.log(userData);
  }, [setDumps, activePart]);

  const StyledTextField = withStyles((theme) => ({
    root: {
      width: 300,
      "& .MuiInputBase-root": {
        color: "#000000",
      },
    },
  }))(TextField);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    console.log(dumps);
  };

  return (
    <div className="part-container">
      <motion.div className="overlay  " />
      {isSelected && (
        <div className="">
          <h1
            style={{ zIndex: "1" }}
            className="text-white no-select mx-4 mb-3"
          >
            {title}
          </h1>
          <motion.div
            className="box container"
            layoutId="box"
            initial={false}
            animate={{ backgroundColor: color }}
            drag
            // Snap the box back to its center when we let go
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            // Allow full movememnt outside constraints
            dragElastic={1}
            onViewportBoxUpdate={onViewportBoxUpdate}
          >
            <form action="#" className="p-2 text-white ">
              <StyledTextField
                label="Type something..."
                rows={2}
                fullWidth
                multiline
                variant="filled"
                className="d-flex"
              />
              <div className="d-flex justify-content-end">
                <button
                  onClick={handleSubmitClick}
                  className="mt-2 badge rounded-pill btn btn-block btn-primary"
                >
                  + Dump this zone
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
