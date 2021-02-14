var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require('mongoose');
// var passport = require("passport");

var router = express.Router();

app.set("view engine", "ejs");
//app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(passport.initialize());
// // app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


mongoose.connect(
  "mongodb+srv://jita:ananya@cluster0.ag8vc.mongodb.net/test?authSource=admin&replicaSet=atlas-am764a-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
  { useMongoClient: true }
);

// add public direct
app.use(express.static(__dirname + "/public"));

//MAIN code goes here

app.get("/", (req, res) => {
  res.render("./home");
});

app.listen(process.env.PORT||3005, function(){
  console.log("The Server has started");
});

//Listen port
app.listen(app.get("port"), function() {
  console.log("express started " + app.get("port"));
});
