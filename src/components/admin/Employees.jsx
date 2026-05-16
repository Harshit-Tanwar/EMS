import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const deptColors = {
    Engineering: 'bg-indigo-600',
    Design: 'bg-pink-600',
    Infrastructure: 'bg-sky-600',
    Quality: 'bg-amber-500',
}

const Employees = () => {
    const [userData] = useContext(AuthContext)

    if (!userData) return null

    return (
        <div className='p-4 sm:p-6'>
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-white'>Employees</h2>
                <span className='text-xs text-gray-400 bg-[#1a1a24] border border-white/5 px-3 py-1.5 rounded-xl'>
                    {userData.length} total
                </span>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {userData.map(emp => {
                    const initials = `${emp.firstName[0]}${emp.lastName?.[0] || ''}`.toUpperCase()
                    const deptColor = deptColors[emp.department] || 'bg-gray-600'
                    const totalTasks = (emp.taskCounts?.active || 0) + (emp.taskCounts?.completed || 0) + (emp.taskCounts?.failed || 0) + (emp.taskCounts?.newTask || 0)
                    const completionRate = totalTasks > 0 ? Math.round(((emp.taskCounts?.completed || 0) / totalTasks) * 100) : 0

                    return (
                        <div key={emp.id} className='bg-[#1a1a24] border border-white/5 rounded-2xl p-5'>
                            <div className='flex items-start gap-4'>
                                <div className={`w-12 h-12 rounded-2xl ${deptColor} flex items-center justify-center text-lg font-bold text-white shrink-0`}>
                                    {initials}
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <h3 className='text-base font-semibold text-white'>{emp.firstName} {emp.lastName}</h3>
                                    <p className='text-xs text-indigo-400'>{emp.role}</p>
                                    <p className='text-xs text-gray-500 mt-0.5'>{emp.department}</p>
                                </div>
                            </div>

                            <div className='mt-4 grid grid-cols-2 gap-3'>
                                <div className='bg-[#0f0f13] rounded-xl p-3'>
                                    <p className='text-xs text-gray-400'>Email</p>
                                    <p className='text-xs text-white mt-0.5 truncate'>{emp.email}</p>
                                </div>
                                <div className='bg-[#0f0f13] rounded-xl p-3'>
                                    <p className='text-xs text-gray-400'>Phone</p>
                                    <p className='text-xs text-white mt-0.5'>{emp.phone || '—'}</p>
                                </div>
                                <div className='bg-[#0f0f13] rounded-xl p-3'>
                                    <p className='text-xs text-gray-400'>Joined</p>
                                    <p className='text-xs text-white mt-0.5'>{emp.joinDate}</p>
                                </div>
                                <div className='bg-[#0f0f13] rounded-xl p-3'>
                                    <p className='text-xs text-gray-400'>Task Completion</p>
                                    <p className='text-xs text-white mt-0.5'>{completionRate}%</p>
                                </div>
                            </div>

                            {/* Task bar */}
                            <div className='mt-4'>
                                <div className='flex justify-between text-xs text-gray-400 mb-1'>
                                    <span>Tasks</span>
                                    <span>{emp.taskCounts?.completed || 0}/{totalTasks} completed</span>
                                </div>
                                <div className='w-full bg-[#0f0f13] rounded-full h-1.5'>
                                    <div
                                        className='bg-emerald-500 h-1.5 rounded-full transition-all'
                                        style={{ width: `${completionRate}%` }}
                                    />
                                </div>
                            </div>

                            {/* Leave balance */}
                            <div className='mt-4 flex gap-2'>
                                <span className='text-xs bg-sky-600 text-white px-2 py-1 rounded-lg'>Sick: {emp.leaveBalance?.sick ?? '—'}</span>
                                <span className='text-xs bg-indigo-600 text-white px-2 py-1 rounded-lg'>Casual: {emp.leaveBalance?.casual ?? '—'}</span>
                                <span className='text-xs bg-emerald-600 text-white px-2 py-1 rounded-lg'>Earned: {emp.leaveBalance?.earned ?? '—'}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Employees
