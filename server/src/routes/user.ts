import express from 'express'
import { PrismaClient } from '@prisma/client';
import { userSignUpSchema, userSignUpSchemaType } from '../zodValidationSchema';
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';
export const userRouter = express.Router()
const prisma = new PrismaClient();
userRouter.post('/signup',async (req,res)=>{
    try {
         // zod validation
    const {success} = userSignUpSchema.safeParse(req.body);
    if(!success){
        res.json({message:"input's are invalid!"}).status(400);
        return;
    }
    const data = req.body as userSignUpSchemaType;
    // check if that person already exists
    const user = await prisma.user.findUnique({
        where:{
            email:data.email
        }
    })
    if(user){
        res.json({message:'User already exists!'}).status(409);
    }
     // hashing password
    const hashedPassword = await bcrypt.hash(data.password,10);
    const verificationToken = uuidv4()
    const tokenExpiry = new Date(Date.now()+15*60*1000);
    const authProvider = 'Email'
    const updatedAt = new Date();
    const lastActive = new Date()
    // create user (store info)
    await prisma.user.create({
        data:{
            name:data.name,
            email:data.email,
            password:hashedPassword,
            verificationToken,
            tokenExpiry,
            authProvider,
            updatedAt,
            lastActive
        }
    })
    // send an email for verification
    await sendNotification(data.email,verificationToken)
    res.json({message:'Verify email sent to this email!'})
    } catch (error) {
        res.json({message:'Internal Server error, try after sometime!'})
        return;
    }
})
userRouter.post('/login',async (req,res)=>{
    // authProvider, name, email, ... based on google auth , TODO: figureout the right schema;
    // formate authProvider : "Email","Google"
    // so either get viaEmail: {details here} , viaGoogle: {details} verify these details via zod
    // const {success} = loginUserSchema.safeParse(req.body)
    // const data = req.body as sometype verification
    const data = {authProvider:'Email',viaEmail:{email:'',password:''},viaGoogle:{name:'',email:''}}
    if(data.authProvider === 'Email'){
        const user = await prisma.user.findUnique({
            where:{
                email:data.viaEmail.email
            }
        })
        if(!user){
            res.json({message:"User doesn't exist"})
            return;
        }
        // password verification
        const verify = bcrypt.compare(data.viaEmail.password,user?.password || "")
        if(!verify){
            res.json({message:"email or password incorrect!"})
            return;
        }
        // add cookie and let them login
        const jwtToken = jwt.sign({id:user.id},process.env.JWT_SECRET!);
        res.cookie(process.env.COOKIE_NAME!,jwtToken,{maxAge:60*60*1000,httpOnly:true});
        res.json({message:'logged in!'})
    }
    else{
      // write google data logic to store and send creds
    }
    res.json({message:'login'})
})
userRouter.post('/logout',(req,res)=>{
    console.log('logout');
    res.json({message:'logout'})
})
userRouter.get('/verify',async (req,res)=>{
   try {
    const token = req.query.token
    const userId = req.query.userId as string
    const user = await prisma.user.findUnique({
        where:{
           id:userId
        }
    })
    if(!user || !user.verificationToken){
        res.json({message:'user or token not exists!'})
        return;
    }
    if(user.tokenExpiry && (new Date() >= user.tokenExpiry)){
        res.json({message:'token expired'}).status(427)
        return;
    }
    if(user.verificationToken === token){
        await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                verified:true
            }
        })
        res.send('verified').status(200) // send html say verified
        return;
    }
   } catch (error) {
      res.json({message:'Internal Server error, try after sometime!'})
   }
})
userRouter.post('/resend-verification',(req,res)=>{
    console.log('resend-verification');
    res.json({message:'resend-verification'})
    
})
userRouter.get('/me',(req,res)=>{
    console.log('me');
    res.json({message:'me'})
})

async function sendNotification(email:string,verificationToken:string){
    try {
        
    } catch (error) {
        
    }
}