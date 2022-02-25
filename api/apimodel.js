const database = require("../database/database");

class Apimodel {
    registerUser(id , email , username , salt , iterations , hash , callback) {
        database.query(`insert into user_social values('${id}' , '${email}' , '${username}' , '${salt}' , '${iterations}' , '${hash}' , '0' , '0' )` , (error , results) => {
            if(error) {
                if(error.code === '23505') {
                    callback({status: 400 , message: "Entered id already exists"})
                } else {
                    callback({status: 500 , message: "Something went wrong"})
                }
            } else {
                callback({status: 200 , message: "User registered successfully"})
            }
        })
    }

    getUserById(email , password, callback) {
        if (!email || !password || !callback) {
            callback(null);
            return;
        }
        database.query(`select * from user_social where email='${email}'`, (error, results) => {
            if(error) {
                callback({status: 500 , message: "Something went wrong"})
            } else {
                callback(results.rows);
            }
        });
    }

    followUser(id1 , id2 , callback) {
        database.query(`insert into followers_social values('${id1}' , '${id2}')` , (err , results) => {
            if(err) {
                callback({status: 500 , message: "Something went wrong"})
            } else {
                callback({status: 200 , message: "User followed successfully"})
            }
        })
    }

    unfollowUser(id1 , id2 , callback) {
        database.query(`delete from followers_social where user_following = '${id1}' and user_followed = '${id2}'` , (err , results) => {
            if(err) {
                callback({status: 500 , message: "Something went wrong"})
            } else {
                callback({status: 200 , message: "User unfollowed successfully"});
            }
        })
    }

    getUsername(id , callback) {
        database.query(`select username from user_social where id = '${id}'` , (err , results) => {
            if(err) {
                callback({status: 500 , message: "Something went wrong"})
            } else {
                callback(results.rows[0]);
            }
        })
    }

    getFollowing(id , callback) {
        database.query(`select count(user_followed) from followers_social where user_following = '${id}'` , (err , results) => {
            if(err) {
                callback({status: 500 , message: "Something went wrong"})
            } else {
                callback(results.rows[0]);
            }
        })
    }

    getFollowers(id , callback) {
        database.query(`select count(user_following) from followers_social where user_followed = '${id}'` , (err , results) => {
            if(err) {
                callback({status: 500 , message: "Something went wrong"})
            } else {
                callback(results.rows[0]);
            }
        })
    }

    createPost(id , title , description , user_id , callback) {
        database.query(`insert into posts_social(id , title , description , likes , comments , user_id) values ('${id}' , '${title}' , '${description}' , '0' , '0' , '${user_id}')` , (err , results) => {
            if(err) {
                callback({status: 500 , message: "Something went wrong"})
            } else {
                callback({status: 200 , PostId: id ,  Title: title , Description: description })
            }
        })
    }

    deletePost(user_id , post_id , callback) {
        database.query(`delete from posts_social where user_id = '${user_id}' and id = '${post_id}'` , (err ,results) => {
            if(err) {
                callback({status: 500 , message: "Something went wrong"})
            } else {
                callback({status: 200 , message: "Post deleted successfully"})
            }
        })
    }

    likePost(user_id , post_id , callback) {
        database.query(`insert into likes_social values('${post_id}' , '${user_id}')` , (err , results) => {
            if(err) {
                callback({status: 500 , message: "Something went wrong"})
            } else {
                database.query(`update posts_social set likes = likes + 1 where id = '${post_id}'` , (err , results) => {
                    if(err) {
                        callback({status: 500 , message: "Something went wrong"})
                    } else {
                        callback({status: 200 , message: "Post liked successfully"})
                    }
                })
            }
        })
    }

    unlikePost(user_id , post_id , callback) {
        database.query(`delete from likes_social where user_id = '${user_id}' and post_id = '${post_id}'` , (err , results) => {
            if(err) {
                callback({status: 500 , message: "Something went wrong"})
            } else {
                database.query(`update posts_social set likes = likes - 1 where id = '${post_id}'` , (err , results) => {
                    if(err) {
                        callback({status: 500 , message: "Something went wrong"})
                    } else {
                        callback({status: 200 , message: "Post unliked successfully"})
                    }
                })
            }
        })
    }

    addComment(id , user_id , post_id , comment_text ,  callback) {
        database.query(`insert into comments_social values('${id}' , '${post_id}' , '${user_id}' , '${comment_text}')` , (err , results) => {
            if(err) {
                callback({status: 500 , message: "Something went wrong"})
            } else {
                database.query(`update posts_social set comments = comments + 1 where id = '${post_id}'` , (err , results) => {
                    if(err) {
                        callback({status: 500 , message: "Something went wrong"})
                    } else {
                        callback({status: 200 , commentId: id})
                    }
                })
            }
        })
    }

    getPost(post_id , callback) {
        database.query(`select * from posts_social where id = '${post_id}'` , (err , results) => {
            callback(results.rows);
        })
    }

    getAllPosts(user_id , callback) {
        database.query(`select id , title , description , createdAt , likes from posts_social where user_id = '${user_id}' order by createdAt` , (err , results) => {
            if(err) {
                callback({status: 500 , message: "Something went wrong"})
            } else {
                var postsArr = results.rows;
                const commentsMap = new Map();
                var query = `select post_id , commenttext from comments_social where`;
                postsArr.map(post => {
                    query += ` post_id = '${post.id}' or`
                });
                query = query.substring(0 , query.length-2);
                query += ` order by post_id;`;
                database.query(`${query}` , (err , results) => {
                    if(!err) {
                        results.rows.map(obj => {
                            if(!commentsMap.get(`${obj.post_id}`)) {
                                var newArr = [];
                                newArr.push(obj.commenttext);
                                commentsMap.set(`${obj.post_id}` , newArr);
                            } else {
                                commentsMap.get(`${obj.post_id}`).push(obj.commenttext);
                            }
                        });
                        postsArr.map(post => {
                            post.comments = commentsMap.get(`${post.id}`);
                        })
                        callback(postsArr);
                    } else {
                        callback({status: 500 , message: "Something went wrong"})
                    }
                });
               
            }
        })
    }
}

module.exports = Apimodel;