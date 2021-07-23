import React from "react";

export default function OnlyOnDesktop(props) {
  return (
    <section
      style={{ fontSize: "6rem", height: "80vh", fontWeight: "bolder" }}
      className="d-flex align-items-center justify-content-center "
    >
      <div className="container mt-4 text-white text-center">
        Sorry fellas, this app is only available on desktop devices.
      </div>
    </section>
  );
}
