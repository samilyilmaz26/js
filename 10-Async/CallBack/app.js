// Callback Function Example
function p1( callback,callback2) {
    console.log('p1...........');

    // callback function
    // executed only after the greet() is executed
    callback();
    callback2();
}

// callback function
function p2() {
    console.log('P2...........');
}
function p3() {
    console.log('P3...........');
}

// calling the function after 2 seconds
setTimeout(p1,2000, p2,p3);