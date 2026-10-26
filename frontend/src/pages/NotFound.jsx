import React from 'react'
import { Link } from 'react-router-dom'
import { BookX } from 'lucide-react'
function NotFound() {
  return (
    <div className='bg-linear-to-l from-green-200 to green-800 flex flex-col items-center justify-center flex-1 min-h-[60vh] text-center px-4 font-sans select-none'>

        {/*Visual indicator*/}
        <div className='bg-white p-4 rounded-full shadow-sm border border-slate-100 mb-4 animate-bounce'>
            <BookX className='h-12 w-12 text-rose-500' />
        </div>
        
        {/*Error message*/}
        <h1 className='tex-4xl font-extrabold text-slate-400 tracking-tight mb-2'>404</h1>
        <h2 className='text-xl font-bold text-slate-800 mb-2'>OOOPS! Page Not Found.</h2>
        <p className='text-slate-500 text-sm max-w-sm mb-6'>
            We couldn't find the page you're looking for. It might have been moved, deleted or never existed!!
        </p>

        {/*Navigation Redirect*/}
        <Link to='/' className='bg-green-600 hover:bg-green-500 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all shadow-xl shadow-red-200'>
           Back to Safety(Home)!
        </Link>

    </div>
  )
}

export default NotFound