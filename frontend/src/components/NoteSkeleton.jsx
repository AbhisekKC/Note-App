import React from 'react'

function NoteSkeleton({ count = 6 }) {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 h-full w-full p-2'>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index}
                    className='bg-white border border-slate-200 rounded-xl p-4 pr-6 shadow-sm flex flex-col justify-between animate-pulse'>
                    <div>
                        {/* Title Skeleton (matches h2) */}
                        <div className='space-y-2'>
                            <div className='h-5 bg-slate-200 rounded-md w-3/4'></div>
                        </div>
                        {/* "Your notes" Callout Box Skeleton */}
                        <div className='border rounded-lg border-indigo-100 border-l-4 border-l-green-300 mt-3 p-3 space-y-2'>
                            <div className='h-2.5 bg-green-200 rounded w-20 mb-2'></div>
                            <div className='h-3 bg-slate-200 rounded w-full'></div>
                            <div className='h-3 bg-slate-200 rounded w-5/6'></div>
                            <div className='h-3 bg-slate-200 rounded w-2/3'></div>
                        </div>
                        {/* "AI Summary" Callout Box Skeleton */}
                        <div className='mt-3 p-3 bg-indigo-50/40 border border-indigo-100 border-l-4 border-l-indigo-300 rounded-lg space-y-2'>
                            <div className='h-2.5 bg-indigo-200 rounded w-20 mb-2'></div>
                            <div className='h-2.5 bg-slate-200 rounded w-full'></div>
                            <div className='h-2.5 bg-slate-200 rounded w-4/5'></div>
                        </div>

                        {/* AI Tags Pill List Skeleton */}
                        <div className='flex flex-wrap gap-1.5 mt-3'>
                            <div className='h-5 bg-slate-100 border border-slate-200 rounded-full w-14'></div>
                            <div className='h-5 bg-slate-100 border border-slate-200 rounded-full w-16'></div>
                            <div className='h-5 bg-slate-100 border border-slate-200 rounded-full w-12'></div>
                        </div>
                    </div>

                    {/* Footer: Created/Updated Dates & Action Buttons Skeleton */}
                    <div className='mt-4 flex justify-between items-center border-t border-slate-100 pt-2'>
                        <div className='flex flex-col gap-1.5'>
                            <div className='h-3 bg-slate-200 rounded w-28'></div>
                            <div className='h-3 bg-slate-200 rounded w-28'></div>
                        </div>

                        <div className='flex justify-end gap-2'>
                            <div className='h-8 w-12 bg-indigo-50 rounded-md'></div>
                            <div className='h-8 w-12 bg-green-50 rounded-md'></div>
                            <div className='h-8 w-14 bg-rose-50 rounded-md'></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default NoteSkeleton
