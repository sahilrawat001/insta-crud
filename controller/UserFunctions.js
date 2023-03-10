let data = require("../database/user.json");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const fs = require("fs");
const { newIndex } = require("./sidefunction");

// finds the matching mail with data
let userMail = (tokenid) => data.find((i) => i.mail == tokenid);

// finds the matching password with data
let userPassword = (tokenid) => data.find((i) => i.password == tokenid);


function fsPush(data) {
    fs.writeFileSync("./database/user.json", JSON.stringify(data), "utf-8");
}
function tokenPush(data) {
    fs.writeFileSync("./database/token.json", JSON.stringify(data), "utf-8");
}



const signUp = (req, res) => {
    //gets object from id
    let checkEmail = userMail(req.body.mail);

    if (checkEmail) {
        res.status(400).send(" user already existed");
    } else {
        //assigning index to new user
        req.body.id = newIndex();
        console.log(req.body.id);
        data.push(req.body);
        let token = jwt.sign({ id: req.body.id }, secret, { expiresIn: "3h" });
        let obj = new Object;
        obj.token = token;
        console.log(obj);
        tokenPush(obj);
        fsPush(data);
     
        res.status(200).send(JSON.stringify({ token }));

    }
};


const signIn = (req, res) => {
    let checkEmail = userMail(req.body.mail);
    let checkPassword = userPassword(req.body.password);

    if (!checkEmail || !checkPassword) {
        res.status(400).send(" signup first");
    } else {
        if (checkEmail.id != checkPassword.id) {
            console.log("invalid");
            res.status(404).send("invalid");
        }

        else {

            let token = jwt.sign({ id: checkEmail.id }, secret, { expiresIn: "3h" });
            console.log(" ok");
            let obj = new Object;
            obj.token = token;
            console.log(obj);
            tokenPush(obj);
            res.status(200).send(JSON.stringify({ token }));
        }

    }
};
module.exports = { signIn, signUp };
