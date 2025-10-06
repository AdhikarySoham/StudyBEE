const express=require("express");
const app=express();
const mongoose=require("mongoose");
const StudyUnit=require("./models/studyunit.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");

const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
//  const quizRouter=require("./models/quiz.js");

const studyunitsRouter=require("./routes/studyunits.js");
const userRouter=require("./routes/user.js");
const quizRouter=require("./routes/quiz.js");
const schedulingRouter=require("./routes/scheduling.js");
const dashboardRouter=require("./routes/dashboard.js");

const MongoDB_Url=process.env.ATLASDB_URL; 
async function main(){
    await mongoose.connect(MongoDB_Url); //127.0.0.1:27017/studyapp
}

main().then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});

app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));

const store=MongoStore.create({
    mongoUrl:MongoDB_Url,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*60*60 // time period in seconds
});

store.on("error",()=>{
    console.log("Session store error",err);
});

const sessionOptions={
    store:store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now()+ 7*24*60*60*1000, // 7 days
        maxAge: 7*24*60*60*1000,// 7 days
        httpOnly:true
    }
};




app.get("/",(req,res)=>{
    res.send("I am root");
});


app.use(session(sessionOptions)); 
app.use(flash());  // We have to use flash before the routes

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// Middleware to set flash messages in response locals
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser=req.user; // Set current user in response locals
    next(); 
});



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use("/studyunits",studyunitsRouter);
app.use("/",userRouter);
app.use("/studyunits", quizRouter);  
app.use("/studyunits", schedulingRouter); 
app.use("/dashboard", dashboardRouter); 
// This handles the quiz route for specific topic
//app.use("/studyunits", require("./routes/quiz.js"));
//app.use("/studyunits/:id/topics/:topicId/quiz", quizRouter); // This is not needed as quizRouter already handles this route

app.listen(8050,()=>{
    console.log("Server is listening!");
}); 