import React from "react";
import { useRef, useState, useEffect } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";

export default function Notes(props) {
  const useViewportWidth = () => {
    const viewportWidth = useRef(0);
    useEffect(() => {
      const updateViewportWidth = () => {
        viewportWidth.current = window.innerWidth;
      };
      updateViewportWidth();
      window.addEventListener("resize", updateViewportWidth);
    }, []);
    return viewportWidth;
  };

  const viewportWidth = useViewportWidth();
  const [activeHalf, setActiveHalf] = useState("a");

  const onViewportBoxUpdate = ({ x }) => {
    const halfViewport = viewportWidth.current / 3;

    if (activeHalf === "a" && x.min > halfViewport) {
      setActiveHalf("b");
    } else if (activeHalf === "b" && x.max < 2 * halfViewport) {
      setActiveHalf("a");
    } else if (activeHalf === "b" && x.min > 2 * halfViewport) {
      setActiveHalf("c");
    } else if (activeHalf === "c" && x.min > 3 * halfViewport) {
      setActiveHalf("b");
    } else if (activeHalf === "c" && x.min > 3 * halfViewport) {
      setActiveHalf("a");
    }
  };

  return (
    <section className="d-flex align-items-start justify-content-center">
      <AnimateSharedLayout>
        <div className="container">
          <Zone
            color="#60ff9f"
            isSelected={activeHalf === "a"}
            onViewportBoxUpdate={onViewportBoxUpdate}
          />
          <Zone
            color="#7b2ff7"
            isSelected={activeHalf === "b"}
            onViewportBoxUpdate={onViewportBoxUpdate}
          />
          <Zone
            color="#ffffff"
            isSelected={activeHalf === "c"}
            onViewportBoxUpdate={onViewportBoxUpdate}
          />
        </div>
      </AnimateSharedLayout>
    </section>
  );
}

function Zone({ color, isSelected, onViewportBoxUpdate }) {
  return (
    <div className="half-container bg-primary ">
      <motion.div className="overlay shadow" />
      {isSelected && (
        <motion.div
          className="box shadow"
          layoutId="box"
          initial={false}
          animate={{ backgroundColor: color }}
          drag
          // Snap the box back to its center when we let go
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          // Allow full movememnt outside constraints
          dragElastic={1}
          onViewportBoxUpdate={onViewportBoxUpdate}
        />
      )}
    </div>
  );
}
