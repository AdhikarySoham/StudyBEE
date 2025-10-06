const express=require('express');
const router=express.Router();
const User=require("../models/user.js");
const passport=require("passport");
const { saveRedirectURL } = require('../middleware.js');

// For signup route
router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup", async (req,res)=>{
    try{
     let {username,email,password}=req.body;
     const newUser=new User({username,email});
     const registerUser=await User.register(newUser,password);
     console.log(registerUser); 
     req.login(registerUser,(err)=>{
        if(err){
            return next(err);
        };
        req.flash("success","Welcome to Smart Study Scheduler!");
        res.redirect("/studyunits");    
     })
     //res.redirect("/studyunits");
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
   
});

// For login route
router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})

router.post("/login",saveRedirectURL,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),async (req,res)=>{
    req.flash("success","Welcome back!");
    let redirectURL=res.locals.redirectURL || "/studyunits";

    res.redirect(redirectURL);
})

// For logout route
router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","Logged out successfully");
        res.redirect("/studyunits");
    })
});

module.exports=router;

