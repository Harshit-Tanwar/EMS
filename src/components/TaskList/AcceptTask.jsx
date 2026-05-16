import React from 'react'

const AcceptTask = ({data}) => {
    console.log();
  return (
    <div className='flex-shrink-0 h-full w-[260px] sm:w-[300px] p-4 sm:p-5 bg-slate-600 rounded-2xl shadow-lg'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-amber-700 text-white text-xs font-semibold px-3 py-1 rounded-lg'>{data.category}</h3>
                <h4 className='text-xs text-amber-100'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-5 text-xl font-semibold text-white'>{data.taskTitle}</h2>
            <p className='text-sm mt-2 text-amber-100 leading-relaxed'>
                {data.taskDescription}
            </p>
            <div className='flex justify-between mt-6 gap-2'>
                <button className='flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold py-2 px-2 text-xs transition-colors'>Mark Complete</button>
                <button className='flex-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold py-2 px-2 text-xs transition-colors'>Mark Failed</button>
            </div>
        </div>
  )
}

export default AcceptTask