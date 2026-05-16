import React from 'react'

const FailedTask = ({data}) => {
  return (
    <div className='flex-shrink-0 h-full w-[260px] sm:w-[300px] p-4 sm:p-5 bg-rose-600 rounded-2xl shadow-lg'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-rose-800 text-white text-xs font-semibold px-3 py-1 rounded-lg'>{data.category}</h3>
                <h4 className='text-xs text-rose-100'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-xl font-semibold text-white'>{data.taskTitle}</h2>
            <p className='text-sm mt-2 text-rose-100 leading-relaxed'>
                {data.taskDescription}
            </p>
            <div className='mt-6'>
                <button className='w-full bg-white text-rose-600 rounded-lg font-semibold py-2 px-2 text-xs cursor-default'>✗ Failed</button>
            </div>
        </div>
  )
}

export default FailedTask