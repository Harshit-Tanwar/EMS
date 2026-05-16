import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react'

const badge = { present: 'bg-emerald-100 text-emerald-700', absent: 'bg-rose-100 text-rose-600', late: 'bg-amber-100 text-amber-700' }
const label = { present: 'Present', absent: 'Absent', late: 'Late' }

const AdminAttendance = () => {
    const [userData] = useContext(AuthContext)
    if (!userData) return null

    return (
        <div className='p-4 sm:p-6'>
            <div className='flex items-center gap-2 mb-5'>
                <Clock size={20} className='text-indigo-500' />
                <h2 className='text-lg font-bold text-slate-800'>Attendance Overview</h2>
            </div>
            <div className='flex flex-col gap-4'>
                {userData.map(emp => {
                    const history = emp.attendance || []
                    const present = history.filter(a => a.status === 'present').length
                    const late    = history.filter(a => a.status === 'late').length
                    const absent  = history.filter(a => a.status === 'absent').length
                    const today   = emp.todayAttendance

                    return (
                        <div key={emp.id} className='bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm'>
                            <div className='flex items-center justify-between px-5 py-4 border-b border-slate-100'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shrink-0'>
                                        {emp.firstName[0]}{emp.lastName?.[0] || ''}
                                    </div>
                                    <div>
                                        <p className='text-sm font-bold text-slate-700'>{emp.firstName} {emp.lastName}</p>
                                        <p className='text-xs text-slate-400'>{emp.role}</p>
                                    </div>
                                </div>
                                <div className='flex gap-4 text-center'>
                                    <div className='flex items-center gap-1'>
                                        <CheckCircle size={14} className='text-emerald-500' />
                                        <div><p className='text-sm font-bold text-emerald-600'>{present}</p><p className='text-xs text-slate-400'>Present</p></div>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <AlertCircle size={14} className='text-amber-400' />
                                        <div><p className='text-sm font-bold text-amber-500'>{late}</p><p className='text-xs text-slate-400'>Late</p></div>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <XCircle size={14} className='text-rose-500' />
                                        <div><p className='text-sm font-bold text-rose-500'>{absent}</p><p className='text-xs text-slate-400'>Absent</p></div>
                                    </div>
                                </div>
                            </div>
                            <div className='px-5 py-3 bg-slate-50 flex items-center justify-between border-b border-slate-100'>
                                <p className='text-xs text-slate-400 font-semibold'>Today</p>
                                {today ? (
                                    <div className='flex items-center gap-3'>
                                        <span className='text-xs text-slate-500'>In: {today.clockIn}</span>
                                        {today.clockOut && <span className='text-xs text-slate-500'>Out: {today.clockOut}</span>}
                                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg ${badge[today.status]}`}>{label[today.status]}</span>
                                    </div>
                                ) : <span className='text-xs text-slate-400'>Not clocked in</span>}
                            </div>
                            <div className='divide-y divide-slate-50'>
                                {history.slice(0, 3).map((r, i) => (
                                    <div key={i} className='flex items-center justify-between px-5 py-3'>
                                        <p className='text-sm text-slate-500'>{r.date}</p>
                                        <div className='flex items-center gap-3'>
                                            <span className='text-xs text-slate-400'>{r.clockIn ? `In: ${r.clockIn}` : '—'}</span>
                                            <span className='text-xs text-slate-400'>{r.clockOut ? `Out: ${r.clockOut}` : '—'}</span>
                                            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg ${badge[r.status]}`}>{label[r.status]}</span>
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
