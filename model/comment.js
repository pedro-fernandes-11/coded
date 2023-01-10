const conn = require('../config/connection.js').conn

function showRecord(comment, id_template, id_user){
    return {
        "comment": comment,
        "id_template": id_template,
        "id_user": id_user
    }
}

module.exports = {
    async getAll(){
        var sql = "select * from comment"
        return new Promise((resolve, reject) => {
            conn.query(sql, (err, row) => {
                if (err) return reject(err)
                resolve(row)
            })
        })
    },
    
    async get(id){
        var sql = "select * from comment where id_template = ?"

        return new Promise((resolve, reject) => {
            conn.query(sql, id, (err, row) => {
                if(err) return reject(err)
                resolve(row)
            })
        })
    },

    insert(comment, id_template, id_user){
        var sql = "insert into comment (comment, id_template, id_user) values ?";
        var values = [
            [comment, id_template, id_user]
        ];
        conn.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Inserted comment: " + JSON.stringify(showRecord(...values[0])))
        });
    }
}