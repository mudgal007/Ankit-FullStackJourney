//temporal dead zone error 
try{
    console.log(myVar);//refrence error when using let and const and undefined when using var
    let myVar = 10;
}catch(err){
    console.log("caught error", err.message);
}
//this in differnt cases:
//1. function call

function speak(){
    console.log(this) //outputs global object but in strict mode outputs undefined
}
speak();
// 2.object method call 
const obj = {
    name: "HP",
    speak: function() {
      console.log(this.name);
    }
  };
  obj.speak(); // "HP"

  //Arrow function inside main

  const obj2 = {
    name: "HP",
    speak: function(){
        const arrow = () => {
            console.log(this.name)
        }
        arrow();
    }
  };
  obj2.speak();

  //closure counter
  function makeCounter(){
    let c= 0;
    return {
        inc: () => ++c,
        reset: () => (c=0),
        value: () => c

    }
  }
  const ctr = makeCounter();
  console.log(ctr.inc() , ctr.inc(), ctr.value())