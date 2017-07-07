//--------------CONFIG AND LIBARIES-------------------

//Requiring express libary
const express = require('express');
var multer   =  require( 'multer' );
var upload   =  multer( { dest: 'public/uploads/' } );
var sizeOf   =  require( 'image-size' );
require( 'string.prototype.startswith' );

//Initialising express library
const app = express();
const pg = require('pg');
const session = require('express-session');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const inputFile='vrouwen100m.csv';


app.use( express.static( __dirname + '/bower_components' ) );


//Requiring file system library
const Chart = require('chart.js');

var fs = require('fs'); 
var parse = require('csv-parse');


//Requiring body parser library
//This adds a body property to the request parameter of every app.get and app.post
const bodyParser = require('body-parser');
//Initialising body-parser li;brary
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())

//Requiring 'request' module
var request = require('request');


//Setting PUG view engine
app.set('views', './views');
app.set('view engine', 'pug')
app.use( express.static( __dirname + '/bower_components' ) );
app.use( express.static( __dirname + '/uploads' ) );
app.use(express.static('public'));
app.use(express.static('uploads'));


/**
 * Sequelize -- connection settings
 */

var sequelize = new Sequelize('jo', 'jo', null, {
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log,
    define: {
        timestamps: false
    }
});

// Create models

const User = sequelize.define('user', {
  email: Sequelize.STRING,
  password: Sequelize.STRING
});

const Athlete = sequelize.define('athlete', {
    messageId: Sequelize.INTEGER,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    dateofbirth: Sequelize.STRING,
    nationality: Sequelize.STRING,
    website: Sequelize.STRING,
    contract: Sequelize.STRING,
    contractstart: Sequelize.STRING,
    contractexpiration: Sequelize.STRING,
    expectationathlete: Sequelize.STRING

});

const Discipline = sequelize.define('discipline', {
    name: Sequelize.STRING,
});

const AthleteDisciplines = sequelize.define('athleteDisciplines', {
    pb: Sequelize.STRING
});

Athlete.belongsToMany(Discipline, { through: AthleteDisciplines });
Discipline.belongsToMany(Athlete, { through: AthleteDisciplines });

// let ath1 = new Athlete();
// let dis1 = new Discipline('100m');
// ath1.addDiscipline(dis1, { through: { pb: '1.3s' } });

const Image = sequelize.define('image',{
    path: Sequelize.STRING
})

Image.belongsTo(Athlete);
Athlete.hasOne(Image);

sequelize.sync({force: true    })
  .then(() => User.create({
    email: 'jane@gmail.com',
    password: '$2a$09$nEAJETpz7aCdb0YTEoZ0M.73zfpU9ltrRcJpU6H9UMa/ifHwXlwZ6' //ikhouvanijs
  }))
  .then(jane => {
    console.log(jane.get({
      plain: true
    }))
  })
  .then(function() {

    const jo = Athlete.build ({
        firstname: 'Nadine',
        lastname: 'Visser',
        dateofbirth: '09-02-1995',
        nationality: 'Netherlands',
        website: 'www.nadinevisser.nl',
        contract: true,
        contractstart: "02-02-2016 ",
        contractexpiration: "02-02-2020 ",
        expectationathlete: " Rank top 5 World Championships London 2017"
    }).save().then( athleteObject => {

        const d100m = Discipline.build ({
            name: '100m'
        }).save().then( disciplineObect => {
            athleteObject.addDiscipline(disciplineObect, { through: { pb: '11.60s' } });
        });

        const d200m = Discipline.build ({
            name: '100m Hurdels'
        }).save().then( disciplineObect => {
            athleteObject.addDiscipline(disciplineObect, { through: { pb: '12.81s' } });
        });

        athleteObject.setImage(Image.build({
            path: 'uploads/d1c5b93be782ff8cab0408e222afa3c9'

        }));

    });

  })
  .catch( e => console.log(e));


/**
 * Configure sessions
 */

app.use(session({
    secret: 'oh wow very secret much security',
    resave: true,
    saveUninitialized: false
}))



//-------ROUTES-----------//

app.get('/', function(req,res){
	res.render('index')
})

app.get('/notifications', function(req,res){
  res.render('notifications')
})


// Route show all messages
app.get('/newathlete', function (req, res) {

        Athlete.findAll({
            include: [{ model: Image}]

        }).then(function(athlete){
            console.log('asdsak');
            console.log(athlete);
            res.render('newathlete', 
                {athlete: athlete

            });
        });
    });

// Route list page
app.post('/dashboard', function(req,res) {

        res.render("dashboard");
});

// Route inlog page
app.post('/', function (request, response) {
    if(request.body.email.length === 0) {
        console.log()
        response.redirect('/?message=' + encodeURIComponent("Please fill out your email address."));
        return;
    }

    if(request.body.password.length === 0) {
        response.redirect('/?message=' + encodeURIComponent("Please fill out your password."));
        return; 
    }

    User.findOne({
        where: {
            email: request.body.email
        }
    }).then( user => {
        const hash = user.password;
        console.log('user', user, user.password)

        bcrypt.compare(request.body.password, hash, function(err, res) {
            if (err) {
            response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
           } else {
                request.session.user = user;
                response.redirect('/index');
            }
        })
    }, function (error) {
        response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
    });
});

// Route add new Athlete
app.post('/athletes', upload.single( 'file' ), function(req, res){
    
    //upload validation file type
    if ( !req.file.mimetype.startsWith( 'image/' ) ) {
      return res.status( 422 ).json( {
        error : 'The uploaded file must be an image'
      } );
    }

    var dimensions = sizeOf( req.file.path );
    console.log("image")
    console.log(req.file)

    //upload validation dimensions
    if ( ( dimensions.width < 640 ) || ( dimensions.height < 480 ) ) {
      return res.status( 422 ).json( {
        error : 'The image must be at least 640 x 480px'
      } );
    }

    var inputname = req.body.firstname;
    var inputlastname = req.body.lastname;
    var inputdateofbirth = req.body.dateofbirth;
    var inputnationality = req.body.nationality;
    var inputwebsite = req.body.website;
    var inputcontract = req.body.contract;
    var inputcontractstart = req.body.contractstart;
    var inputcontractexpiration = req.body.contractexpiration;
    var inputexpectationathlete = req.body.expectationathlete;

    var inputProfileImagePath = req.file.path;


    console.log("I am receiving following user credentials: "+inputname + ' ' +inputlastname + ' ' +inputdateofbirth+ ' ' +inputnationality);

        Athlete.create({
          firstname: inputname,
          lastname: inputlastname,
          dateofbirth: inputdateofbirth,
          nationality: inputnationality,
          website: inputwebsite,
          contract: inputcontract,
          contractstart: inputcontractstart,
          contractexpiration: inputcontractexpiration,
          expectationathlete: inputexpectationathlete,
        })
        .then(athlete => {
          Image.create({
            path: inputProfileImagePath.replace('public', ''),
          }).then(profileImage => {
             profileImage.setAthlete(athlete);
          });
        })
        .then( () => {
           res.redirect('athletes/?message=' + encodeURIComponent("Your Athlete got successfully created."));
        })
        .catch( e => console.log(e))
})


//Profile Athlete page
app.get('/profile/:profileinput', function (req, res) {
    var profileinput = req.params.profileinput;
    console.log("Athlete1")
    console.log(profileinput)

        Athlete.findOne({
            include: [{
                model: Discipline,
                through: {
                    attributes: ['pb'],
                }
            }],
            where: {
                lastname: profileinput
            }
}).then(function(athlete){
    let disciplines = athlete.getDisciplines().then(function(disciplines){
        console.log(disciplines);
        res.render("profile", {athlete: athlete, disciplines: disciplines});
    });
        });

});

app.get('/dashboard', function(req,res){

    Athlete.findAll().then(function(athlete) {
        res.render("dashboard", {athlete: athlete});
    });
});


//Add to Profile Athlete page with athlete.id
app.get('/add/:idinput', function (req, res) {
    var idinput = req.params.idinput;
    console.log("Athlete.id")
    console.log(idinput)

    Athlete.findOne({
        where: {
            id: idinput
        }
    }).then(function(athlete){
        Discipline.findAll().then(function(disciplines) {
            res.render("add", {athlete: athlete, disciplines: disciplines});
        });
    });

});

// Route add Discipline and results to Athlete.id
app.post('/add/:idinput', function(req, res){

    var athleteId = req.params.idinput;
    var disciplineId = req.body.discipline;
    var inputpb = req.body.pb;


    Athlete.findOne({
        where: {
            id: athleteId
        }
    }).then(function(athlete){
        Discipline.findOne({
            where: {
                id: disciplineId
            }
        }).then(function(discipline){
            athlete.addDiscipline(discipline, { through: { pb: inputpb } });
            res.redirect('/profile/'+athlete.lastname);
        });
    });

});


app.get('/athletes', function(req,res){
        res.render("athletes")
      });

//------------DEFINING PORT 8080 FOR SERVER----------------------
var server = app.listen(3000, () => {
	console.log('this http://localhost:' + server.address().port);
});