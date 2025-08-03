import express from 'express'

export const userRouter = express.Router()

userRouter.post('/signup',(req,res)=>{
    console.log('signup');
    res.json({message:'signup'})
})
userRouter.post('/login',(req,res)=>{
    console.log('login');
    res.json({message:'login'})
})
userRouter.post('/logout',(req,res)=>{
    console.log('logout');
    res.json({message:'logout'})
})
userRouter.get('/verify',(req,res)=>{
    console.log('verify token');
    res.json({message:'verify'})
    
})
userRouter.post('/resend-verification',(req,res)=>{
    console.log('resend-verification');
    res.json({message:'resend-verification'})
    
})
userRouter.get('/me',(req,res)=>{
    console.log('me');
    res.json({message:'me'})
})