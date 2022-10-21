const express = require('express')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()

//const wizardsController = require('./controller/wizardsController')
const userController = require('./controller/userController')

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
    res.render('index.ejs', {
        user: req.session.username, isLoggedIn: req.session.loggedin
    })
})

/*
app.get('/wizards', wizardsController.index)

app.get('/wizards/add', wizardsController.create)
app.post('/wizards/add', wizardsController.store)

app.get('/wizards/edit/:id', wizardsController.edit)
app.post('/wizards/edit/:id', wizardsController.update)

app.get('/wizards/delete/:id', wizardsController.destroy)
*/

// Auth routes

app.get('/register', userController.register)
app.post('/register', userController.store)

app.get('/login', userController.login)
app.post('/login', userController.auth)

app.get('/logout', userController.logout)

app.listen(80, function(){
    console.log("Listening in port 80")
})