//Create a function "findSum" that takes in two parameters and returns the sum of those parameters.
//Create a function "findProduct" that takes in two parameters and returns the product of those parameters.

function threeOperation (x, operation) { 
	console.log("threeOperation " + x + " " + 3);
	var z = operation(x, 3);
	console.log("results: " + z);
}

var findSum = function (t, b) {
	return  t + b;
}


var findProduct = function (a, b) {
	return a * b;
}



threeOperation(4, findSum);
threeOperation(5, findSum);
threeOperation(4, findProduct);
threeOperation(5, findProduct);




/*Part 2

Create a function "threeOperation" that takes in two parameters, named "x" and "operation". The first parameter is a number. The second parameter is a function.
"threeOperation" should call the "operation" parameter as a function. It should pass the number 3 along with the "x" parameter to that function.
Part 3

Call "threeOperation" with the values of "4" and "findSum". Check that your answer is "7".
Call "threeOperation" with the values of "5" and "findSum". Check that your answer is "8".
Call "threeOperation" with the values of "4" and "findProduct". Check that your answer is "12".
Call "threeOperation" with the values of "5" and "findProduct". Check that your answer is "15".
*/