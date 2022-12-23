const bcrypt = require('bcrypt')
const userModel = require("../model/user.js")
const axios = require('axios');
const mailjet = require ('node-mailjet')
const nodemailer = require('nodemailer')

const saltRounds = 10

module.exports = {
    async sendEmail(req, res){

        const apikey = 'a078c36d59b2b8f49718d1275b4dab6c'
        const secret = 'b9f1e0271af1b1dd59ed5e843ce95731'

        const transporter = nodemailer.createTransport({
            host: "in-v3.mailjet.com",
            port: 25,
            auth: {user: apikey, pass: secret}
        })

        const userEmail = req.session.userEmail || "Anônimo"

        transporter.sendMail({
            from: "pouzadap@gmail.com",
            to: "pouzadap@gmail.com",
            replyTo: "pouzadap@gmail.com",
            subject: req.body.subject,
            html: "Mensagem enviada por "+userEmail+":<br>"+req.body.msg
        }).then(info => {
            res.redirect('/')
        }).catch(error=>{
            res.redirect('/')
        })
    }
}