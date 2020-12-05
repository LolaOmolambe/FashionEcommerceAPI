const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "./config.env"});
const app = require("./app");


mongoose.connect("", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {
    console.log("DB Connection Successful");
}).catch(() => {
    console.log("DB Connection not sucessful");
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})