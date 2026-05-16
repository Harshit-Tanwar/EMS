import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { User, Mail, Building2, Briefcase, Calendar, Phone, Pencil, Check } from 'lucide-react'

const Profile = ({ data }) => {
    const [userData, setUserData] = useContext(AuthContext)
    const [editing, setEditing] = useState(false)
    const employee = userData?.find(e => e.id === data.id) || data
    const [form, setForm] = useState({ phone: employee.phone || '' })

    const saveProfile = (e) => {
        e.preventDefault()
        setUserData(userData.map(emp => emp.id === data.id ? { ...emp, phone: form.phone } : emp))
        setEditing(false)
    }

    const initials = `${employee.firstName?.[0] || ''}${employee.lastName?.[0] || ''}`.toUpperCase()

    const infoItems = [
        { label: 'Email',      value: employee.email,      Icon: Mail },
        { label: 'Department', value: employee.department, Icon: Building2 },
        { label: 'Role',       value: employee.role,       Icon: Briefcase },
        { label: 'Join Date',  value: employee.joinDate,   Icon: Calendar },
    ]

    const taskStats = [
        { label: 'New',    value: employee.taskCounts?.newTask || 0,   bg: 'bg-sky-500' },
        { label: 'Active', value: employee.taskCounts?.active || 0,    bg: 'bg-amber-400' },
        { label: 'Done',   value: employee.taskCounts?.completed || 0, bg: 'bg-emerald-500' },
        { label: 'Failed', value: employee.taskCounts?.failed || 0,    bg: 'bg-rose-500' },
    ]

    return (
        <div className='p-4 sm:p-6'>
            <div className='flex items-center gap-2 mb-5'>
                <User size={20} className='text-indigo-500' />
                <h2 className='text-lg font-bold text-slate-800'>My Profile</h2>
            </div>

            <div className='bg-white border border-slate-200 rounded-2xl p-6 mb-4 shadow-sm'>
                <div className='flex items-center gap-4 mb-6'>
                    <div className='w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-sm'>
                        {initials}
                    </div>
                    <div>
                        <h3 className='text-xl font-bold text-slate-800'>{employee.firstName} {employee.lastName}</h3>
                        <p className='text-base text-indigo-600 font-medium'>{employee.role}</p>
                        <p className='text-sm text-slate-400 mt-0.5'>{employee.department}</p>
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    {infoItems.map(({ label, value, Icon }) => (
                        <div key={label} className='bg-slate-50 rounded-xl p-4 flex items-start gap-3'>
                            <Icon size={16} className='text-indigo-400 mt-0.5 shrink-0' />
                            <div>
                                <p className='text-xs text-slate-400 uppercase tracking-wider mb-0.5'>{label}</p>
                                <p className='text-sm font-semibold text-slate-700'>{value || '—'}</p>
                            </div>
                        </div>
                    ))}
                    <div className='bg-slate-50 rounded-xl p-4 flex items-start gap-3'>
                        <Phone size={16} className='text-indigo-400 mt-0.5 shrink-0' />
                        <div className='flex-1'>
                            <p className='text-xs text-slate-400 uppercase tracking-wider mb-0.5'>Phone</p>
                            {editing ? (
                                <form onSubmit={saveProfile} className='flex gap-2 mt-1'>
                                    <input value={form.phone} onChange={e => setForm({ phone: e.target.value })}
                                        className='flex-1 text-sm py-1 px-2 rounded-lg outline-none bg-white border border-indigo-300 text-slate-800' />
                                    <button type='submit' className='bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-lg text-white'>
                                        <Check size={14} />
                                    </button>
                                </form>
                            ) : (
                                <div className='flex items-center justify-between'>
                                    <p className='text-sm font-semibold text-slate-700'>{employee.phone || '—'}</p>
                                    <button onClick={() => setEditing(true)} className='text-indigo-500 hover:text-indigo-700'>
                                        <Pencil size={13} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-white border border-slate-200 rounded-2xl p-5 shadow-sm'>
                <h3 className='text-base font-bold text-slate-700 mb-4'>Task Summary</h3>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                    {taskStats.map(({ label, value, bg }) => (
                        <div key={label} className={`${bg} rounded-xl p-4 text-center shadow-sm`}>
                            <p className='text-2xl font-bold text-white'>{value}</p>
                            <p className='text-xs text-white/80 mt-0.5'>{label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile
