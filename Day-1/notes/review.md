1.Why is var function-scoped and how can that cause for-loop + setTimeout bugs?
Ans: var is function-scoped means it is accessible within the function in which it is declared. means wherever we declare a var it climbs up to the top of the function and this is called hoisting. this is why we get the same value for all the iterations of the loop because the value of the variable is not changing. if we write for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
} we might expect 0
1
2 but we get 3 for all iterations Because:- var i is hoisted to the function scope — not the loop block.
- By the time the setTimeout callbacks run (after 1 second), the loop has already finished, and i is now 3.
- All three callbacks share the same i, which is now 3.

2.List 4 rules for how this is determined in JavaScript.
Ans: 1.Default binding: In regular functions this defaults to global scope.
     2.Implicit binding: In method calls this refers to the object owning the method.
     3.Explicit binding: In call and apply methods this is explicitly set by the caller.You can manually set this using .call(), .apply(), or .bind().
     4.Arrow functions: Don't have their own this. They capture it from the surrounding context.

3.Explain microtask vs macrotask order using one example from your event-loop trace.
Ans: microtask are processed before macrotasks. for example if we have a microtask and a macrotask we will process the microtask first and then the macrotask.
console.log("🍳 Start");

setTimeout(() => {
  console.log("🥘 Macrotask: setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("🍰 Microtask: Promise");
});

console.log("🍽️ End");

output: 🍳 Start
🍰 Microtask: Promise
🍽️ End
🥘 Macrotask: setTimeout

4.When is it okay to use array index as a React key?
Ans: It is okay to use array index as a React key when the array is static and does not change.

5.Difference between debounce and throttle; give one practical example each.
Ans: Debounce is a function that delays the execution of a function for a given time. It is useful for preventing a function from being executed multiple times unnecessarily.
Throttle is a function that limits the execution of a function to a given time. It is useful for preventing a function from being executed multiple times unnecessarily.
debounce: const debounce = (fn,delay) =>{
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args),delay);
    }
};
const handleInput = debounce((text) =>{
    console.log(text);
},300)

inputElement.addEventListener('input',e =>handleInput(e.target.value))

const throttle = (fn, interval) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= interval) {
      lastCall = now;
      fn(...args);
    }
  };
};
throttle:
const handleScroll = throttle(() => {
  console.log("📜 Scrolling...");
}, 200);

window.addEventListener("scroll", handleScroll);


Why does [] == false return true?
Ans: Because when we compare an empty array to false in JavaScript, the array is converted to a string and then compared to false. The empty array converts to an empty string, which is considered falsy in JavaScript. So, [] == false evaluates to true because both sides are falsy values.

What is the difference between null == undefined and null === undefined?
Ans: null == undefined returns true because both are falsy values. null === undefined returns false because they are different types.

setTimeout(()=>console.log('A'),0);
Promise.resolve().then(()=>console.log('B'));
console.log('C');
Expected log order for:
Ans: The expected log order is C, B, A.

How does using WeakMap prevent memory leaks in deepClone?
Ans: WeakMap is a collection of key-value pairs where the keys are objects and the values are arbitrary. The keys are weak references, which means they do not prevent the objects from being garbage collected. This is useful for preventing memory leaks in deepClone because it allows the objects to be garbage collected if they are not referenced anywhere else.