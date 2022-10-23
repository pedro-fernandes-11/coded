const conn = require('../config/connection.js').conn

function showRecord(name, email, pass, dev, img){
    return {
        "name": name,
        "email": email,
        "pass": pass,
        "dev": dev,
        "img": img
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
    
    async get(text){
        if(Number.isInteger(text)){
            var sql = "select * from user where id = ?"
        }else if(!text.match(/^[0-9a-z]+$/)){
            var sql = "select * from user where email = ?"
        }else{
            var sql = "select * from user where name = ?"
        }

        return new Promise((resolve, reject) => {
            conn.query(sql, text, (err, row) => {
                if(err) return reject(err)
                resolve(row)
            })
        })
    },

    insert(name, email, pass, dev, img){
        var sql = "insert into user (name, email, pass, dev, img) values ?";
        var values = [
            [name, email, pass, dev, img]
        ];
        conn.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Inserted user: " + JSON.stringify(showRecord(...values[0])))
        });
    }
}