var fs = require('fs');
var country = process.argv[2]

//Now I'm going to import the module
var countryModule = require("./module")


countryModule.readFile('./jsoncontent.json', countryModule.findCountry, country)
//I'm accessing it via the module
// countryModule(countryModule.readFile, module.findCountry)