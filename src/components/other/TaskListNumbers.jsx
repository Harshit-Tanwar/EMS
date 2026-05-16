import React from 'react'

const TaskListNumbers = ({data}) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 mt-6 sm:mt-10 gap-3 sm:gap-5'>
        <div className='rounded-2xl py-5 px-6 sm:py-6 sm:px-9 bg-sky-600'>
            <h2 className='text-2xl sm:text-3xl font-bold text-white'>{data.taskCounts.newTask}</h2>
            <h3 className='text-sm sm:text-base mt-1 font-medium text-white'>New Tasks</h3>
        </div>
        <div className='rounded-2xl py-5 px-6 sm:py-6 sm:px-9 bg-emerald-600'>
            <h2 className='text-2xl sm:text-3xl font-bold text-white'>{data.taskCounts.completed}</h2>
            <h3 className='text-sm sm:text-base mt-1 font-medium text-white'>Completed</h3>
        </div>
        <div className='rounded-2xl py-5 px-6 sm:py-6 sm:px-9 bg-amber-500'>
            <h2 className='text-2xl sm:text-3xl font-bold text-white'>{data.taskCounts.active}</h2>
            <h3 className='text-sm sm:text-base mt-1 font-medium text-white'>In Progress</h3>
        </div>
        <div className='rounded-2xl py-5 px-6 sm:py-6 sm:px-9 bg-rose-600'>
            <h2 className='text-2xl sm:text-3xl font-bold text-white'>{data.taskCounts.failed}</h2>
            <h3 className='text-sm sm:text-base mt-1 font-medium text-white'>Failed</h3>
        </div>
    </div>
  )
}

export default TaskListNumbers