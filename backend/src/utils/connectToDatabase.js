const mongoose = require("mongoose");

const { DATABASE_URI } = require("../constants/env");

module.exports = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(DATABASE_URI, { authSource: "admin" });
        console.log("Successfully connected to MongoDB!");
    } catch (err) {
        console.error("Could not connect to MongoDB!", err);
        process.exit(1);
    }
}