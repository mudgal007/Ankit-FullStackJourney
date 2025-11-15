import { useState } from "react";

export default function VDOMVisualizer() {
  const [show, setShow] = useState(false);
  console.log("%cVirtual DOM diffing started", "color:purple");

  return (
    <div style={{ padding: 20 }}>
      <h2>VDOM vs Real DOM</h2>
      <button onClick={() => setShow((s) => !s)}>Toggle</button>
      {show ? (
        <div style={{ background: "#eef" }}>
          <p>Mounted subtree</p>
        </div>
      ) : (
        <div style={{ background: "#fee" }}>
          <p>Unmounted subtree</p>
        </div>
      )}
    </div>
  );
}
