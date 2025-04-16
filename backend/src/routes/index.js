const express = require("express");

const router = express.Router();

router.use("/ideas", require("./ideas.route"));
router.use("/user", require("./user.route"));

module.exports = router;