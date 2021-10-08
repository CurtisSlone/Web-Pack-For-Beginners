// module.exports = (()=> console.log("hello"))();
let greet = (()=> console.log("hello world"))();
function sayHello(){
    let tool = "webpack";
    alert(`Hello I am ${tool}, welcome to ES6`);
    console.log('Can you find me?')
}

export { greet, sayHello }