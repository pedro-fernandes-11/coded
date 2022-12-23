const bcrypt = require('bcrypt')
const userModel = require("../model/user.js")
const saltRounds = 10

module.exports = {
    register: function(req, res){
        res.render('register.ejs')
    },

    store: function(req, res){
        var user = req.body.user
        if(user.length < 4){
            res.render('register.ejs', {msg: 'Nome de usuário deve ter no mínimo 4 caracteres'})
            res.end()
        }else{
            if(!user.match(/^[0-9a-z]+$/)){
                res.render('register.ejs', {msg: 'Nome de usuário não pode ter caracteres especiais'})
                res.end()
            }else{
                if(req.body.pass.length < 8){
                    res.render('register.ejs', {msg: 'Senha deve ter no mínimo 8 caracteres'})
                    res.end()
                }else{
                    userModel.get(user)
                    .then(result =>
                        {
                            if(result.length){
                                res.render('login.ejs', {msg: 'Usuário já existe, faça login'})
                                res.end()
                            }else{
                                var email = req.body.email
                                userModel.get(email)
                                .then(result =>
                                    {
                                        if(result.length){
                                            res.render('login.ejs', {msg: 'E-mail já cadastrado a uma conta'})
                                            res.end()
                                        }else{
                                            console.log(req.body.pass)
                                            console.log(req.body.passConf)
                                            console.log(req.body.pass.localeCompare(req.body.passConf))
                                            req.body.pass.localeCompare(req.body.passConf) != -1 ? (
                                                bcrypt.hash(req.body.pass, saltRounds, function(err, hash){
                                                    var dev = req.body.dev === undefined ? 0 : 1

                                                    var arrayImgs = ["p1", "p2", "s1", "s2"]
                                                    var randomImg = arrayImgs[Math.floor(Math.random() * arrayImgs.length)]

                                                    userModel.insert(user, req.body.email, hash, dev, randomImg)
                                                    res.redirect('/login')
                                                })
                                            ) : (
                                                res.render('register.ejs', {msg: 'Senhas devem coincidir'}),
                                                res.end()
                                            )
                                        }
                                    })
                                .catch(err =>
                                    console.log(err)) 
                            }
                        })
                    .catch(err =>
                        console.log(err))
                }
            }
        }
    },

    login: function(req, res){
        res.render('login.ejs')
    },

    auth: function(req, res){
        var user = req.body.user
        userModel.get(user)
        .then(result =>
            {
                if(result.length){
                    bcrypt.compare(req.body.pass, result[0]['pass'], function(err, resultComparison){
                        if (err) throw err
                        if (resultComparison){
                            req.session.loggedin = true
                            req.session.username = result[0]['name']
                            req.session.userId = result[0]['id']
                            req.session.userImg = "assets/user/"+result[0]['img']+".svg"
                            req.session.userEmail = result[0]['email']

                            res.redirect('/')
                        }else{
                            res.render('login.ejs', {msg: 'Senha incorreta'})
                            res.end()
                        }
                    })
                }else{
                    res.render('login.ejs', {msg: 'Usuário não existe'})
                    res.end()
                }
            })
        .catch(err =>
            console.log(err))
        
    },

    logout: function(req, res){
        req.session.destroy(function(err){})
        res.redirect('/')
    }
}