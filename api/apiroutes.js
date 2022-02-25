const apiControllers = require("./apicontroller");
const express = require("express");
const router = express.Router();
router.post('/createuser' , apiControllers.createuser);
router.post('/authenticate', apiControllers.authenticate);
router.post('/follow/:id' , apiControllers.followuser)
router.post('/unfollow/:id' , apiControllers.unfollowuser)
router.get('/user', apiControllers.getuser);
router.post('/posts', apiControllers.createpost);
router.delete('/posts/delete/:id', apiControllers.deletepost);
router.post('/like/:id', apiControllers.likepost);
router.post('/unlike/:id', apiControllers.unlikepost);
router.post('/comment/:id', apiControllers.addcomment);
router.get('/posts/:id', apiControllers.getpost);
router.get('/all_posts', apiControllers.getallposts);
module.exports = router;