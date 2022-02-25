const Utils = require("../utilities/Utils")
const apiModel = require("./apimodel")
const mApiModel = new apiModel();
module.exports = new class ApiController {
    createuser(req , response) {
        Utils.hashPassword(req.body.password , (v) => {
            mApiModel.registerUser(Utils.getRandomInt(10000000000, 99999999999) , req.body.email , req.body.username , v.salt , v.iterations , v.hash , callback => {
                response.status(callback.status).json(callback);
            })
        })
    }

    authenticate(req, response) {
        mApiModel.getUserById(req.body.email, req.body.password, (callback) => {
            if (callback && callback.length > 0) {
                if (Utils.isPasswordCorrect(callback[0].hash, callback[0].salt, callback[0].iterations, req.body.password)) {
                    response.status(200).json(Utils.generateToken({
                        id: callback[0].id
                    }));
                    return;
                }
            }
            response.status(401).json({status: 401, message: "Wrong id or password"});
        });
    }

    followuser(req , response) {
        const authHeader = req.headers.authorization
        const result = Utils.verifyToken(authHeader);

        const id1 = result.payload.payload.id;
        
        mApiModel.followUser(id1 , req.params.id , callback => {
            return response.status(callback.status).json(callback);    
        })
    }

    unfollowuser(req , response) {
        const authHeader = req.headers.authorization
        const result = Utils.verifyToken(authHeader);

        const id1 = result.payload.payload.id;
        mApiModel.unfollowUser(id1 , req.params.id , callback => {
            return response.status(callback.status).json(callback); 
        })
    }

    getuser(req , response) {
        const authHeader = req.headers.authorization
        const result = Utils.verifyToken(authHeader);

        const user_id = result.payload.payload.id;
        mApiModel.getUsername(user_id , username => {
            mApiModel.getFollowing(user_id , following => {
                mApiModel.getFollowers(user_id , followers => {
                    return response.status(200).json({Username: username.username , Followers: followers.count , Following: following.count})
                })
            })
        })
    }

    createpost(req , response) {
        const authHeader = req.headers.authorization
        const result = Utils.verifyToken(authHeader);

        const user_id = result.payload.payload.id;
        mApiModel.createPost(Utils.getRandomInt(10000000000, 99999999999) , req.body.title , req.body.description , user_id , callback => {
            return response.status(callback.status).json(callback);
        })
    }

    deletepost(req , response) {
        const authHeader = req.headers.authorization
        const result = Utils.verifyToken(authHeader);

        const user_id = result.payload.payload.id;
        const post_id = req.params.id;
        mApiModel.deletePost(user_id , post_id , callback => {
            return response.status(callback.status).json(callback);
        })
    }

    likepost(req , response) {
        const authHeader = req.headers.authorization
        const result = Utils.verifyToken(authHeader);

        const user_id = result.payload.payload.id;
        const post_id = req.params.id;
        mApiModel.likePost(user_id , post_id , callback => {
            return response.status(callback.status).json(callback);
        })
    }

    unlikepost(req , response) {
        const authHeader = req.headers.authorization
        const result = Utils.verifyToken(authHeader);

        const user_id = result.payload.payload.id;
        const post_id = req.params.id;
        mApiModel.unlikePost(user_id , post_id , callback => {
            return response.status(callback.status).json(callback);
        })
    }

    addcomment(req , response) {
        const authHeader = req.headers.authorization
        const result = Utils.verifyToken(authHeader);

        const user_id = result.payload.payload.id;
        const post_id = req.params.id;
        mApiModel.addComment(Utils.getRandomInt(10000000000, 99999999999) , user_id , post_id , req.body.comment , callback => {
           return response.status(callback.status).json(callback);
        })
    }

    getpost(req , response) {
        const post_id = req.params.id;
        mApiModel.getPost(post_id , callback => {
            if(callback) {
                return response.status(200).json(callback);
            }
        })
    }

    getallposts(req , response) {
        const authHeader = req.headers.authorization
        const result = Utils.verifyToken(authHeader);

        const user_id = result.payload.payload.id;
        mApiModel.getAllPosts(user_id , callback => {
            return response.status(200).json(callback);
        })
    }
}