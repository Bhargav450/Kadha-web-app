const express=require('express');
const router =express.Router();
const {ensureAuth,ensureGuest}= require('../middlewares/auth');
const getProfile=require('../controllers/profile');


//@desc Login/Landing page
//@route GET/



router.get('/',ensureGuest,(req,res,next)=>{
    res.render('login', {
        layout: 'login',
    });
})



//@desc Dashboard
//@route GET /dashboard

router.get('/dashboard',ensureAuth,(req,res,next)=>{
    res.render('dashboard', {
        name: req.user.firstName
    });
})


//@desc Profile
//@route GET /dashboard/profile
router.get('/dashboard/profile',getProfile);

module.exports=router;