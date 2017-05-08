var fs = require('fs');
var country = process.argv[2]
// var topLevelDomain = jsonContent[i].topLevelDomain;

// Country Information App

// 1. Part 1 Create a Node.js application that does the following:

// 2. Takes in one parameter from the command line, the name of a country. Note: command line arguments can be read 
// from the global array process.argv
// Reads and parses the countries.json file. Note: you must use readFile and not readFileSync.
// Outputs information about that specific country. Must be in the following format:
// Country: Netherlands Top Level Domain: .nl

 // console.log("Country: " + country + " Top level Domain: " ); 
 // Country: Netherlands Top Level Domain: .nl


function jsonFile() {
	console.log("\n *START* \n");
	 var contents = fs.readFile("jsoncontent.json");
	 
	//hoe wordt content een echt object? Het is nu een string
	//schrijf code hieronder -- kijk naar de hint in de assignment
			 var jsonContent = JSON.parse(contents);

			 for(var i = 0; i < jsonContent.length; i++){
        	 // console.log(`analyzing ${jsonContent[i].name}`)
	              if (country == jsonContent[i].name){

		              console.log("Country: " + jsonContent[i].name)
		              console.log( "top Level Domain:", jsonContent[i].topLevelDomain)
	              }     

	             else {
	            //  	Nothing found
	            // console.log('No county found' +  jsonContent[i].name)
	        	}
    }
 


	//de rest van het programma

 	//  console.log("Name:", jsonContent[30].name);
	 // console.log("topLevelDomain:", jsonContent[30].topLevelDomain);

	 // process.argv[2] === name 

//loop if statement process.argv //name ===  print id toplevel 

 	console.log("\n *EXIT* \n");
}


jsonFile()


