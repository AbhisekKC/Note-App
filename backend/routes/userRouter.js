import express from 'express'
import { googleLogin, registerUser , verifyUser , loginUser, logoutUser ,forgotPassword , verifyOtp , changePassword } from '../controller/userController.js'
import {isAuthenticated} from '../middlewares/isAuthenticated.js' 
import { userSchema , validateUser } from '../validators/userValidators.js'

const router = express.Router()

router.post('/google-login' , googleLogin)

router.post('/register', validateUser(userSchema) , registerUser)

router.post('/verify', verifyUser)

router.post('/login', loginUser)

router.post('/logout', isAuthenticated, logoutUser)

router.post('/forgot-password', forgotPassword)

router.post('/verify-otp/:email', verifyOtp)

router.post('/change-password/:email', changePassword)


export default router