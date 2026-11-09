import express from 'express';
import {getAllUsers , createUser , updateUser, deleteUser , verifyUser, getAllNotes, deleteNote } from '../controller/adminController.js'


const router = express.Router()
// admin to control user
router.get('/all-users', getAllUsers)
router.post('/create-user', createUser)
router.put('/update-user/:id', updateUser)
router.delete('/delete-user/:id', deleteUser)
router.patch('/verify-user/:id', verifyUser)

//admin to control notes
router.get('/all-notes', getAllNotes)
router.delete('/delete-note/:id', deleteNote)

export default router