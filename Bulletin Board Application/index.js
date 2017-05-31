/**
 * Require libraries/modules
 */

const pug = require('pug');
const express = require('express');
const fs = require('fs');
const pg = require('pg');
const path = require('path');
const bodyparser = require ('body-parser')

const app = express()

const connectionDatabase = "postgres://jo:postgres@localhost/jo";

app.set('views', 'src/views');
app.set('view engine', 'pug');
app.use(express.static('css'));
app.use('/' , bodyparser());


app.get('/', (req, res) => { 
	pg.connect(connectionDatabase, function (err, client, done) {

		client.query('SELECT * FROM twitter', function (err, twitter) {
			console.log('twitter');
			console.log(twitter.rows);
			done()
			res.render('index', {twitterGegevens: twitter.rows})	
			pg.end();		
		});
		
	});

});

//route 2 post Tweet page
app.get('/post', (req, res) => { // handle post page request
    res.render('post')
});

// route succesfull posed tweet page
app.post('/createdPost', (req, res) => {
	pg.connect(connectionDatabase, (err, client, done) => {
		if (err) throw err;
		client.query(`INSERT INTO twitter (title, message, image) VALUES ('${req.body.title}', '${req.body.message}', '${req.body.image}')`, function (err, result) {
			if(err) throw err;
			client.query(`SELECT * FROM twitter`, function(err, result) {
				console.log(result.rows)
				done()
				res.render('created_post', {data: result.rows});
				pg.end();	
			})
		});
	});

});


const server = app.listen(3000, function () {
  console.log('Server running at http://localhost:' + server.address().port)
})

