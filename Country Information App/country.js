var fs = require('fs');
var country = process.argv[2]

//Now I'm going to import the module
var countryModule = require("./module")

// function findCountryinFile (readFile, findCountry) {
// 	//this is in a module right now
// 	readFile()
// 	findCountry()
// }

	// function findCountry () {
	// 	for(var i = 0; i < jsonContent.length; i++){
	// 	    if (country == jsonContent[i].name){
	// 	    console.log("Country: " + jsonContent[i].name)
	// 	    console.log( "top Level Domain:", jsonContent[i].topLevelDomain)
	// 		}     
	//     }
	// }

countryModule.readFile('./jsoncontent.json', countryModule.findCountry, country)
//I'm accessing it via the module
// countryModule(countryModule.readFile, module.findCountry)