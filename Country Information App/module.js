var fs = require('fs');




	function readFile(filename, callback, country) {
		fs.readFile(filename, function(err, data){
	    	//check for possible errors - more on this later
		    if (err) {
		        //log that an error happened
		        console.log(`an error occurred: ${err}`);
		        //throw the error for handling by the caller
		        throw err;
			}
		    var jsonContent = JSON.parse(data);
		    callback(jsonContent, country)
		})
	}



	function findCountry (jsonContent, country) {
		for(var i = 0; i < jsonContent.length; i++){
		    if (country === jsonContent[i].name){
			    console.log("Country: " + jsonContent[i].name)
			    console.log( "top Level Domain:", jsonContent[i].topLevelDomain)
			}     
	    }
	}


module.exports.readFile = readFile
module.exports.findCountry = findCountry