import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const statusColors = { present: 'bg-emerald-600', absent: 'bg-rose-600', late: 'bg-amber-500' }
const statusText = { present: 'Present', absent: 'Absent', late: 'Late' }

const AdminAttendance = () => {
    const [userData] = useContext(AuthContext)

    if (!userData) return null

    return (
        <div className='p-4 sm:p-6'>
            <h2 className='text-xl font-bold text-white mb-6'>Attendance Overview</h2>

            <div className='flex flex-col gap-5'>
                {userData.map(emp => {
                    const history = emp.attendance || []
                    const present = history.filter(a => a.status === 'present').length
                    const late = history.filter(a => a.status === 'late').length
                    const absent = history.filter(a => a.status === 'absent').length
                    const todayRecord = emp.todayAttendance

                    return (
                        <div key={emp.id} className='bg-[#1a1a24] border border-white/5 rounded-2xl overflow-hidden'>
                            {/* Employee header */}
                            <div className='flex items-center justify-between px-5 py-4 border-b border-white/5'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-sm font-bold text-white shrink-0'>
                                        {emp.firstName[0]}{emp.lastName?.[0] || ''}
                                    </div>
                                    <div>
                                        <p className='text-sm font-semibold text-white'>{emp.firstName} {emp.lastName}</p>
                                        <p className='text-xs text-gray-400'>{emp.role}</p>
                                    </div>
                                </div>
                                <div className='flex gap-3 text-center'>
                                    <div>
                                        <p className='text-sm font-bold text-emerald-400'>{present}</p>
                                        <p className='text-xs text-gray-400'>Present</p>
                                    </div>
                                    <div>
                                        <p className='text-sm font-bold text-amber-400'>{late}</p>
                                        <p className='text-xs text-gray-400'>Late</p>
                                    </div>
                                    <div>
                                        <p className='text-sm font-bold text-rose-400'>{absent}</p>
                                        <p className='text-xs text-gray-400'>Absent</p>
                                    </div>
                                </div>
                            </div>

                            {/* Today status */}
                            <div className='px-5 py-3 bg-[#0f0f13] flex items-center justify-between'>
                                <p className='text-xs text-gray-400'>Today</p>
                                {todayRecord ? (
                                    <div className='flex items-center gap-3'>
                                        <span className='text-xs text-gray-300'>In: {todayRecord.clockIn}</span>
                                        {todayRecord.clockOut && <span className='text-xs text-gray-300'>Out: {todayRecord.clockOut}</span>}
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${statusColors[todayRecord.status]}`}>
                                            {statusText[todayRecord.status]}
                                        </span>
                                    </div>
                                ) : (
                                    <span className='text-xs text-gray-500'>Not clocked in</span>
                                )}
                            </div>

                            {/* Recent records */}
                            <div className='divide-y divide-white/5'>
                                {history.slice(0, 3).map((record, idx) => (
                                    <div key={idx} className='flex items-center justify-between px-5 py-2.5'>
                                        <p className='text-xs text-gray-400'>{record.date}</p>
                                        <div className='flex items-center gap-3'>
                                            <span className='text-xs text-gray-500'>{record.clockIn ? `In: ${record.clockIn}` : '—'}</span>
                                            <span className='text-xs text-gray-500'>{record.clockOut ? `Out: ${record.clockOut}` : '—'}</span>
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${statusColors[record.status]}`}>
                                                {statusText[record.status]}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminAttendance
