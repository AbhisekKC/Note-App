import express from 'express'
import {createNote , getNotes , updateNote , deleteNote} from '../controller/noteController.js'
import {isAuthenticated} from '../middlewares/isAuthenticated.js'

const router = express.Router()

//Apply middlerware to all routes below

router.use(isAuthenticated);

router.post('/create' , createNote);
router.get('/all' , getNotes);
router.put('/update/:id' , updateNote);
router.delete('/delete/:id', deleteNote);

export default router;
