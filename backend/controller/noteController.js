import Note from "../models/noteModel.js";

//1.Create a new note

export const createNote = async(req, res) =>{
    try {
        const {title , content } = req.body;
        if(!title || !content) {
            return res.status(400).json({message:'Title and content are required!!!!', success:false})
        }
        const newNote = await Note.create({
            userId: req.userId, // Provided by isAuthenticated middleware
            title:title,
            content:content
        })
        return res.status(200).json({message:'Note created successfully', success:true , note: newNote})
        
    } catch (error) {
        return res.status(500).json({message:error.message , success:false})
    }
}

//2.Read (get all the notes when the user logs in)

export const getNotes = async (req, res) =>{
   try {
      const notes = await Note.find({userId:req.userId}).sort({createdAt:-1});
      return res.status(200).json({message:'Notes are here!!',success:true, notes})
    
   } catch (error) {
     return res.status(400).json({message:error.message, success:false})
   }

}

//3.Update an existing note

export const updateNote = async ( req, res)=> {
    try {
        const {id} = req.params;
        const {title , content} = req.body;

        //find note and ensure it belongs to the logged-in user
        const note = await Note.findOne({_id: id, userId: req.userId});
        if(!note){
            return res.status(404).json({message:'Note not found or unauthorized', success:false})
        }

        if(title) note.title =title;
        if(content) note.content = content;
        await note.save();
        return res.status(200).json({message:'Note updated succesfully', success:true, note})        
    } catch (error) {
        return res.status(400).json({message:error.message, success:false})
    }
}

//4.Delete a note.

export const deleteNote = async (req, res)=> {
    try {
        const {id} = req.params;

        const note = await Note.findOneAndDelete({_id:id, userId: req.userId});
        if(!note){
            return res.status(404).json({message:'Note not found or unauthorized', success:false})
        }
        
        return res.status(200).json({message:'Note deleted successfully', success:true})
    } catch (error) {
         return res.status(400).json({message:error.message, success:true})
    }
}