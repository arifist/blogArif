const express=require("express");
const path = require('path');
const bodyParser = require('body-parser')
const configSession=require("./middleware/config_Session");
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app=express();

//set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//body parser. Bodyden gelen bilgileri backend'de almak için tanımlanması zorunludur.
app.use(bodyParser.urlencoded({ extended: true })); //extend:true->enabled json
app.use(bodyParser.json());

//midleware session
app.use(configSession);
app.use(cookieParser());

//---Static
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,"node_modules")))

//router
const authRouter=require("./routes/user");
app.use("/", authRouter);

app.listen(process.env.PORT || 3000,()=>{
  console.log("server running");
});