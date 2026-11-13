import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoute from './routes/userRouter.js';
import noteRoute from './routes/noteRouter.js'
import adminRoute from './routes/adminRouter.js'
import aiRoute from './routes/aiRoutes.js'
import cors from 'cors'
import ratelimit from 'express-rate-limit'


const app = express();
app.use(bodyParser.json())
dotenv.config();
app.use(cors({
    origin: function (origin , callback){
        callback(null, true)
    },
    credentials:true,
}
));

//middleware
const allowedOrigins = ['http://localhost:5173','https://note-app-ui-six.vercel.app/']

//global rate limiter

const globalLimiter = ratelimit({
    windowMs: 10*60*1000,//10 minutes
    max:100,//limit each IP to 50 requests per windowsMs
    standardHeaders: 'draft-8', // return standard Ratelimit headers
    legacyHeaders:false,
    message:{
        status:429,
        error:'Too many requests, please try again later.'
    }
})
// auth limiter for stict routes such as admins
const authLimiter = ratelimit({
    windowMs:10*60*1000,
    max:5,//5 login requests per windowMs
    message:{
        status:429,
        error:'Too many login attempts, please try again after 15 minutes.'
    }
})

app.use(globalLimiter)




// PORT and MONGOURL
const port = process.env.Port || 8000;
const url = process.env.MONGO_URL ;

//initializing server and connecting database

mongoose.connect(url)
.then(() =>{
    console.log('MongoDB connected successfully!!!');
    app.listen(port , ()=>{
    console.log(`Server is running on port: ${port}`)
} )
})
.catch((err) =>{
    console.log(err)
}
)

app.use('/user' , userRoute)
app.use('/user/note', noteRoute )
app.use('/admin', adminRoute)
app.use('/ai', aiRoute)



