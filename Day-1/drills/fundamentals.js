//1. deepClone concept

function deepClone(value, seen = new WeakMap()){
if(value == null || typeof value != "object"){
    return value;
}
if(seen.has(value)){
    return seen.get(value);
}
if(value instanceof Date){
    return new Date(value)
}
if(value instanceof RegExp){
    return new RegExp(value.source, value.flags);
}
if(Array.isArray(value)){
    const copy = [];
    seen.set(value, copy);
    for(const item of value){
        copy.push(deepClone(item,seen));
    }
    return copy;
}
const copy = {}
seen.set(value,copy);
for(const key in value){
if(Object.hasOwn(value,key)){
    copy[key] = deepClone(value[key], seen);
}
}
return copy;
}

//deep clone ex

const test = {
    past: [ {day:31},{month:12},{year:2000}],
    present: [ {day:1},{month:1},{year:2021}]
};

const deepClone1 =(input) => {
    let result = Array.isArray(input)?[]: {};

    if(typeof input !== "object"){
        return input
    }
    //using for in loop as we need to itrate over each key
    for(let key in input){
   result[key] = deepClone1(input[key])
    }

    return result;
}

console.log(deepClone(test));

//curry
function makeJuice(fruit1){
    return function(fruit2){
        return function(fruit3){
            return `Juice of ${fruit1},${fruit2} and ${fruit3}`;
        }
    }
}


//compose
function compose(...fns){ // ... fns is list of function
    return function(x){//- It returns a new function that takes one input x.
        // It runs the functions from right to left, passing the result of each into the nex
        
        return fns.reduceRight((acc,fn) => fn(acc),x);
    };
}

//once function

function printOnce(){
    let called = 0;
    return function(){
        if(called === 0){
            console.log('print only once');
            called++;
        }else{
            console.log('running more than once')
        }
    }

}
const fn = printOnce();
fn();

//unique(arr) and uniqueStable(arr) in js
function unique(arr){//it is fast and unordered
    return Array.from(new Set(arr));
}

function uniqueStable(arr){//order doesnt matter
    const seen = new Set();
    const result = [];

    for(const item of arr){
        if(!seen.has(item)){
            seen.add(item);
            result.push(item)
        }
    }
    return result
}

//map filter reduce - custom implementations
function map2(arr, fn){
    const result = [];
    for(let i = 0; i < arr.length; i++){
        result.push(fn(arr[i], i, arr));
    }
    return result;
}

function filter2(arr, fn){
    const result = [];
    for(let i = 0; i < arr.length; i++){
        if(fn(arr[i], i, arr)){
            result.push(arr[i]);
        }
    }
    return result;
}

function reduce2(arr, fn, initialValue){
    let accumulator = initialValue;
    for(let i = 0; i < arr.length; i++){
        accumulator = fn(accumulator, arr[i], i, arr);
    }
    return accumulator;
}

//assert function
function assert(condition, message){
    if(!condition){
        throw new Error(`Assertion failed: ${message}`);
    }
    console.log(`✓ ${message}`);
}

//map filter reduce tests
assert(JSON.stringify(map2([1,2,3], x=>x*2)) === JSON.stringify([2,4,6]), 'map2');
assert(JSON.stringify(filter2([1,2,3,4], x=>x%2===0)) === JSON.stringify([2,4]), 'filter2');
assert(reduce2([1,2,3], (a,c)=>a+c, 0) === 6, 'reduce2');