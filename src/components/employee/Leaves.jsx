import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const statusColors = {
    pending: 'bg-amber-500',
    approved: 'bg-emerald-600',
    rejected: 'bg-rose-600',
}

const Leaves = ({ data }) => {
    const [userData, setUserData] = useContext(AuthContext)
    const [form, setForm] = useState({ type: 'Sick Leave', from: '', to: '', reason: '' })
    const [showForm, setShowForm] = useState(false)

    const employee = userData?.find(e => e.id === data.id)
    const leaves = employee?.leaves || []
    const balance = employee?.leaveBalance || { sick: 0, casual: 0, earned: 0 }

    const submitLeave = (e) => {
        e.preventDefault()
        const newLeave = {
            id: `l${Date.now()}`,
            ...form,
            status: 'pending',
            appliedOn: new Date().toISOString().split('T')[0]
        }
        const updated = userData.map(emp => {
            if (emp.id === data.id) {
                return { ...emp, leaves: [newLeave, ...emp.leaves] }
            }
            return emp
        })
        setUserData(updated)
        setForm({ type: 'Sick Leave', from: '', to: '', reason: '' })
        setShowForm(false)
    }

    return (
        <div className='p-4 sm:p-6'>
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-white'>Leave Management</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className='bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold px-4 py-2 rounded-xl text-sm'
                >
                    {showForm ? 'Cancel' : '+ Apply Leave'}
                </button>
            </div>

            {/* Leave balance */}
            <div className='grid grid-cols-3 gap-3 mb-6'>
                <div className='bg-sky-600 rounded-2xl p-4 text-center'>
                    <p className='text-2xl font-bold text-white'>{balance.sick}</p>
                    <p className='text-xs text-white mt-1'>Sick Leave</p>
                </div>
                <div className='bg-indigo-600 rounded-2xl p-4 text-center'>
                    <p className='text-2xl font-bold text-white'>{balance.casual}</p>
                    <p className='text-xs text-white mt-1'>Casual Leave</p>
                </div>
                <div className='bg-emerald-600 rounded-2xl p-4 text-center'>
                    <p className='text-2xl font-bold text-white'>{balance.earned}</p>
                    <p className='text-xs text-white mt-1'>Earned Leave</p>
                </div>
            </div>

            {/* Apply form */}
            {showForm && (
                <div className='bg-[#1a1a24] border border-white/5 rounded-2xl p-5 mb-6'>
                    <h3 className='text-sm font-semibold text-white mb-4'>Apply for Leave</h3>
                    <form onSubmit={submitLeave} className='flex flex-col gap-4'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                                <label className='text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1 block'>Leave Type</label>
                                <select
                                    value={form.type}
                                    onChange={e => setForm({ ...form, type: e.target.value })}
                                    className='w-full text-sm py-2 px-3 rounded-lg outline-none bg-[#0f0f13] border border-white/10 focus:border-indigo-500 transition-colors'
                                >
                                    <option>Sick Leave</option>
                                    <option>Casual Leave</option>
                                    <option>Earned Leave</option>
                                </select>
                            </div>
                            <div>
                                <label className='text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1 block'>From</label>
                                <input
                                    required type='date' value={form.from}
                                    onChange={e => setForm({ ...form, from: e.target.value })}
                                    className='w-full text-sm py-2 px-3 rounded-lg outline-none bg-[#0f0f13] border border-white/10 focus:border-indigo-500 transition-colors'
                                />
                            </div>
                            <div>
                                <label className='text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1 block'>To</label>
                                <input
                                    required type='date' value={form.to}
                                    onChange={e => setForm({ ...form, to: e.target.value })}
                                    className='w-full text-sm py-2 px-3 rounded-lg outline-none bg-[#0f0f13] border border-white/10 focus:border-indigo-500 transition-colors'
                                />
                            </div>
                            <div>
                                <label className='text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1 block'>Reason</label>
                                <input
                                    required type='text' value={form.reason}
                                    onChange={e => setForm({ ...form, reason: e.target.value })}
                                    placeholder='Brief reason...'
                                    className='w-full text-sm py-2 px-3 rounded-lg outline-none bg-[#0f0f13] border border-white/10 focus:border-indigo-500 transition-colors placeholder:text-gray-600'
                                />
                            </div>
                        </div>
                        <button className='bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold py-2 px-6 rounded-xl text-sm w-full sm:w-auto'>
                            Submit Request
                        </button>
                    </form>
                </div>
            )}

            {/* Leave history */}
            <div className='bg-[#1a1a24] border border-white/5 rounded-2xl overflow-hidden'>
                <div className='px-5 py-3 border-b border-white/5'>
                    <h3 className='text-sm font-semibold text-white'>Leave History</h3>
                </div>
                {leaves.length === 0 ? (
                    <p className='text-gray-400 text-sm p-5'>No leave requests yet.</p>
                ) : (
                    <div className='divide-y divide-white/5'>
                        {leaves.map((leave) => (
                            <div key={leave.id} className='px-5 py-4'>
                                <div className='flex items-start justify-between gap-3'>
                                    <div>
                                        <p className='text-sm font-semibold text-white'>{leave.type}</p>
                                        <p className='text-xs text-gray-400 mt-0.5'>{leave.from} → {leave.to}</p>
                                        <p className='text-xs text-gray-500 mt-1'>{leave.reason}</p>
                                    </div>
                                    <div className='text-right shrink-0'>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${statusColors[leave.status]}`}>
                                            {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                                        </span>
                                        <p className='text-xs text-gray-500 mt-1'>Applied: {leave.appliedOn}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Leaves
