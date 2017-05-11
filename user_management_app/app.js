var express = require('express');
var fs = require('fs');
var app = express();
const bodyParser = require('body-parser')

app.use('/', bodyParser())


// app.get('/', function(request, response){
//   response.end("Hello World")
// })
app.set('views', 'src/views');
app.set('view engine', 'pug');

//     console.log(request.name[i].firstName)
//       for (var i = 0; i < name[i].length; i++) {
//       name[i]
//       if (request.name.firstName == request.name[i].firstName || request.name.lastName == request.name[i].lastName) {
//         respons.end("Successfully logged in")
//       }
//       else{
//           response.send('name not found')
//       }
//     }
//   }
// }

app.post ('/', function(request, response) {
    fs.readFile('./resources/users.json', function(err, data) {
        var parsedData = JSON.parse(data);
        console.log('parsedData');
        console.log(parsedData);
        response.render("form", 
        {
            name: parsedData.name
        })
    })    
})

app.get('/', function(request, response) {
    fs.readFile('./resources/users.json', function(err, data) {
        if (err) {
            console.log(err);
        }

        var parsedData = JSON.parse(data);
        console.log(parsedData);
        response.render("index", {
            name: parsedData.name
        });
    });
});

var server = app.listen(3000, function() {
    console.log('Example app listening on port: ' + server.address().port);
});