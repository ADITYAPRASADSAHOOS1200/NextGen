import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import userRouter from './src/routes/User.routes.js'
import { errormiddleWare } from './src/Middeware/error.middleware.js'
import courseRouter from './src/routes/Course.router.js'
import paymentRouter from './src/routes/Payment.router.js'
import MiscRouter  from './src/routes/Miscllenaeous.router.js'

const app=express()

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/ping',function(req,res){  res.end('/pong')  })

app.use('/api/v1/user',userRouter)

app.use('/api/v1/course',courseRouter)

app.use('/api/v1/payment ',paymentRouter)

app.all('*',function(req,res){
    res.end(404).status.send('oops!! 404 PageNot FOund!!')
})

app.use(errormiddleWare)
app.use(morgan('dev'))


app.use('/api/v1/admin',MiscRouter)


export default app