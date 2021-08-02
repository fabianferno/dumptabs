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
  const [activePart, setActivePart] = useState("perhaps");

  // To place the box in corresponding phases
  const onViewportBoxUpdate = ({ x }) => {
    const partViewPort = viewportWidth.current / 3;
    if (activePart === "perhaps" && x.min > partViewPort) {
      setActivePart("wants");
    } else if (activePart === "wants" && x.min > 2 * partViewPort) {
      setActivePart("musts");
    } else if (activePart === "musts" && x.max < 2 * partViewPort) {
      setActivePart("wants");
    } else if (activePart === "wants" && x.max < partViewPort) {
      setActivePart("perhaps");
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
              activePart={activePart}
              isSelected={activePart === "perhaps"}
              onViewportBoxUpdate={onViewportBoxUpdate}
            />

            <Zone
              title="Wants🤞"
              color="#FED700"
              activePart={activePart}
              isSelected={activePart === "wants"}
              onViewportBoxUpdate={onViewportBoxUpdate}
            />

            <Zone
              title="Musts👏"
              color="#ffffff"
              activePart={activePart}
              isSelected={activePart === "musts"}
              onViewportBoxUpdate={onViewportBoxUpdate}
            />
          </div>
        </AnimateSharedLayout>
      </div>
    </section>
  );
}
