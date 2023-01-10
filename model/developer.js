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
        var sql = "select * from developer"
        return new Promise((resolve, reject) => {
            conn.query(sql, (err, row) => {
                if (err) return reject(err)
                resolve(row)
            })
        })
    },
    
    async get(id){
        var sql = "select * from developer where id = ?"

        return new Promise((resolve, reject) => {
            conn.query(sql, id, (err, row) => {
                if(err) return reject(err)
                resolve(row)
            })
        })
    },

    insert(name, email, pass, dev, img){
        var sql = "insert into developer (name, email, pass, dev, img) values ?";
        var values = [
            [name, email, pass, dev, img]
        ];
        conn.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Inserted developer: " + JSON.stringify(showRecord(...values[0])))
        });
    }
}