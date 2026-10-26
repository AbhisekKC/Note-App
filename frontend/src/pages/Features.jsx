import React from 'react'
import WeatherCard from '@/components/WeatherCard'

function Features() {

    const coreFeatures = [
        {
            title: 'Cloud Sync.',
            description:'Access your notes securely from any device, anytime. Powered by robust MongoDB and cloud database.'
        },
        {
            title:'Rich Text Editing',
            description:'Format  you thoughts effortlessly with markdown support , headings , lists and code blocks.'
        },
        {
            title:'Instant search',
            description:'Find exactly what you need in milliseconds with powerful full-text indexing and tags.'
        },
        {
            title:'Organized Workspace',
            description:'Keep your ideas structured using customizable folders, multi-tag filtering.'
        },
        {
            title:'System Administration & Access Control Panel',
            description:'A robust, centralized control center built to monitor real-time MERN stack application metrics and securely manage global user authentication paradigms. This dashboard serves as the administrative core for overriding user states and defending platform architecture parameters.'
        }
    ]

    const securityFeatures = [
        {
            title:'Bcrypt Password Hashing.',
            description:'Your passwords are never stored in plain text. We use heavily salted, industy-standard bcrypt configurations on our database layers.'

        },
        {
            title:'Secure JWT Authentication.',
            description:'Your session is fully secured using JSON Web Tokens, utilizing protected HTTP-only cookies or authorization headers.'
        },
        {
            title:'Email Verification.',
            description:'Account security is verified right from the start with mandatory activation links sent straight to you inbox.'
        },
        {
            title:'OTP Password Recovery.',
            description:'Locked out? Safely reset you password using a time-sensitive One-Time Password sent to you verified email.'
        },
        {
            title:'One-Click Google Login.',
            description:'Skip the password entirely. Instantly sign up or log in securely using your existing Google account.'
        }
    ]

  return (
    <div className='max-w-7xl mx-auto px-4 py-16 text-center bg-linear-to-l from-green-200 to green-800'>
        <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
            Product Features
        </h1>
        <p className='mt-4 max-w-2xl mx-auto text-xl text-gray-500'>
            Everything you need to capture ideas, organize you mind, and protect your workspace.
        </p>
        
        {/* Core Workspace Features */ }
        <div className='mt-16'>
            <h2 className="text-2xl font-bold text-gray-800 text-left border-b pb-2 mb-6">
                📝 Workspace & Organization
            </h2>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {
                    coreFeatures.map((feature, index) =>(
                        <div key={index} className='p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition:shadow text-left'>
                            <h3 className='text-lg font-bold text-green-600 mb-2'>{feature.title}</h3>
                            <p className='text-sm text-gray-600 leading-relaxed'>{feature.description}</p>

                        </div>
                    ))
                }
            </div>

        </div>

        {/* Security and Authentication features */ }
        <div className='mt-16'>
            <h2 className="text-2xl font-bold text-gray-800 text-left border-b pb-2 mb-6">
                🔒 Authentication & Security
            </h2>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {
                    securityFeatures.map((feature, index) =>(
                        <div key={index} className='p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition:shadow text-left'>
                            <h3 className='text-lg font-bold text-green-600 mb-2'>{feature.title}</h3>
                            <p className='text-sm text-gray-600 leading-relaxed'>{feature.description}</p>

                        </div>
                    ))
                }
            </div>

        </div>
        {/* 🚀 2. NEW LIVE UTILITIES SECTION */}
        <div className='mt-16'>
            <h2 className="text-2xl font-bold text-gray-800 text-left border-b pb-2 mb-6">
                🌤️ Integrated Workspace Utilities
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 text-left shadow-sm">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-green-600 mb-2">Live Weather Workspace Widget</h3>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
                        Plan your day outside the screen. Our fully reactive microservice hooks up to OpenWeather coordinates to extract temperature parameters, local environmental conditions, and localized forecast models in real-time.
                    </p>
                </div>
                <div className="shrink-0 w-full sm:w-auto flex justify-center">
                    <WeatherCard />
                </div>
            </div>
        </div>


        
    </div>
  )
}

export default Features