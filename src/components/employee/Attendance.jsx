import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Clock, LogIn, LogOut, CheckCircle, AlertCircle, XCircle } from 'lucide-react'

const badge  = { present: 'bg-emerald-100 text-emerald-700', absent: 'bg-rose-100 text-rose-600', late: 'bg-amber-100 text-amber-700' }
const label  = { present: 'Present', absent: 'Absent', late: 'Late' }
const statBg = { present: 'bg-emerald-500', late: 'bg-amber-400', absent: 'bg-rose-500' }

const Attendance = ({ data }) => {
    const [userData, setUserData] = useContext(AuthContext)
    const today = new Date().toISOString().split('T')[0]
    const now   = new Date().toTimeString().slice(0, 5)

    const employee    = userData?.find(e => e.id === data.id)
    const todayRecord = employee?.todayAttendance
    const history     = employee?.attendance || []

    const present = history.filter(a => a.status === 'present').length
    const late    = history.filter(a => a.status === 'late').length
    const absent  = history.filter(a => a.status === 'absent').length

    const clockIn  = () => setUserData(userData.map(e => e.id !== data.id ? e : { ...e, todayAttendance: { date: today, clockIn: now, clockOut: null, status: now > '09:15' ? 'late' : 'present' } }))
    const clockOut = () => setUserData(userData.map(e => e.id !== data.id ? e : { ...e, todayAttendance: { ...e.todayAttendance, clockOut: now }, attendance: [{ ...e.todayAttendance, clockOut: now }, ...e.attendance] }))

    return (
        <div className='p-4 sm:p-6'>
            <div className='flex items-center gap-2 mb-5'>
                <Clock size={20} className='text-indigo-500' />
                <h2 className='text-lg font-bold text-slate-800'>Attendance</h2>
            </div>

            {/* Today */}
            <div className='bg-white border border-slate-200 rounded-2xl p-5 mb-5 shadow-sm'>
                <p className='text-xs text-slate-400 font-bold uppercase tracking-wider mb-3'>Today — {today}</p>
                <div className='flex items-center justify-between flex-wrap gap-4'>
                    <div>
                        {!todayRecord ? (
                            <p className='text-base text-slate-500'>Not clocked in yet</p>
                        ) : (
                            <div className='flex gap-6'>
                                <div>
                                    <p className='text-xs text-slate-400 mb-0.5'>Clock In</p>
                                    <p className='text-xl font-bold text-emerald-600'>{todayRecord.clockIn}</p>
                                </div>
                                {todayRecord.clockOut && (
                                    <div>
                                        <p className='text-xs text-slate-400 mb-0.5'>Clock Out</p>
                                        <p className='text-xl font-bold text-rose-500'>{todayRecord.clockOut}</p>
                                    </div>
                                )}
                                <div>
                                    <p className='text-xs text-slate-400 mb-0.5'>Status</p>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${badge[todayRecord.status]}`}>{label[todayRecord.status]}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        {!todayRecord && (
                            <button onClick={clockIn} className='bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2'>
                                <LogIn size={16} /> Clock In
                            </button>
                        )}
                        {todayRecord && !todayRecord.clockOut && (
                            <button onClick={clockOut} className='bg-rose-500 hover:bg-rose-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2'>
                                <LogOut size={16} /> Clock Out
                            </button>
                        )}
                        {todayRecord?.clockOut && <span className='text-sm text-slate-400 flex items-center gap-1.5'><CheckCircle size={16} className='text-emerald-500' /> Day complete</span>}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-3 gap-3 mb-5'>
                {[
                    { label: 'Present', value: present, bg: statBg.present, Icon: CheckCircle },
                    { label: 'Late',    value: late,    bg: statBg.late,    Icon: AlertCircle },
                    { label: 'Absent',  value: absent,  bg: statBg.absent,  Icon: XCircle },
                ].map(({ label, value, bg, Icon }) => (
                    <div key={label} className={`${bg} rounded-2xl p-4 text-center shadow-sm`}>
                        <Icon size={18} color='white' className='mx-auto mb-1 opacity-80' />
                        <p className='text-2xl font-bold text-white'>{value}</p>
                        <p className='text-xs text-white/80 mt-0.5'>{label}</p>
                    </div>
                ))}
            </div>

            {/* History */}
            <div className='bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm'>
                <div className='px-5 py-3.5 border-b border-slate-100'>
                    <h3 className='text-sm font-bold text-slate-700'>Recent History</h3>
                </div>
                {history.length === 0 ? (
                    <p className='text-slate-400 text-sm p-5'>No records yet.</p>
                ) : (
                    <div className='divide-y divide-slate-50'>
                        {history.map((r, i) => (
                            <div key={i} className='flex items-center justify-between px-5 py-3.5'>
                                <p className='text-sm font-medium text-slate-600'>{r.date}</p>
                                <div className='flex items-center gap-4'>
                                    <span className='text-xs text-slate-400'>{r.clockIn ? `In: ${r.clockIn}` : '—'}</span>
                                    <span className='text-xs text-slate-400'>{r.clockOut ? `Out: ${r.clockOut}` : '—'}</span>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${badge[r.status]}`}>{label[r.status]}</span>
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
