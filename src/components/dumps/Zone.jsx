import React from "react";
import { motion } from "framer-motion";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

export default function Zone({
  title,
  color,
  isSelected,
  onViewportBoxUpdate,
}) {
  const StyledTextField = withStyles((theme) => ({
    root: {
      width: 300,
      "& .MuiInputBase-root": {
        color: "#3500D3",
        height: 60,
        borderBottom: "5px #3500D3",
      },
    },
  }))(TextField);

  return (
    <div className="half-container ">
      <h1 className="text-white no-select mx-4">{title}</h1>

      <motion.div className="overlay  " />
      {isSelected && (
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
          <form
            action="#"
            className="p-2 d-flex align-items-center text-white "
          >
            <StyledTextField
              label="Type something..."
              rows={3}
              fullWidth
              multiline
              className="d-flex font-weight-bold"
              // onChange={handleChange}
              // value={state.note}
            />
          </form>
        </motion.div>
      )}
    </div>
  );
}
