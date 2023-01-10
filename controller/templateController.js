const templateModel = require("../model/template.js")
const developerModel = require("../model/developer.js")
const userModel = require("../model/user.js")
const commentModel = require("../model/comment.js")

module.exports = {
    show: function(req, res){
        var id = parseInt(req.params.id)

        templateModel.get(id).then(result =>
            {
                if(result.length){
                    var devId = result[0]["id_dev"]

                    developerModel.get(devId).then(devResult =>
                        {
                            var userId = devResult[0]["id_user"]

                            userModel.get(userId).then(userResult => 
                            {
                                var devImg = userResult[0]["img"]
                                var devName = userResult[0]["name"]
                                var devRating = devResult[0]["avg_rating"]

                                commentModel.get(id).then(commentsResult => {            
                                    var commentsPromise = [];

                                    commentsResult.forEach((each) => {
                                        commentsPromise.push(
                                            userModel.get(each["id_user"]).then(commentUserResult =>
                                                {  
                                                    let commentUserImage = commentUserResult[0]["img"]

                                                    commentUserImage.length == 2 ? commentUserImage = commentUserImage + ".svg" : commentUserImage = commentUserImage + ".png"

                                                    var objectComment = {
                                                        commentUserName: commentUserResult[0]["name"],
                                                        commentUserImage,
                                                        commentText: each["comment"]
                                                    }
    
                                                    return objectComment
                                                }).catch(err => console.log)
                                        )
                                    })

                                    var comments = []

                                    Promise.all(commentsPromise).then(() => {
                                        commentsPromise.forEach((each) => {
                                            each.then(content => {
                                                comments.push(content)
                                            })
                                        })
                                    }
                                    ).then(() => 
                                        {
                                            res.render('template.ejs', {
                                                name: result[0]["name"], desc: result[0]["desc"], rating: result[0]["avg_rating"], devName, devImg, devRating, comments
                                            })
                                        }
                                    )
                                }).catch(err => console.log(err))
                            }).catch(err => console.log(err))
                        }).catch(err => console.log(err))
                }else{
                    res.redirect('/error')
                }
            })
    }
}