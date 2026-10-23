import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users',
    }
} ,{timestamps:true}
)

export default mongoose.model('Sessions', sessionSchema)