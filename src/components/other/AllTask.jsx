import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {
   const [userData,setUserData] =  useContext(AuthContext)
  return (
    <div className='bg-[#1a1a24] border border-white/5 p-4 sm:p-5 rounded-2xl mt-5 shadow-xl'>
        <h2 className='text-lg font-semibold text-white mb-4'>All Employees</h2>

        {/* Desktop table */}
        <div className='hidden sm:block'>
            <div className='bg-indigo-700 mb-2 py-2.5 px-4 flex justify-between rounded-xl'>
                <h2 className='text-sm font-semibold text-white w-1/5'>Employee Name</h2>
                <h3 className='text-sm font-semibold text-white w-1/5'>New Task</h3>
                <h5 className='text-sm font-semibold text-white w-1/5'>Active Task</h5>
                <h5 className='text-sm font-semibold text-white w-1/5'>Completed</h5>
                <h5 className='text-sm font-semibold text-white w-1/5'>Failed</h5>
            </div>
            {userData.map(function(elem, idx){
                return <div key={idx} className='border border-[#2a2a3a] hover:border-indigo-600 bg-[#1a1a2e] transition-colors mb-2 py-2.5 px-4 flex justify-between rounded-xl'>
                    <h2 className='text-sm font-semibold text-white w-1/5'>{elem.firstName}</h2>
                    <h3 className='text-sm font-medium w-1/5 text-sky-400'>{elem.taskCounts.newTask}</h3>
                    <h5 className='text-sm font-medium w-1/5 text-amber-400'>{elem.taskCounts.active}</h5>
                    <h5 className='text-sm font-medium w-1/5 text-emerald-400'>{elem.taskCounts.completed}</h5>
                    <h5 className='text-sm font-medium w-1/5 text-rose-400'>{elem.taskCounts.failed}</h5>
                </div>
            })}
        </div>

        {/* Mobile cards */}
        <div className='sm:hidden flex flex-col gap-3'>
            {userData.map(function(elem, idx){
                return <div key={idx} className='bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl p-4'>
                    <h2 className='text-base font-semibold text-white mb-3'>{elem.firstName}</h2>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='bg-[#0f0f13] rounded-lg px-3 py-2'>
                            <p className='text-xs text-gray-400'>New</p>
                            <p className='text-sm font-semibold text-sky-400'>{elem.taskCounts.newTask}</p>
                        </div>
                        <div className='bg-[#0f0f13] rounded-lg px-3 py-2'>
                            <p className='text-xs text-gray-400'>Active</p>
                            <p className='text-sm font-semibold text-amber-400'>{elem.taskCounts.active}</p>
                        </div>
                        <div className='bg-[#0f0f13] rounded-lg px-3 py-2'>
                            <p className='text-xs text-gray-400'>Completed</p>
                            <p className='text-sm font-semibold text-emerald-400'>{elem.taskCounts.completed}</p>
                        </div>
                        <div className='bg-[#0f0f13] rounded-lg px-3 py-2'>
                            <p className='text-xs text-gray-400'>Failed</p>
                            <p className='text-sm font-semibold text-rose-400'>{elem.taskCounts.failed}</p>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>
  )
}

export default AllTask