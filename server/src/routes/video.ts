import express from 'express'

export const videoRouter = express.Router()

videoRouter.post('/generate',(req,res)=>{
    console.log('generating video');
    res.json({message:'generate'})
    
})
videoRouter.get('/video/:id',(req,res)=>{
    console.log('get video');
    res.json({message:'video id'})
})