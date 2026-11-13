import React from 'react';

export default function AdminSkeleton() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-pulse">
      
      {/* 2. Top 3 Metric Cards Skeleton (Total Users, Total Notes, Active Admins) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between"
          >
            <div className="space-y-3 w-full">
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
              <div className="h-8 w-16 bg-gray-300 rounded"></div>
            </div>
            <div className="h-12 w-12 bg-gray-200 rounded-lg shrink-0"></div>
          </div>
        ))}
      </div>

      {/* 3. System User Registry Table Skeleton */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Section Title */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="h-6 w-48 bg-gray-300 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>

        {/* Table Header Bar */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 grid grid-cols-5 gap-4">
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
          <div className="h-4 w-24 bg-gray-300 rounded hidden sm:block"></div>
          <div className="h-4 w-16 bg-gray-300 rounded ml-auto"></div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              className="px-6 py-4 grid grid-cols-2 sm:grid-cols-5 items-center gap-4"
            >
              {/* User Info (Avatar + Username + Email) */}
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gray-200 shrink-0"></div>
                <div className="space-y-1.5 w-full">
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Role Badge */}
              <div className="hidden sm:block">
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
              </div>

              {/* Verified Status */}
              <div className="hidden sm:block">
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
              </div>

              {/* Created At Date */}
              <div className="hidden sm:block">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>

              {/* Edit & Delete Buttons */}
              <div className="flex items-center justify-end gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Notes Management Section Skeleton */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
        {/* Section Header + Search Input */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="h-6 w-44 bg-gray-300 rounded"></div>
          <div className="h-10 w-full sm:w-72 bg-gray-200 rounded-md"></div>
        </div>

        {/* Notes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((note) => (
            <div
              key={note}
              className="p-4 rounded-lg border border-gray-200 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="h-5 w-1/2 bg-gray-300 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 rounded"></div>
                <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
                <div className="h-7 w-7 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
