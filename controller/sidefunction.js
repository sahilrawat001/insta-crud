//function to get new index
let data = require("../database/user.json");
let postDdata = require("../database/post.json");


 
//gets new index for user
function newIndex() {
    let nIndex = 0;
    data.forEach((i) => {
        if (nIndex < i.id) {
            nIndex = i.id;
        }
    });
    return nIndex + 1;
}


function newPostIndex() { 
    let nIndex = 0;
    postDdata.forEach((i) => {
        if (nIndex < i.postId) {
            nIndex = i.postId;
        }
    });
    return nIndex + 1;
}
 

module.exports={newIndex,newPostIndex};