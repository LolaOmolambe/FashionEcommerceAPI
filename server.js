const mongoose = require("mongoose");

const app = require("./app");

mongoose.connect("", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {
    console.log("DB Connection Successful");
}).catch(() => {
    console.log("DB Connection not successful");
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})