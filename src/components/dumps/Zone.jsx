import React from "react";
import { motion } from "framer-motion";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import firebase from "firebase/app";

import { useHarperDB } from "use-harperdb";
import runAtDb from "../../features/harper-db";

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
      get_attributes: ["uid", "perhaps", "wants", "musts"],
    },
  });

  const ZoneItems = (props) => {
    return props.items.map((item) => {
      return (
        <div className="card pt-3 pb-0 px-2 bg-primary shadow text-white my-2">
          <div className=" ">
            <h5>{JSON.stringify(item.dump).replace(/['"]+/g, "")}</h5>
            <p className="badge badge-pill d-flex justify-content-end badge-success bg-secondary pb-0">
              {JSON.stringify(item.created).replace(/['"]+/g, "")}
            </p>
          </div>
        </div>
      );
    });
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();

    // Get current value
    var currentPhase = data[0];
    var newZone = {
      dump: typerValue,
      created: new Date().toISOString(),
    };

    // Update phase corresponding to the active part
    if (activePart === "perhaps") {
      currentPhase.perhaps.push(newZone);
    } else if (activePart === "wants") {
      currentPhase.wants.push(newZone);
    } else if (activePart === "musts") {
      currentPhase.musts.push(newZone);
    }

    var insertStatus = runAtDb({
      operation: "update",
      schema: "dumptabs",
      table: "dumps",
      records: [currentPhase],
    });
    console.log(insertStatus);

    if (insertStatus.skipped_hashes.length !== 0) {
      setTyper("");
      refresh();
    }
  };

  return (
    <div className="part-container">
      <motion.div className="overlay"></motion.div>
      {isSelected && (
        <div className="">
          <h1
            style={{ zIndex: "2" }}
            className=" position-relative text-white no-select mx-4 mb-3"
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

              {console.log(data)}
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
              <TextField
                label="Type something..."
                rows={2}
                style={{ width: "16vw" }}
                value={typerValue}
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
