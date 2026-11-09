import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
            trim: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Matches the exact string name of your User model
            required: true,
        },
        creator: {
            type: String,
            trim:true,
            required: false,
        },
        summary:{
            type: String,
            default: " ",//new field for saved summaries
        },
        tags:[{type: String }]// new array field for auto-generated tags

        
    },
    { 
        timestamps: true // Automatically creates 'createdAt' and 'updatedAt' fields
    }
);

const Note = mongoose.model('Note', noteSchema);
export default Note;
