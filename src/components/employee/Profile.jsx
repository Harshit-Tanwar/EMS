import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const Profile = ({ data }) => {
    const [userData, setUserData] = useContext(AuthContext)
    const [editing, setEditing] = useState(false)
    const employee = userData?.find(e => e.id === data.id) || data
    const [form, setForm] = useState({ phone: employee.phone || '' })

    const saveProfile = (e) => {
        e.preventDefault()
        const updated = userData.map(emp => {
            if (emp.id === data.id) return { ...emp, phone: form.phone }
            return emp
        })
        setUserData(updated)
        setEditing(false)
    }

    const initials = `${employee.firstName?.[0] || ''}${employee.lastName?.[0] || ''}`.toUpperCase()

    return (
        <div className='p-4 sm:p-6'>
            <h2 className='text-xl font-bold text-white mb-6'>My Profile</h2>

            <div className='bg-[#1a1a24] border border-white/5 rounded-2xl p-6 mb-5'>
                <div className='flex items-center gap-5 mb-6'>
                    <div className='w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl font-bold text-white shrink-0'>
                        {initials}
                    </div>
                    <div>
                        <h3 className='text-xl font-bold text-white'>{employee.firstName} {employee.lastName}</h3>
                        <p className='text-indigo-400 text-sm'>{employee.role}</p>
                        <p className='text-gray-400 text-xs mt-0.5'>{employee.department}</p>
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {[
                        { label: 'Email', value: employee.email },
                        { label: 'Department', value: employee.department },
                        { label: 'Role', value: employee.role },
                        { label: 'Join Date', value: employee.joinDate },
                    ].map(item => (
                        <div key={item.label} className='bg-[#0f0f13] rounded-xl p-4'>
                            <p className='text-xs text-gray-400 uppercase tracking-wider mb-1'>{item.label}</p>
                            <p className='text-sm font-medium text-white'>{item.value || '—'}</p>
                        </div>
                    ))}

                    {/* Editable phone */}
                    <div className='bg-[#0f0f13] rounded-xl p-4'>
                        <p className='text-xs text-gray-400 uppercase tracking-wider mb-1'>Phone</p>
                        {editing ? (
                            <form onSubmit={saveProfile} className='flex gap-2 mt-1'>
                                <input
                                    value={form.phone}
                                    onChange={e => setForm({ phone: e.target.value })}
                                    className='flex-1 text-sm py-1 px-2 rounded-lg outline-none bg-[#1a1a24] border border-indigo-500 text-white'
                                />
                                <button type='submit' className='text-xs bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded-lg text-white font-semibold'>Save</button>
                            </form>
                        ) : (
                            <div className='flex items-center justify-between'>
                                <p className='text-sm font-medium text-white'>{employee.phone || '—'}</p>
                                <button onClick={() => setEditing(true)} className='text-xs text-indigo-400 hover:text-indigo-300'>Edit</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Task summary */}
            <div className='bg-[#1a1a24] border border-white/5 rounded-2xl p-5'>
                <h3 className='text-sm font-semibold text-white mb-4'>Task Summary</h3>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                    <div className='bg-sky-600 rounded-xl p-3 text-center'>
                        <p className='text-xl font-bold text-white'>{employee.taskCounts?.newTask || 0}</p>
                        <p className='text-xs text-white mt-0.5'>New</p>
                    </div>
                    <div className='bg-amber-500 rounded-xl p-3 text-center'>
                        <p className='text-xl font-bold text-white'>{employee.taskCounts?.active || 0}</p>
                        <p className='text-xs text-white mt-0.5'>Active</p>
                    </div>
                    <div className='bg-emerald-600 rounded-xl p-3 text-center'>
                        <p className='text-xl font-bold text-white'>{employee.taskCounts?.completed || 0}</p>
                        <p className='text-xs text-white mt-0.5'>Done</p>
                    </div>
                    <div className='bg-rose-600 rounded-xl p-3 text-center'>
                        <p className='text-xl font-bold text-white'>{employee.taskCounts?.failed || 0}</p>
                        <p className='text-xs text-white mt-0.5'>Failed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
