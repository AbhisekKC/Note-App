import Note from '../models/noteModel.js';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

// admin controllers.

// user registry management system:

//get all users

export const getAllUsers = async (req, res) => {
    try{
        const users = await User.find().sort({ createdAt: -1 }).select('-password');
        return res.status(200).json({message:'ALL users fetched successfully', success:true, users})

    }
    catch(error){
        return res.status(500).json({message:error.message, success:false})
    }
}

//create a new user

export const createUser = async (req, res) => {
    const {username, email , password, role} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'User already exists', success:false})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({username, email, password: hashedPassword, role});
        return res.status(201).json({message:'User created successfully', success:true, user})
    }
    catch(error){
        return res.status(500).json({message:error.message, success:false})
    }
}

// update user

export const updateUser = async (req, res)=>{
    const {username , email , role } = req.body;
    const {id} = req.params;
    try{
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message:'User not found', success:false})
        }
        if(username) user.username = username;
        if(email) user.email = email;
        if(role) user.role = role;

        const updatedUser = await user.save();
        return res.status(200).json({message:'User updated successfully', success:true, user:updatedUser})
    }
    catch(error){
        return res.status(500).json({message:error.message, success:false})
    }
}

// delete user

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message:'User not found', success:false})
        }
        // deletes the user and all the notes associated with the user.
        await Note.deleteMany({userId: user._id});
        await user.deleteOne();
        return res.status(200).json({message:'User deleted successfully', success:true})
    }
    catch(error){
        return res.status(500).json({message:error.message, success:false})
    }
}

// verify user

export const verifyUser = async (req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message:'User not found', success:false})
        }
        user.isVerified = true;
        await user.save();
        return res.status(200).json({message:'User verified successfully', success:true, user})
    }
    catch(error){
        return res.status(500).json({message:error.message, success:false})
    }
}


// global note management system:

// get all notes

export const getAllNotes = async (req, res) => {
    try{
        const notes = await Note.find().sort({ createdAt: -1 });
        return res.status(200).json({message:'ALL notes fetched successfully', success:true, notes})
    }
    catch(error){
        return res.status(500).json({message:error.message, success:false})
    }
}

// delete a note

export const deleteNote = async (req, res)=> {
    const {id} = req.params;
    try{
        const note = await Note.findById(id);
        if(!note){
            return res.status(404).json({message:'Note not found', success:false})
        }
        await note.deleteOne();
        return res.status(200).json({message:'Note deleted successfully', success:true})
    }
    catch(error){
        return res.status(500).json({message:error.message, success:false})
    }
}