const express = require("express");

const authUser = require("../middlewares/authUser");
const ideaModel = require("../models/idea.model");

const router = express.Router();

let ideas = [];
(async () => {
    ideas = await ideaModel.model.find();
})();

router.get("/", (req, res) => {
    res.send(ideas.map((idea) => {
        return {
            _id: idea._id,
            title: idea.title,
            description: idea.description,
            votes: idea.votes.length,
            iVoted: idea.votes.findIndex((voter) => voter._id.equals(req.query.me)) !== -1
        };
    }));
})

router.patch("/vote", authUser, async (req, res) => {
    const ideaIndex = ideas.findIndex((idea) => idea._id.equals(req.query._id));
    if (ideaIndex === -1) res.sendStatus(500);
    else {
        const idea = ideas[ideaIndex];
        const voteIndex = idea.votes.findIndex((voter) => voter._id.equals(res.locals.user._id));

        if (voteIndex === -1) {
            ideas[ideaIndex].votes.push(res.locals.user._id);
            await ideaModel.model.findByIdAndUpdate(req.query._id, { $push: { votes: res.locals.user._id } });
            res.send({ voted: true });
        } else {
            ideas[ideaIndex].votes = ideas[ideaIndex].votes.filter((voter) => !voter._id.equals(res.locals.user._id));
            await ideaModel.model.findByIdAndUpdate(req.query._id, { $pull: { votes: res.locals.user._id } });
            res.send({ voted: false });
        }
    }
});

module.exports = router;