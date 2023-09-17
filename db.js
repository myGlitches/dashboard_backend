const mongoose = require("mongoose");

const connectDB = () => {
    console.log(process.env.mongoURI)
    mongoose
        .connect(process.env.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => {
            console.error(err.message);
            process.exit(1);
        });
};

module.exports = connectDB;