const getProfile=(req,res,next)=>{
    res.render('profile',{
        name: req.user.firstName,
        email: req.user.email,
        phoneNo:req.user.phonenumber,
        
});

   // res.json('heyy worked..');
}


module.exports = getProfile;