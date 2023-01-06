const userModel = require("../model/user.js")

module.exports = {
    show: function(req, res){
        var id = parseInt(req.params.id)

        userModel.get(id)
        .then(result =>
            {
                if(result.length){
                    var img = result[0]["img"]

                    img.length == 2 ? img = img + ".svg" : img = img + ".png"

                    res.render('user/show.ejs', {
                        name: result[0]["name"], email: result[0]["email"], dev: result[0]["dev"], img: img
                    })
                }else{
                    res.redirect('/error')
                }
                
            })
        .catch(err =>
            console.log(err))
    }
}