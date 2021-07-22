import React from "react";
import { useRef, useState, useEffect } from "react";
import { AnimateSharedLayout } from "framer-motion";
import Zone from "./Zone";

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
  const [activePart, setActivePart] = useState("a");

  const onViewportBoxUpdate = ({ x }) => {
    const partViewPort = viewportWidth.current / 3;

    if (activePart === "a" && x.min > partViewPort) {
      setActivePart("b");
    } else if (activePart === "b" && x.min > 2 * partViewPort) {
      setActivePart("c");
    } else if (activePart === "c" && x.max < 2 * partViewPort) {
      setActivePart("b");
    } else if (activePart === "b" && x.max < partViewPort) {
      setActivePart("a");
    }
  };

  return (
    <section className="d-flex align-items-start justify-content-center">
      <AnimateSharedLayout>
        <div className="phase-container bg-primary">
          <Zone
            title="Perhaps"
            color="#C9E947"
            isSelected={activePart === "a"}
            onViewportBoxUpdate={onViewportBoxUpdate}
          />

          <Zone
            title="Wants"
            color="#FED700"
            isSelected={activePart === "b"}
            onViewportBoxUpdate={onViewportBoxUpdate}
          />

          <Zone
            title="Musts"
            color="#ffffff"
            isSelected={activePart === "c"}
            onViewportBoxUpdate={onViewportBoxUpdate}
          />
        </div>
      </AnimateSharedLayout>
    </section>
  );
}
