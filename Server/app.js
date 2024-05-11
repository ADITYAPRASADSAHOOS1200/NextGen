import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import userRoutes from './src/routes/User.routes.js'

const app=express()

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/ping',function(req,res){
     res.end('/pong')
})

app.all('*',function(req,res){
    res.end(404).status.send('oops!! 404 PageNot FOund!!')
})

app.use(morgan('dev'))


export  default app