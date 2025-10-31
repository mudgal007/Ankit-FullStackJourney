var: functional scope , hoising to top of scope and initialized as undefined , can reassign,hoisted
let: blocked scope, cannot reassign, hoisted but not initialized,- accessing them before declaration throws a ReferenceError.

const: cannot change and reassign ,block scope, hoisted but not initialized,- accessing them before declaration throws a ReferenceError.


this:In javscript value of this depends on how a function is called-not where it is written
    Breakdown of this behavior: Default(non-strict mode):this refers to global object ,In regular functions this defaults to global scope.

    in strict mode: this refers to undefined .prevents accidental global access Safe for debugging.
    In method Call context: this binds to the object owning the method
    In constructor context: this refers to newly created object.this points to the instance being constructed.
    In bind ,call, apply: this is explicitly set by caller,you controll this manually.bind returns a new function call and apply invoke immediately.

    Arrow function: dont have there own this. they capture it from surrounding context

closures: closures let functions remember variable from there outer scope even after scope has exited . This makes them powerful for state management, encapsulation, creating flexible reuseable code

protype chain: js starts with the object that is asked by the user and climbs up the chain untill it finds it or gives up