import React from "react";
import { motion } from "framer-motion";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { useState } from "react";
import firebase from "firebase/app";

import { useHarperDB } from "use-harperdb";

export default function Zone({
  title,
  color,
  isSelected,
  activePart,
  onViewportBoxUpdate,
}) {
  const [typerValue, setTyper] = useState("");

  // primary request, re-run every 5 seconds
  const [data, loading, error, refresh] = useHarperDB({
    query: {
      operation: "search_by_value",
      schema: "dumptabs",
      table: "dumps",
      search_attribute: "uid",
      search_value: firebase.auth().currentUser.uid,
      get_attributes: ["perhaps", "wants", "musts"],
    },
  });

  const StyledTextField = withStyles((theme) => ({
    root: {
      width: 300,
      "& .MuiInputBase-root": {
        color: "#000000",
      },
    },
  }))(TextField);

  const ZoneItems = (props) => {
    return props.items.map((item) => {
      return (
        <div className="card bg-primary   shadow  text-white my-2">
          <div className="card-body ">
            {JSON.stringify(item.dump).replace(/['"]+/g, "")}
          </div>
        </div>
      );
    });
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();

    refresh();

    // Get current value
    var updatedPhase = data[0];

    // Update phase corresponding to the active part
    if (activePart === "perhaps") {
      updatedPhase.perhaps.push(typerValue);
    } else if (activePart === "wants") {
      updatedPhase.wants.push(typerValue);
    } else if (activePart === "musts") {
      updatedPhase.musts.push(typerValue);
    }
  };

  return (
    <div className="part-container">
      <motion.div className="overlay"></motion.div>
      {isSelected && (
        <div className="">
          <h1
            style={{ zIndex: "1" }}
            className="text-white no-select mx-4 mb-3"
          >
            {title}
          </h1>

          {data ? (
            <div>
              {activePart === "perhaps" ? (
                <ZoneItems items={data[0].perhaps} />
              ) : activePart === "wants" ? (
                <ZoneItems items={data[0].wants} />
              ) : (
                <ZoneItems items={data[0].musts} />
              )}
            </div>
          ) : error ? (
            <div style={{ color: "red" }}>error: {error || "false"}</div>
          ) : (
            <div>Loading</div>
          )}

          <motion.div
            className="box container mt-4"
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
                onChange={(e) => setTyper(e.target.value)}
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
