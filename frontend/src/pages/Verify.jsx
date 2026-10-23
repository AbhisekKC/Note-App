import React from 'react'
import {Link , useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useState , useEffect} from 'react';
import {userApi} from '@/api/axios';

function Verify() {
  const navigate = useNavigate();
  const {token} = useParams();
  const [status, setStatus] = useState('Verifying your email...');
  const [verified, setVerified] = useState(false);

  useEffect(()=>{
    const verifyEmail = async () => {
        try{
            const response = await userApi.post(`/verify`,{},{
                headers: {
                    
                    'Authorization': `Bearer ${token}`
            }});
            if(response.data.success){
                setStatus('✅ Email Verified successfully.')
                setTimeout(()=>{navigate('/login')},2000);
            }
            else{
                setStatus('❌ Invalid or expired token. Please try again.');
            }


        }catch(error){
            console.error('Error during email verification:', error);
            setStatus('❌ Verification failed. Please try again.');
        }

  }
        verifyEmail();
},[token])


  return (
    <div className='relative w-full h-760px bg-green-200 overflow-hidden'>
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
                <h1 className='text-3xl font-bold text-green-700 mb-4'>Verify Your Email ✅</h1>
                <h2 className='text-xl font-semibold text-gray-800'>{status}</h2>

                </div>
        </div>
        
    </div>
  )
}

export default Verify