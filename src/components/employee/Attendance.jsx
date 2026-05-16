import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const statusColors = {
    present: 'bg-emerald-600',
    absent: 'bg-rose-600',
    late: 'bg-amber-500',
}
const statusText = {
    present: 'Present',
    absent: 'Absent',
    late: 'Late',
}

const Attendance = ({ data }) => {
    const [userData, setUserData] = useContext(AuthContext)
    const today = new Date().toISOString().split('T')[0]
    const now = new Date().toTimeString().slice(0, 5)

    const employee = userData?.find(e => e.id === data.id)
    const todayRecord = employee?.todayAttendance

    const clockIn = () => {
        const updated = userData.map(e => {
            if (e.id === data.id) {
                return {
                    ...e,
                    todayAttendance: { date: today, clockIn: now, clockOut: null, status: now > '09:15' ? 'late' : 'present' }
                }
            }
            return e
        })
        setUserData(updated)
    }

    const clockOut = () => {
        const updated = userData.map(e => {
            if (e.id === data.id) {
                return {
                    ...e,
                    todayAttendance: { ...e.todayAttendance, clockOut: now },
                    attendance: [e.todayAttendance ? { ...e.todayAttendance, clockOut: now } : null, ...e.attendance].filter(Boolean)
                }
            }
            return e
        })
        setUserData(updated)
    }

    const history = employee?.attendance || []

    const presentDays = history.filter(a => a.status === 'present').length
    const lateDays = history.filter(a => a.status === 'late').length
    const absentDays = history.filter(a => a.status === 'absent').length

    return (
        <div className='p-4 sm:p-6'>
            <h2 className='text-xl font-bold text-white mb-6'>Attendance</h2>

            {/* Today card */}
            <div className='bg-[#1a1a24] border border-white/5 rounded-2xl p-5 mb-6'>
                <div className='flex items-center justify-between flex-wrap gap-4'>
                    <div>
                        <p className='text-xs text-gray-400 uppercase tracking-wider mb-1'>Today — {today}</p>
                        {!todayRecord ? (
                            <p className='text-white font-semibold'>Not clocked in yet</p>
                        ) : (
                            <div className='flex gap-6 mt-1'>
                                <div>
                                    <p className='text-xs text-gray-400'>Clock In</p>
                                    <p className='text-emerald-400 font-bold text-lg'>{todayRecord.clockIn}</p>
                                </div>
                                {todayRecord.clockOut && (
                                    <div>
                                        <p className='text-xs text-gray-400'>Clock Out</p>
                                        <p className='text-rose-400 font-bold text-lg'>{todayRecord.clockOut}</p>
                                    </div>
                                )}
                                <div>
                                    <p className='text-xs text-gray-400'>Status</p>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${statusColors[todayRecord.status]}`}>
                                        {statusText[todayRecord.status]}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='flex gap-3'>
                        {!todayRecord && (
                            <button onClick={clockIn} className='bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-semibold px-5 py-2 rounded-xl text-sm'>
                                Clock In
                            </button>
                        )}
                        {todayRecord && !todayRecord.clockOut && (
                            <button onClick={clockOut} className='bg-rose-600 hover:bg-rose-500 transition-colors text-white font-semibold px-5 py-2 rounded-xl text-sm'>
                                Clock Out
                            </button>
                        )}
                        {todayRecord?.clockOut && (
                            <span className='text-gray-400 text-sm self-center'>Day complete ✓</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-3 gap-3 mb-6'>
                <div className='bg-emerald-600 rounded-2xl p-4 text-center'>
                    <p className='text-2xl font-bold text-white'>{presentDays}</p>
                    <p className='text-xs text-white mt-1'>Present</p>
                </div>
                <div className='bg-amber-500 rounded-2xl p-4 text-center'>
                    <p className='text-2xl font-bold text-white'>{lateDays}</p>
                    <p className='text-xs text-white mt-1'>Late</p>
                </div>
                <div className='bg-rose-600 rounded-2xl p-4 text-center'>
                    <p className='text-2xl font-bold text-white'>{absentDays}</p>
                    <p className='text-xs text-white mt-1'>Absent</p>
                </div>
            </div>

            {/* History */}
            <div className='bg-[#1a1a24] border border-white/5 rounded-2xl overflow-hidden'>
                <div className='px-5 py-3 border-b border-white/5'>
                    <h3 className='text-sm font-semibold text-white'>Recent History</h3>
                </div>
                {history.length === 0 ? (
                    <p className='text-gray-400 text-sm p-5'>No attendance records yet.</p>
                ) : (
                    <div className='divide-y divide-white/5'>
                        {history.map((record, idx) => (
                            <div key={idx} className='flex items-center justify-between px-5 py-3'>
                                <p className='text-sm text-white'>{record.date}</p>
                                <div className='flex items-center gap-4'>
                                    <span className='text-xs text-gray-400'>{record.clockIn ? `In: ${record.clockIn}` : '—'}</span>
                                    <span className='text-xs text-gray-400'>{record.clockOut ? `Out: ${record.clockOut}` : '—'}</span>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${statusColors[record.status]}`}>
                                        {statusText[record.status]}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Attendance
