var a= 10;
var b=5;
var input = '+';

switch(input){
    case '+':
        console.log(a+b);
        break;
    case '-':
        console.log(a-b);
        break;
    case '*':
        console.log(a*b);
        break;
    case '/':
        console.log(a/b);
        break;
default:
    console.log('input must be an one of "+", "-", "*", "/" ');


}