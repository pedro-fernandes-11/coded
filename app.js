const express = require('express')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()

//const wizardsController = require('./controller/wizardsController')
const userController = require('./controller/userController')
const userProfileController = require('./controller/userProfileController')
const featureController = require('./controller/featureController')

app.use(session({
    secret: '829719F301',
    resave: false,
    saveUninitialized: true
}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs')

// Coded routes

app.get('/', function(req, res){
    res.render('index', {
        user: req.session.username, 
        isLoggedIn: req.session.loggedin, 
        userId: req.session.userId, 
        userImg: req.session.userImg,
        userEmail: req.session.userEmail
    })
})

app.post('/send-email', featureController.sendEmail)

/*
app.get('/wizards', wizardsController.index)

app.get('/wizards/add', wizardsController.create)
app.post('/wizards/add', wizardsController.store)

app.get('/wizards/edit/:id', wizardsController.edit)
app.post('/wizards/edit/:id', wizardsController.update)

app.get('/wizards/delete/:id', wizardsController.destroy)
*/

// Profile routes

app.get('/user/:id', userProfileController.show)

// Error route

app.get('/error', function(req, res){
    res.render('error')
})

// Auth routes

app.get('/register', userController.register)
app.post('/register', userController.store)

app.get('/login', userController.login)
app.post('/login', userController.auth)

app.get('/logout', userController.logout)

app.listen(8080, function(){
    console.log("Listening in port 8080")
})