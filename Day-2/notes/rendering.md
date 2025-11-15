What happens in React when setState is called?
Ans: When setState is called, React schedules a re-render of the component. It does not immediately update the state, but instead schedules a re-render for the next tick of the event loop. This allows React to batch multiple state updates and re-renders together, improving performance.

What is the Fiber Tree, and what are the two phases (Render & Commit)?
Ans: Fiber Tree is a tree of React components that is used to represent the UI of the application. It is a tree of objects that represent the components of the application. The two phases of rendering are Render and Commit. Render is the phase where the Fiber Tree is created. Commit is the phase where the Fiber Tree is committed to the DOM.

What is Reconciliation?
Ans: Reconciliation is the process of comparing the Fiber Tree to the DOM and making the necessary changes to the DOM to match the Fiber Tree. It is the process of updating the DOM to match the Fiber Tree.

Why are keys important when rendering lists?
Ans: Keys are important when rendering lists because they help React identify which items have changed, been added, or been removed. Without keys, React would have to re-render the entire list, which is inefficient.

What triggers re-renders? (props, state, context, parent re-render)
Ans: Re-renders are triggered by changes in props, state, context, or parent re-renders. 

What happens if keys are reused or missing?
Ans: If keys are reused, React will re-render the entire list. If keys are missing, React will re-render the entire list.