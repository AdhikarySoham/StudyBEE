module.exports.isLoggedIn=(req,res,next)=>{
     //console.log(req.path,"->",req.originalUrl);
     if(!req.isAuthenticated()){
        req.session.redirectURL=req.originalUrl; // Store the original URL to redirect after login
        req.flash("error","You must be logged in to create a study unit");
        return res.redirect("/login");
    };
    next(); 
};

module.exports.isLoggedInDash=(req,res,next)=>{
     //console.log(req.path,"->",req.originalUrl);
     if(!req.isAuthenticated()){
        req.session.redirectURL=req.originalUrl; // Store the original URL to redirect after login
        req.flash("error","You must be logged in to access the dashboard");
        return res.redirect("/login");
    };
    next(); 
};

module.exports.saveRedirectURL=(req,res,next)=>{
    if(req.isAuthenticated() && req.session.redirectURL){
        res.locals.redirectURL=req.session.redirectURL;
       // console.log("Redirect URL saved:", res.locals.redirectURL);
    }
    next();
};  