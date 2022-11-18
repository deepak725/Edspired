const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const DBconnect = require('./DAO/connection')
const app = express();
const bodyParser = require("body-parser");
const Port = process.env.PORT || 3001;
const userRoute = require('./routes/userRoute')

var corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
  };
//enable cors
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/user',userRoute);

app.get("/",(req,res)=>{
    res.send("Welcome to Edspired Backend!");
})

DBconnect();
app.listen(Port,()=>{
    console.log(`Server is running on Port : ${Port}`);

});

