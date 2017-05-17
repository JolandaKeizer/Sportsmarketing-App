var pug = require('pug');
var express = require('express')
var fs = require('fs')
var _ = require('lodash')
var bodyParser = require('body-parser');

var users = []

var app = express()



app.set('views', 'src/views');
app.set('view engine', 'pug');
app.use(express.static('css'));
app.use('/profilepics', express.static('images'))
app.use(bodyParser());

// adding new user to json file
const addUser = function(first, last, email, username) { 
    this.gender = ' ',
    this.name = {
        title: ' ',
        first: first,
        last: last
    },
    this.email = email,
    this.username = username
    return this
}


// Get JSON user data 
fs.readFile('users.json', 'utf8', function (err, data) {
  if (err) throw (err)

  JSON.parse(data).forEach(function (user) {
    user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
    users.push(user)
  })
})

//route one print out the list of users
app.get('/', function (req, res) {
  var buffer = ''

  users.forEach(function (user) {
    buffer += '<a href="/' + user.username + '">' + user.name.full + '</a><br>'
  })
  res.render("index", {
    buffer: buffer
  })
})


// route 2 search page
app.get('/search', (req, res) => { // handle search page request
    res.render('search')
});

$.get('#autocomplete').autocomplete({
    serviceUrl: '/autocomplete/countries',
    onSelect: function (suggestion) {
        alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
    }
});


// route 3 searchresults of search function
app.post('/searchresults', (req, res) => { // handle search post request
    var query = req.body.name.split(' '); // split allow to search for first/last name 
    console.log("This is query:" + query)
    console.log("This is users:" + users )
    console.log("request receiveds")
    //empty array to find user
    var nameResult = []; 

    query.forEach((findUser) => { // loop through every first/last name 
        users.filter((person) => { // only returning user if user is found in JSON file
            console.log("filtering")
            if ((person.name.first == findUser) || (person.name.last == findUser)) {
              console.log("User found!")
                nameResult.push(person) //push found user 
            }
        });

    });

    
    
    console.log("Test: " + nameResult[0].name)       

    res.render('searchresults', { // render search results 
        fullname: nameResult[0].name.full,  
        username: nameResult[0].username,
        email: nameResult[0].email
    });
});

//route 4
app.get('/newuser', (req, res) => { // handle new user form page 
    res.render('newuser')
});

// route 5 
app.post('/adduser', (req, res) => { // handle add user post request
    let aUser = new addUser(req.body.first, req.body.last, req.body.email, req.body.username) // use addUser constructor with req params
    users.push(aUser) // push new user to users array

    fs.writeFile('users.json', JSON.stringify(users, null, 2), (err, data) => { // write users array to user.json as JSON string
        if (err) throw err;
        console.log('New user added to users.json')
    });

    res.render('adduser')
});



// links from all users
app.get('/:username', function (req, res) {
  var username = req.params.username
  res.send(username)
})

var server = app.listen(3000, function () {
  console.log('Server running at http://localhost:' + server.address().port)
})
