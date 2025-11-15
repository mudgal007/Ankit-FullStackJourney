import { useState } from "react";

export default function KeyMismatch() {
  const [list, setList] = useState(["A", "B", "C"]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Key Mismatch Demo</h2>
      <ul>
        {list.map((item, i) => (
          <li key={i}>
            <input defaultValue={item} />
          </li>
        ))}
      </ul>
      <button onClick={() => setList(["X", ...list])}>Add Front</button>
    </div>
  );
}
