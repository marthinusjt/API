// Introduced in ES2017 (ES8), async functions can be thought of as an alternate way of writing promise-based code. This allows us to avoid chaining promises.
​
// async/await allows us to program using asynchronous requests, like a request to an API, in a "synchronous" manner.
​
// Synchronous code is executed in sequence – each statement waits for the previous statement to finish before executing. Asynchronous code doesn’t have to wait – your program can continue to run. You do this to keep your site or app responsive, reducing waiting time for the user.
​
// For example: if you want to load your latest tweets onto a web page, and you do this synchronously, then a visitor to your site won’t be able to do anything until those tweets are loaded. This could cause a long delay before they even get to see the content of your site.
​
// Sticking with fetch’s since those were the examples we were working with, more often than not, we’re doing something more with our code than simply just jsonifying it or running a console.log.
// If we had an API than contained an array of hundreds of pieces of data, we may want to loop over that data or run a method like forEach() on it.
// This is a case where we would consider using async/await. Depending on how long that fetch takes to complete, there’s a chance that our logic will run before we actually get the information or the data we want to parse through. We can use await to make sure that we’ve received the information from our fetch before we run our logic.

// --------------------------------------------------------------------------------------------------------------------------------------
​
// Syntax: async is used to make a function asynchronous. It unlocks the use of await inside of these functions. Using await in any other case results in a syntax error.
​
async function myFn() {
    // await ...
}
​
const myFn = async () => {
    // await ...
}
​
const myFn = () => {
    // await ... (syntax error since the function is not declared as an async function)
}
​
// Notice the use of async keyword at the beginning of the function declaration. In the case of arrow functions, async is put after the = sign and before the parentheses.
​
// --------------------------------------------------------------------------------------------------------------------------------------
​
// async functions are normal JavaScript functions with the following differences:
​
// an async function always returns a promise
​
async function fn() {
    return 'hello';
}
​
fn().then(console.log);
​
// the function fn returns 'hello'. Because we have used an async function, the return value 'hello' is wrapped in a promise via the promise constructor. The body of an async function is always wrapped in a new promise.
​
// alternate representation without using async:
​
function fn() {
    return Promise.resolve('hello');
}
​
fn().then(console.log);
​
// in this example, we are manually returning a promise instead of using async.
​
// --------------------------------------------------------------------------------------------------------------------------------------
​
// What happens if you throw an error inside an async function?
​
async function foo() {
    throw Error('this is a mistake');
}
​
foo().catch(console.log);
// foo().then(console.log);
​
// foo will return a rejected promise if the error is uncaught. Insead of Promise.resolve, Promise.reject wraps the error and is returned.
​
// async functions will always return whatever you want to return, but you will always get a promise out of an async function.
​
// --------------------------------------------------------------------------------------------------------------------------------------
​
// await
​
// async functions pause at each await expression
​
// What if we wanted to make a request to an API? Normally, that would look something like this:
​
fetch('https://random.dog/woof.json')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error));
// here we are making an asynchronous fetch to an API. As we've already learned, an asynchronous request always returns a promise. Here we're using .then (our promise resolver) to grab the response from the API, jsonify it, and are catching any errors. Note that we're chaining promise resolvers together. Each .then method returns a promise of it's own, which allows for method chaining.
​
// Fetch returns a Promise, which is a way to handle asynchronous operations without the need for a callback.
​
​
// What if we wanted to make a request to an API using await?
​
const response = await fetch('https://random.dog/woof.json');
const json = await response.json();
console.log(json);
​
// Breakdown of the above code:
//      1. In the first line, we make a GET request to our the random dog image API. Instead of continuing to the next line, we wait for the request to finish - hence await. When the request is finished, it passes the resolved value to the response variable.
//      2. In the second line, we jsonify the result we received from our response variable. We again use await to wait for it to complete (or fail), and then pass the result to the json variable.
//      3. In the final line, we're simply just running a console.log on our json variable.
​
// an await acts on an expression. When the expression is a promise, the evaluation of the async function halts until the promise is resolved. When the expression is a non-promise value, it is converted into a promise using Promise.resolve, and is then resolved. So in short, await allows us to wait for a promise to resolve to a value, and will return the value only after the promise is resolved.
​
​
// The above code is still missing one thing, though! What are we missing? An async function! Again, for us to be able to use await, we need to declare an async function or we'll receive an error. The above example wrapped in an async function should look something like this:
​
const request = async () => {
    const response = await fetch('https://random.dog/woof.json');
    const json = await response.json();
    console.log(json);
}
​
request();
​
// --------------------------------------------------------------------------------------------------------------------------------------
​
// Why can't we run fetch from our local console?
​
// The Fetch method is actually part of the browser window. When you run JS through nodeExec or code runner, it just runs it through the nodeJS or the JS engine, which doesn't have fetch as an object. If you attach the file to an HTML document and run it in Chrome it should work.

// async function myFn(){
//     // await
// }

// const myFn = async () => {
//     // await
// }

// const myFn = () => {
//     // await - this will throw an error - you can't use await unless it's in an async function
// }

async function fn() {
    return 'hello';
}

fn().then(console.log);

function fn(){
    return Promise.resolve('hello');
}

fn().then(console.log);

// async function foo(){
//     throw Error('this is a mistake');
// }

// // foo().then(console.log);
// foo().catch(console.log);

// fetch('https://random.dog/woof.json')  //FETCH has to be linked to a HTML File!!!!!!
//     .then(response => response.json())
//     .then(json => console.log(json))
//     .catch(error => console.log(error));

const request = async () => {
    const response = await fetch('https://random.dog/woof.json');
    const json = await response.json();
    console.log(json);
}

request().then()