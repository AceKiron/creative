const express = require("express");
const axios = require("axios");

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require("../constants/env");
const userModel = require("../models/user.model");

const router = express.Router();

router.get("/login-redirect", (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`)
});

router.get("/login", async (req, res) => {
    const accessToken = await axios({
        url: `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${req.query.code}`,
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((res) => res.data.access_token);

    const data = await axios({
        url: "https://api.github.com/user",
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }).then((res) => res.data);

    const existingUser = await userModel.model.findOne({ id: data.id });
    if (existingUser == null) {
        const newUser = await new userModel.model({ id: data.id }).save();
        res.send({ ...data, _id: newUser._id, accessToken, banned: false });
    } else {
        res.send({ ...data, _id: existingUser._id, accessToken, banned: existingUser.banned });
    }
});

module.exports = router;