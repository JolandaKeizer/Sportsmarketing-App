/* 1. given this array print out all names. The output should be:

Mittens
Doge
Mickey
Chip
Dale
*/
var myPets = ['Mittens', 'Doge', 'Mickey', 'Chip', 'Dale'];
//              0          1        2         3      4
for (var i = 0; i < myPets.length; i++) {
		console.log (myPets); //print all names
	}
}

/*2. print out only the odd names. The output should be: 

Mittens
Mickey
Dale
*/
//Hint: use an if-statement to check if you have an odd number, and use the modulo operator like in FizzBuzz

var myPets = ['Mittens', 'Doge', 'Mickey', 'Chip', 'Dale'];
//              0          1        2         3      4
for (var i = 0; i < myPets.length; i++) {
	if (i % 2 === 0) { 
		console.log (myPets[i]); //Olny print the odd names
	}
}


//3. Bonus 1: print out all the musical instruments of myCollections

var myCollections = [['ball', 'tennis racket', 'boxing glove'], ['pants', 't-shirt', 'shoes'], ['guitar', 'piano', 'mandolin']];
for (var i = 0; i < myCollections.length; i++) {
	if(i===2){
		for (var j = 0; j < myCollections[i].length; j++) {
			// console.log(i,j);
			console.log(myCollections[2][j]);
		}
	}
}


//4. Bonus 2: print out all the musical instruments. The output should be:
/*
guitar
piano
mandolin
*/
//write code here



//5. Bonus 3: print out all the odd elements. The output should be:
var myCollections = [['ball', 'tennis racket', 'boxing glove'], ['pants', 't-shirt', 'shoes'], ['guitar', 'piano', 'mandolin']];
for (var i = 0; i < myCollections.length; i++) {
		for (var j = 0; j < myCollections[i].length; j++) {
			if(j % 2 === 0){
			console.log(myCollections[i][j]);
			}
			
		}
}

/*
ball
boxing glove
pants
shoes
guitar
mandolin
*/
//write code here
