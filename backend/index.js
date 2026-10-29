import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoute from './routes/userRouter.js';
import noteRoute from './routes/noteRouter.js'
import cors from 'cors'



const app = express();

//middleware
const allowedOrigins = ['http://localhost:5173','https://note-app-ui-six.vercel.app/']
app.use(cors({
    origin:allowedOrigins,
    credentials:true,
}
));
app.use(bodyParser.json())
dotenv.config();

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



