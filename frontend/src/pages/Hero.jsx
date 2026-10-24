import React from 'react'
import { ArrowRight, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@base-ui/react/button'
import { useNavigate } from 'react-router-dom'
import { getData } from '@/context/userContext'
import WeatherCard from '@/components/WeatherCard'

function Hero() {
    // 1. Safe extraction check: ensure we handle undefined/null hook returns safely
    const contextData = getData();
    const user = contextData?.user || null;
    
    const navigate = useNavigate();

    // 2. Derive the username with absolute safety before hitting the JSX layer
    const name = user && typeof user === 'object' && 'username' in user 
        ? user.username 
        : 'Guest';
    const displayUsername = name.toUpperCase()

    return (
        <div className='relative w-full md:h-175 h-screen bg-green-50 overflow-hidden'>
            
            <section className='w-full py-5 md:py-10 lg:py-10 xl:py-20'>
                <div className='max-w-7xl mx-auto px-4 md:px-6'>
                    <div className='flex flex-col items-center space-y-1 text-center'>
                        {/* Weather app */}
                        <WeatherCard />
                        
                        {/* SAFE RENDER: Uses the pre-verified safe string parameter */}
                        <h1 className="text-xl font-medium text-slate-700 tracking-tight">
                            Welcome, <span className="text-green-600 font-semibold">{displayUsername}</span>
                        </h1>
                        
                        <div className='space-y-2'>
                            <Badge variant='primary' className='mb-4 text-green-800 border-green-200'>
                                <Zap className='w-3 h-3 mr-1'/>
                                New: Note organization with Cloud save..
                            </Badge>
                            <h1 className='text-green-600 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>
                                Your thoughts, organized and accessible
                                <span className='text-gray-800'> everywhere</span>
                            </h1>
                            <p className='mx-auto max-w-175 text-muted-foreground md:text-xl'>
                                Capture ideas, organize thoughts, and collaborate seamlessly. The modern note-tracking app that grows with you and keeps your ideas secure in the cloud.
                            </p>
                        </div>
                        
                        <div className='space-x-4 flex flex-row pt-2'>
                            <Button 
                               onClick={() => navigate(user ? '/to-notes' : '/login')}
                               size='lg'
                               className='flex items-center h-12 px-8 relative bg-green-600 border-3 border-gray-600 text-white rounded-md cursor-pointer hover:bg-green-700 transition-colors shadow-sm font-medium text-sm'>
                                Start Taking Notes
                                <ArrowRight className='ml-2 h-4 w-4' />
                            </Button>
                            {/* Maybe for future purposes
                            <Button variant='outline' size='lg' className='h-12 px-8 rounded-md bg-white text-gray-600 border-3 border-green-600 cursor-pointer hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm'>
                                Watch Demo
                            </Button>  */}
                            
                        </div>
                                              
                        <p className='text-sm text-green-800 pt-4 font-medium'>
                            Free forever + No credit card required + 2 minutes setup
                        </p>
                        

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero;
