const express = require("express");
const cors = require("cors");

const connectToDatabase = require("./utils/connectToDatabase");

const mainRouter = require("./routes");

const { APP_ORIGIN } = require("./constants/env");

const app = express();

const whitelist = [APP_ORIGIN, undefined];
app.use(cors({
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) callback(null, true);
        else callback(new Error(`Origin '${origin}' not allowed by CORS!`));
    }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", mainRouter);

app.listen(3157, () => {
    connectToDatabase();
});