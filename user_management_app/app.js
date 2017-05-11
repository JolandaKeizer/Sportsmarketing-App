var express = require('express');
var fs = require('fs');
var app = express();
const bodyParser = require('body-parser')

app.use('/', bodyParser())


app.set('views', 'src/views');
app.set('view engine', 'pug');


app.post ('/', function(request, response, next) {
    fs.readFile('./resources/users.json', function(err, data) {
        var parsedData = JSON.parse(data);
        console.log("parsedData app.post('/')");
        console.log(parsedData);
        console.log("request.body app.post('/')")
        console.log(request.body)


        for (var i = 0; i < parsedData.length; i++){
            //am not allowed to sent multiple responses -- TO DO
            if(parsedData[i].firstName === request.body.firstName || parsedData[i].lastName === request.body.lastName){
                response.end("Name found")
            }
        } 
        response.render("form", 
        {
            users: parsedData
        })
    })    
})

app.get('/', function(request, response) {
    fs.readFile('./resources/users.json', function(err, data) {
        if (err) {
            console.log(err);
        }

        var parsedData = JSON.parse(data);
        console.log("parsedData app.get('/')");
        console.log(parsedData);
        response.render("index", {
            users: parsedData
        });
    });
});

var server = app.listen(3000, function() {
    console.log('Example app listening on port: ' + server.address().port);
});