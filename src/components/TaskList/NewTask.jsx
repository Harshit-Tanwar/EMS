import React from 'react'

const NewTask = ({data}) => {
    return (
        <div className='flex-shrink-0 h-full w-[260px] sm:w-[300px] p-4 sm:p-5 bg-sky-700 rounded-2xl shadow-lg'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-sky-900 text-white text-xs font-semibold px-3 py-1 rounded-lg'>{data.category}</h3>
                <h4 className='text-xs text-sky-200'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-xl font-semibold text-white'>{data.taskTitle}</h2>
            <p className='text-sm mt-2 text-sky-100 leading-relaxed'>
                {data.taskDescription}
            </p>
            <div className='mt-6'>
                <button className='w-full bg-white hover:bg-sky-100 text-sky-700 rounded-lg font-semibold py-2 px-2 text-xs transition-colors'>Accept Task</button>
            </div>
        </div>
    )
}

export default NewTask