var mysql = require('mysql2')
var conn = mysql.createPool({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "",
    database: "coded"
})

exports.conn = conn