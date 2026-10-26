import React from 'react'
import { BookOpen } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// brand icons
import { faGithub, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
// utility icons
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='w-full bg-linear-to-l from-green-200 to-white border-t border-slate-200 mt-auto py-6 px-4 text-slate-600 font-sans shadow-inner z-40 shrink-0'>
      <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6'>
        
        {/* LOGO and COPYRIGHTS */}
        <div className='flex flex-col items-center md:items-start gap-1'>
          <Link to='/' className='flex gap-2 items-center hover:opacity-90 transition-opacity'>
            <BookOpen className='h-5 w-5 text-green-700' />
            <span className='font-bold text-slate-900'><span className='text-green-600'>Notes</span>App</span>
          </Link>
          <p className='text-xs text-slate-500'>
            &copy; {currentYear} NotesApp Inc. All rights reserved.
          </p>
        </div>

        {/* Social brand links */}
        <div className='flex items-center justify-center gap-6 text-slate-500 text-lg'>
          <a href='https://github.com/AbhisekKC' target='_blank' rel='noreferrer' className='hover:text-slate-900 transition-colors'>
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href='https://x.com/abseekksee' target='_blank' rel='noreferrer' className='hover:text-sky-500 transition-colors'>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href='https://www.facebook.com/abseek.ksee/' target='_blank' rel='noreferrer' className='hover:text-blue-600 transition-colors'>
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href='https://google.com' target='_blank' rel='noreferrer' className='hover:text-green-600 transition-colors'>
            <FontAwesomeIcon icon={faGlobe} />
          </a>
        </div>

      </div>
    </footer>
  )
}

export default Footer
