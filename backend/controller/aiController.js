import {GoogleGenAI} from '@google/genai';
import Note from '../models/noteModel.js';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Summarize the note content using Google Gemini AI
export const summarizeNote = async (req, res) => {
  try {
    const { noteId } = req.params;
   
    //1. fetch the note from the database using the provided noteId
    const note = await Note.findOne({_id: noteId , userId: req.userId});

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    //2. call gemini
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: `Summarize the following note in a concise manner:\n\n${note.content}`,
      config:{
          maxOutputTokens: 100,
      }
     
    });
    return res.json({success:true, summary: response.text });

}catch(error){
    
    return res.status(500).json({ message: 'Ai processing failed.', error: error.message });
}

}

//Auto-tagging (structed JSON ARRAY)
export const autoTagNote = async (req, res) =>{
  try {
    const {noteId} = req.params;
    const note = await Note.findOne({_id: noteId , userId: req.userId});
    if(!note){
      return res.status(404).json({message:'Note not found or unauthorized!!!', success:'false'})
    }

    const textToAnalyze = note.content || '';
    if(!textToAnalyze.trim()){
      return res.status(400).json({message:'Cannot tag an empty note! , success:false'})
    }
    const response = await ai.models.generateContent({
      model:'gemini-3.5-flash-lite',
      contents:`Analyze this note adn suggest 3 to 5 highly relevant one-word tags or categories:\n\n${textToAnalyze}`,
      config:{
        responseMimeType:'application/json',
        responseSchema:{
          type:'ARRAY',
          items:{type:"STRING"}
        }
      }
    });
    const tags = JSON.parse(response.text);
    // Atomic update avoids Mongoose VersionError (__v) conflicts
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, userId: req.userId },
      { $set: { tags } },
      { returnDocument: 'after' }
    );
    return res.status(200).json({success:true , tags})    
  } catch (error) {
    console.error('Tagging Error:', error)
    return res.status(500).json({message:'AI tagggin failed.', error: error.message})
  }
}

//Persistant storage (save summary to database)
export const saveNoteSummary = async (req, res) =>{
  try {
    const {noteId} = req.params;
    const {summary} = req.body;
   
    if(!summary){
      return res.status(400).json({message:'Summary text is required!!!', success:false})
    }
    const note = await Note.findOne({_id: noteId , userId: req.userId});
    if(!note ){
      return res.status(404).json({message:'Note not found or unauthorized!!!', success:'false'})
    }

    
    
    note.summary = summary;
    await note.save();
    return res.status(200).json({message:'Summary saved successfully!',success:true , summary})    
  } catch (error) {
    console.error('Save Summary Error:', error)
    return res.status(500).json({message:'Failed to save summary.', error: error.message})
  }
}

//chat with a single note or all saved notes
export const chatWithNotes = async (req , res) =>{
  try {
    const {message , history=[], noteId} = req.body;
    if(!message || !message.trim()) {
      return res.status(400).json({success:false,message:'Message is required!'})
    }
  } catch (error) {
    
  }
}