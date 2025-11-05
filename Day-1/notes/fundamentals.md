deepClone: A function that creates a deep copy of an object or array. It handles nested objects and arrays recursively, ensuring that all properties are copied correctly. This is useful for creating independent copies of complex data structures without sharing references between original and copied objects.

compose: A function that takes multiple functions as arguments and returns a new function that composes those functions together. It allows you to create complex transformations by chaining multiple operations sequentially. This is useful for creating reusable and modular code that can be combined to perform complex transformations.

map: A function that applies a given function to each element of an array and returns a new array with the results. It is useful for transforming arrays by applying a function to each element.

filter: A function that filters an array based on a given condition and returns a new array with the elements that satisfy the condition. It is useful for selecting a subset of elements from an array based on a specific criteria.

reduce: A function that reduces an array to a single value by applying a given function to each element and accumulating the result. It is useful for aggregating data from an array into a single value.

unique: A function that removes duplicate elements from an array and returns a new array with the unique elements. It is useful for creating a new array with only the unique elements from the original array.

once: A function that ensures a given function is executed only once. It returns a new function that can be called multiple times, but the original function will only be executed the first time it is called. This is useful for preventing a function from being executed multiple times unnecessarily.

uniqueStable: A function that removes duplicate elements from an array and returns a new array with the unique elements. It is useful for creating a new array with only the unique elements from the original array. It is stable, meaning that the order of the elements is preserved.

map2: A function that applies a given function to each element of an array and returns a new array with the results. It is useful for transforming arrays by applying a function to each element. It is stable, meaning that the order of the elements is preserved.

filter2: A function that filters an array based on a given condition and returns a new array with the elements that satisfy the condition. It is useful for selecting a subset of elements from an array based on a specific criteria. It is stable, meaning that the order of the elements is preserved.

reduce2: A function that reduces an array to a single value by applying a given function to each element and accumulating the result. It is useful for aggregating data from an array into a single value. It is stable, meaning that the order of the elements is preserved.

compose2: A function that takes multiple functions as arguments and returns a new function that composes those functions together. It allows you to create complex transformations by chaining multiple operations sequentially. This is useful for creating reusable and modular code that can be combined to perform complex transformations. It is stable, meaning that the order of the elements is preserved.

