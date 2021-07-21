import React from "react";

export default function Notes(props) {
  const { notes } = props;
  if (!notes || notes.length === 0) {
    return <p className="mt-5">You haven't created any notes yet.</p>;
  } else {
    return (
      <section className="px-5">
        <h4 className="container">Your Notes</h4>
        <div className="container mt-4">
          <div className="card-columns"></div>
        </div>
      </section>
    );
  }
}
