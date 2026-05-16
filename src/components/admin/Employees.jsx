import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const deptColor = {
    Engineering:    'bg-indigo-100 text-indigo-700',
    Design:         'bg-pink-100 text-pink-700',
    Infrastructure: 'bg-sky-100 text-sky-700',
    Quality:        'bg-amber-100 text-amber-700',
}

const Employees = () => {
    const [userData] = useContext(AuthContext)
    if (!userData) return null

    return (
        <div className='p-4 sm:p-6'>
            <div className='flex items-center justify-between mb-5'>
                <h2 className='text-lg font-bold text-slate-800'>Employees</h2>
                <span className='text-xs text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm'>
                    {userData.length} total
                </span>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {userData.map(emp => {
                    const initials   = `${emp.firstName[0]}${emp.lastName?.[0] || ''}`.toUpperCase()
                    const dc         = deptColor[emp.department] || 'bg-slate-100 text-slate-600'
                    const total      = Object.values(emp.taskCounts || {}).reduce((a, b) => a + b, 0)
                    const done       = emp.taskCounts?.completed || 0
                    const rate       = total > 0 ? Math.round((done / total) * 100) : 0

                    return (
                        <div key={emp.id} className='bg-white border border-slate-200 rounded-2xl p-5 shadow-sm'>
                            <div className='flex items-start gap-4 mb-4'>
                                <div className={`w-11 h-11 rounded-2xl ${dc} flex items-center justify-center text-base font-bold shrink-0`}>
                                    {initials}
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <h3 className='text-sm font-bold text-slate-800'>{emp.firstName} {emp.lastName}</h3>
                                    <p className='text-xs text-indigo-600'>{emp.role}</p>
                                    <p className='text-xs text-slate-400 mt-0.5'>{emp.department}</p>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-2 mb-4'>
                                {[
                                    { label: 'Email',   value: emp.email,    truncate: true },
                                    { label: 'Phone',   value: emp.phone || '—' },
                                    { label: 'Joined',  value: emp.joinDate },
                                    { label: 'Completion', value: `${rate}%` },
                                ].map(item => (
                                    <div key={item.label} className='bg-slate-50 rounded-xl p-3'>
                                        <p className='text-xs text-slate-400'>{item.label}</p>
                                        <p className={`text-xs font-medium text-slate-700 mt-0.5 ${item.truncate ? 'truncate' : ''}`}>{item.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Progress bar */}
                            <div className='mb-4'>
                                <div className='flex justify-between text-xs text-slate-400 mb-1.5'>
                                    <span>Task progress</span>
                                    <span>{done}/{total}</span>
                                </div>
                                <div className='w-full bg-slate-100 rounded-full h-1.5'>
                                    <div className='bg-emerald-500 h-1.5 rounded-full transition-all' style={{ width: `${rate}%` }} />
                                </div>
                            </div>

                            {/* Leave balance */}
                            <div className='flex gap-2 flex-wrap'>
                                <span className='text-xs bg-sky-50 text-sky-600 border border-sky-100 px-2 py-1 rounded-lg'>Sick: {emp.leaveBalance?.sick ?? '—'}</span>
                                <span className='text-xs bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-1 rounded-lg'>Casual: {emp.leaveBalance?.casual ?? '—'}</span>
                                <span className='text-xs bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-1 rounded-lg'>Earned: {emp.leaveBalance?.earned ?? '—'}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Employees
