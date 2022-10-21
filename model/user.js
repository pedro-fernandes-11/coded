const conn = require('../config/connection.js').conn

function showRecord(name, email, pass, dev){
    return {
        "name": name,
        "email": email,
        "pass": pass,
        "dev": dev
    }
}

module.exports = {
    async getAll(){
        var sql = "select * from user"
        return new Promise((resolve, reject) => {
            conn.query(sql, (err, row) => {
                if (err) return reject(err)
                resolve(row)
            })
        })
    },
    
    async get(name){
        var sql = "select * from user where name = ?"
        return new Promise((resolve, reject) => {
            conn.query(sql, name, (err, row) => {
                if(err) return reject(err)
                resolve(row)
            })
        })
    },

    async getEmail(email){
        var sql = "select * from user where email = ?"
        return new Promise((resolve, reject) => {
            conn.query(sql, email, (err, row) => {
                if(err) return reject(err)
                resolve(row)
            })
        })
    },

    insert(name, email, pass, dev){
        var sql = "insert into user (name, email, pass, dev) values ?";
        var values = [
            [name, email, pass, dev]
        ];
        conn.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Inserted user: " + JSON.stringify(showRecord(...values[0])))
        });
    }
}