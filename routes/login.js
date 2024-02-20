var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
const AccData = require("../models/HN80_thapThuyCanhAccData.js");

/* GET Login page. */
router.get('/', function (req, res, next) {
    res.render('login', { title: 'Express', message: "" });
});

/* POST Login page. */
router.post('/', async function (req, res, next) {
    var username = req.body.loginUserName;
    var password = req.body.loginPassword;
    console.log(username, password);
    var userFound = await AccData.findOne({ username: username, password: password });
    if (userFound) {
        res.redirect(`/home?id=${userFound.id}`);
    } else {
        res.render('login', { title: 'Express', id: undefined, message: "Login failed" });
    }
});


router.post('/register', async function (req, res, next) {
    var username = req.body.registerUserName;
    var password = req.body.registerPassword;

    console.log(username, password);

    if (username && password) {
        var userFound = await AccData.findOne({ username: username });
        if (userFound) {
            res.render('login', { title: 'Express', message: "Username already exists" });
        }
        else {
            var newUser = new AccData({ username: username, password: password, role: "user" });
            newUser.save();
            res.render('chosing', { title: 'Express', message: "Register success! Choose your tree" });
        }
    }
});

router.get('/chosing', function (req, res, next) {
    res.render('chosing', { title: 'Express', message: "" });
});

router.post('/chosing', async function (req, res, next) {
    var id = req.query.id;
    var treeName = req.body.treeName;
    console.log(id, treeName);
    var userFound = await AccData.findById(id);
    if (userFound) {
        userFound.chosenTree.isChosen = true;
        userFound.chosenTree.treeName = treeName;
        await userFound.save();
        res.json({ success: "Chosing success" });
    } else {
        res.json({ message: "Chosing failed" })
    }
});


module.exports = router;