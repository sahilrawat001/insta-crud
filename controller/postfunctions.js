let postData = require("../database/post.json");
let userToken = require("../database/token.json");

const fs = require("fs");
const { verifyUser } = require("../middleware/middlewares");
const { newPostIndex } = require("./sidefunction");
const { tokenError, acceptMessage, alreadyLiked, authenticateTokenError } = require("../utils/messages");
 
let findPost = (postid) => postData.find((i) => i.postId == postid);
let restlike = (postid) => postData.filter((i) => i.postId != postid);

function fsPush(data) {
    fs.writeFileSync("./database/post.json", JSON.stringify(data), "utf-8");
}
let checkUser = (token) => {
    if (userToken.token === token) {
        console.log("truee");
        return true;
    }
    else {
        console.log("falsee");
        return false;
    }
};
const getIdPosts = (req, res) => {
    if (checkUser(req.headers.token)) {
        
        let myPost = findPost(req.params.id);
        if (!myPost) {
            res.status(404).send("requested data not present");
        }
        else {
            res.send(myPost);
        }
    }
    else {
        res.send(authenticateTokenError);
    }

};



const getPosts = (req, res) => {
    if (checkUser(req.headers.token)) {
        
        res.send(postData);
    }
    else {
        res.send("authenticateTokenError");
    }

};

const postNewData = (req, res) => {
    if (checkUser(req.headers.token)) {
        
        try {
            
            let tokenenData = verifyUser(req, res);
            req.body.userId = tokenenData.id;
            req.body.postId = newPostIndex();
            postData.push(req.body);
            fsPush(postData);
            res.send(acceptMessage);
        }
        catch {
            console.log(tokenError);
            res.send(tokenError);
        }
    }
    else {
        res.send(authenticateTokenError);
    }

};

const likePost = (req, res) => {
    if (checkUser(req.headers.token)) {
        
    
        try {

            let tokenenData = verifyUser(req, res);
            let likedPost = findPost(req.params.id);
            let restPost = restlike(req.params.id);
            if (!likedPost) {
                res.status(400).send("requested data is not presesnt");
            }
            else {

                if (likedPost.likes.includes(tokenenData.id)) {
                    console.log(alreadyLiked);
                    res.send(alreadyLiked);
                }

                else {
                    likedPost.likes.push(tokenenData.id);
                    restPost.push(likedPost);
                    fsPush(restPost);
                    res.send(likedPost);
                }
            }
        }
        catch {
            console.log(tokenError);
            res.send(tokenError);
        }
    }
    else {
        res.send(authenticateTokenError);
    }
};
const commentPost = (req, res) => {
    if (checkUser(req.headers.token)) {
        
    
        try {
            let tokenenData = verifyUser(req, res);
            let commentPost = findPost(req.params.id);
            let restPost = restlike(req.params.id);
            if (!commentPost) {
                res.status(400).send("requested data is not present");
            }
            else {

                let obj = new Object;
                obj.commentId = tokenenData.id;
                obj.comment = req.body.comment;
                commentPost.comments.push(obj);
                restPost.push(commentPost);
                fsPush(restPost);
                res.send(commentPost);
            }
        }
        catch {
            console.log(tokenError);
            res.send(tokenError);

        }
    }
    else {
        res.send(authenticateTokenError);
    }
};

module.exports = { getPosts, getIdPosts, postNewData, likePost, commentPost };