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
      <div className="d-flex m-5  align-items-start justify-content-center">
        <AnimateSharedLayout>
          <div
            className="phase-container "
            style={{ borderBottom: "15px solid #3500D3" }}
          >
            <Zone
              title="Perhaps🙌"
              color="#BAF70C"
              isSelected={activePart === "a"}
              onViewportBoxUpdate={onViewportBoxUpdate}
            />

            <Zone
              title="Wants🤞"
              color="#FED700"
              isSelected={activePart === "b"}
              onViewportBoxUpdate={onViewportBoxUpdate}
            />

            <Zone
              title="Musts👏"
              color="#ffffff"
              isSelected={activePart === "c"}
              onViewportBoxUpdate={onViewportBoxUpdate}
            />
          </div>
          <p
            style={{ zIndex: "1", minWidth: "88vw" }}
            className=" bg-primary no-select px-5 shadow  text-center p-2 "
          >
            A <strong>brain dump</strong> is a complete transfer of accessible
            knowledge about a particular subject from your brain. <br />
            Move your thoughts and prioritize your zones through the phases
            below.
          </p>
        </AnimateSharedLayout>
      </div>
    </section>
  );
}
