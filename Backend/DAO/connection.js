require('dotenv').config()
const mongoose = require("mongoose");
const connection = ()=>
{
    mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DataBase Connected...");
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = connection;