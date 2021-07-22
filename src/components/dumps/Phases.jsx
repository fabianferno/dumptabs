import React from "react";
import { useRef, useState, useEffect } from "react";
import { AnimateSharedLayout } from "framer-motion";
import Zone from "./Zone";

export default function Phases(props) {
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
    <section>
      <div className="d-flex m-5 align-items-start justify-content-center">
        <AnimateSharedLayout>
          <div
            className="phase-container"
            style={{ borderBottom: "15px solid #3500D3" }}
          >
            <Zone
              title="Perhaps"
              color="#dddddd"
              isSelected={activePart === "a"}
              onViewportBoxUpdate={onViewportBoxUpdate}
            />

            <Zone
              title="Wants"
              color="#dddddd"
              isSelected={activePart === "b"}
              onViewportBoxUpdate={onViewportBoxUpdate}
            />

            <Zone
              title="Musts"
              color="#dddddd"
              isSelected={activePart === "c"}
              onViewportBoxUpdate={onViewportBoxUpdate}
            />
          </div>
        </AnimateSharedLayout>
      </div>
      <p className="text-white h1 bg-dark container text-center p-2 ">
        We use this software to brainstorm.
      </p>
    </section>
  );
}
