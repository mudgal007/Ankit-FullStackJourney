import { useState, memo } from "react";

const Child = memo(({ count }) => {
  console.log("%cChild Render", "color:green");
  return <p>Child Count: {count}</p>;
});

export default function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  console.log("%cParent Render", "color:red");

  return (
    <div style={{ padding: 20 }}>
      <h2>Render Trace</h2>
      <input
        placeholder="Type name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <Child count={count} />
    </div>
  );
}
