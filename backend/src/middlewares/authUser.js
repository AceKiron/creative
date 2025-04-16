const axios = require("axios");
const userModel = require("../models/user.model");

module.exports = (req, res, next) => {
    axios({
        url: "https://api.github.com/user",
        method: "GET",
        headers: {
            "Authorization": req.headers.authorization
        }
    }).then(async (r) => {
        res.locals.user = await userModel.model.findOne({ id: r.data.id });
        
        if (res.locals.user === null) res.sendStatus(500);
        else if (res.locals.user.banned) res.sendStatus(403);
        else next();
    });
}