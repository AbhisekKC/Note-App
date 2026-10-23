import * as yup from 'yup'

export const userSchema = yup.object().shape({
    username: yup.string().trim().required('Username is required').min(3, 'Username must be at least 3 characters long'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().trim().required('Password is required').min(4, 'Password must be at least 4 characters long'),

})


export const validateUser = (schema) => async (req, res, next)=>{
    try{
        await schema.validate(req.body)
        next()
    }
    catch(error){
        return res.status(400).json({message:error.message, success:false});
    }
}