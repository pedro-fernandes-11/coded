const templateModel = require("../model/template.js")
const userModel = require("../model/user.js")

module.exports = {
    show: function(req, res){
        var id = parseInt(req.params.id)

        templateModel.get(id)
        .then(result =>
            {
                if(result.length){
                    var devId = result[0]["id_dev"]

                    userModel.get(devId)
                    .then(devResult =>
                        {
                            var devImg = devResult[0]["img"]

                            devImg.length == 2 ? devImg = devImg + ".svg" : devImg = devImg + ".png"

                            var devName = devResult[0]["name"]
                            var devRating = devResult[0]["avg_rating"]

                            res.render('template.ejs', {
                                name: result[0]["name"], desc: result[0]["desc"], rating: result[0]["avg_rating"], devName, devPic, devRating
                            })
                        })
                    .catch(err =>
                        console.log("Developer not found"))
                }else{
                    res.redirect('/error')
                }
                
            })
        .catch(err =>
            console.log(err))
    }
}