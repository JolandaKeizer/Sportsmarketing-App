
/* 
Create an object that represents a book:

Part 1
Give it a “title" property with a value that is the title of your book.
Give it a “body” property which has an array of strings as the value. There should be at least three strings within the array. This array represents the pages of text within your book.

Part 2
Create another object with the same format, but different title and different body.
*/

var travelBook = {
	title: "travel 365 days around the world",
	body:[ "Page 1: Travel around the world", "Page 2: From Europe to Asia", "Page 3: Get a round trip in Asia"]
};


//another object representing a book with properties , title , body with a array of strings.

var sportsBook = {
	title: "Olympic games from 1990 till 2016",
	body:[ "Page 1: out of broklyn","Page 2: made it to mainstreet","Page 4: killed by gangs sadly"],
};

var theBook = {
	title: "Hello",
	body: ["bye"]
}

// Part 3 Now, create a function that reads the book by first printing out the title, then printing out each element (page) in the body. For a book with title "Infinite Jest" and pages "Written by David Foster Wallace", "Hal Incandenza is the youngest of the Incandenza children.", and "As a child, he was very precocious.", the output should read as follows:

//function definition

function read(aBook){ 
	console.log(aBook.title)
	for (var i = 0; i < aBook.body.length; i++) {
		console.log (aBook.body[i] + "\n"); //read body book
	}
}

//function call

read(travelBook)
read(sportsBook)
read(theBook)


