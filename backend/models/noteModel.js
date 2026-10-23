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
    },
    { 
        timestamps: true // Automatically creates 'createdAt' and 'updatedAt' fields
    }
);

const Note = mongoose.model('Note', noteSchema);
export default Note;
