import React from "react";
import { motion } from "framer-motion";
import TextField from "@material-ui/core/TextField";

export default function Zone({
  title,
  color,
  isSelected,
  onViewportBoxUpdate,
}) {
  return (
    <div className="half-container">
      <h1 className="text-white">{title}</h1>

      <motion.div className="overlay shadow" />
      {isSelected && (
        <motion.div
          className="box shadow container"
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
            <TextField
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
