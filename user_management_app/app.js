var express = require('express');
var fs = require('fs');
var app = express();
const bodyParser = require('body-parser');

app.set('views', 'src/views');
app.set('view engine', 'pug');

// app.use('/', bodyParser())

app.use(bodyParser.urlencoded({
  extended: true
}));

// renders a page with three forms on it (first name, last name, and email) 
// that allows you to add new users to the users.json file.

app.get('/', function(request, response) {
    response.render("index")
});




// takes in the post request from your form, then displays matching users on a new page. 
// Users should be matched based on whether either their first or last name contains the input string.

app.post ('/', function(request, response) {
    fs.readFile('./resources/users.json', function(err, data) {
        var parsedData = JSON.parse(data);
        console.log("parsedData app.post('/')");
        console.log(parsedData);
        console.log("request.body app.post('/')")
        console.log(request.body)

        let result = []    

        for (var i = 0; i < parsedData.length; i++){


            firstName = request.body.firstName
            lastName = request.body.lastName

            if(parsedData[i].firstName === firstName || parsedData[i].lastName === lastName){
                result.push(parsedData[i])
            }
             console.log(result);

             response.render("founduser", {
            foundUsers: result
        });
        } 
       
        
    });   
});

var server = app.listen(3000, function() {
    console.log('Example app listening on port: ' + server.address().port);
});