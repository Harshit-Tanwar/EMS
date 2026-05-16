import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Leaf, Plus, X } from 'lucide-react'

const badge    = { pending: 'bg-amber-100 text-amber-700', approved: 'bg-emerald-100 text-emerald-700', rejected: 'bg-rose-100 text-rose-600' }
const inputCls = 'w-full text-sm py-2.5 px-3 rounded-xl outline-none bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:bg-white text-slate-800 placeholder:text-slate-300 transition-colors'
const labelCls = 'text-sm text-slate-600 font-semibold mb-1.5 block'

const Leaves = ({ data }) => {
    const [userData, setUserData] = useContext(AuthContext)
    const [form, setForm] = useState({ type: 'Sick Leave', from: '', to: '', reason: '' })
    const [showForm, setShowForm] = useState(false)

    const employee = userData?.find(e => e.id === data.id)
    const leaves   = employee?.leaves || []
    const balance  = employee?.leaveBalance || { sick: 0, casual: 0, earned: 0 }

    const submitLeave = (e) => {
        e.preventDefault()
        const newLeave = { id: `l${Date.now()}`, ...form, status: 'pending', appliedOn: new Date().toISOString().split('T')[0] }
        setUserData(userData.map(emp => emp.id === data.id ? { ...emp, leaves: [newLeave, ...emp.leaves] } : emp))
        setForm({ type: 'Sick Leave', from: '', to: '', reason: '' })
        setShowForm(false)
    }

    return (
        <div className='p-4 sm:p-6'>
            <div className='flex items-center justify-between mb-5'>
                <div className='flex items-center gap-2'>
                    <Leaf size={20} className='text-indigo-500' />
                    <h2 className='text-lg font-bold text-slate-800'>Leave Management</h2>
                </div>
                <button onClick={() => setShowForm(!showForm)}
                    className='bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2'>
                    {showForm ? <><X size={15} /> Cancel</> : <><Plus size={15} /> Apply Leave</>}
                </button>
            </div>

            {/* Balance */}
            <div className='grid grid-cols-3 gap-3 mb-5'>
                {[
                    { label: 'Sick Leave',   value: balance.sick,   bg: 'bg-sky-500' },
                    { label: 'Casual Leave', value: balance.casual, bg: 'bg-indigo-600' },
                    { label: 'Earned Leave', value: balance.earned, bg: 'bg-emerald-500' },
                ].map(({ label, value, bg }) => (
                    <div key={label} className={`${bg} rounded-2xl p-4 text-center shadow-sm`}>
                        <p className='text-3xl font-bold text-white'>{value}</p>
                        <p className='text-xs text-white/80 mt-1'>{label}</p>
                    </div>
                ))}
            </div>

            {/* Form */}
            {showForm && (
                <div className='bg-white border border-slate-200 rounded-2xl p-5 mb-5 shadow-sm'>
                    <h3 className='text-base font-bold text-slate-700 mb-4'>Apply for Leave</h3>
                    <form onSubmit={submitLeave} className='flex flex-col gap-4'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                                <label className={labelCls}>Leave Type</label>
                                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={inputCls}>
                                    <option>Sick Leave</option>
                                    <option>Casual Leave</option>
                                    <option>Earned Leave</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelCls}>From</label>
                                <input required type='date' value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} className={inputCls} />
                            </div>
                            <div>
                                <label className={labelCls}>To</label>
                                <input required type='date' value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} className={inputCls} />
                            </div>
                            <div>
                                <label className={labelCls}>Reason</label>
                                <input required type='text' value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} placeholder='Brief reason...' className={inputCls} />
                            </div>
                        </div>
                        <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm w-full sm:w-auto transition-colors'>
                            Submit Request
                        </button>
                    </form>
                </div>
            )}

            {/* History */}
            <div className='bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm'>
                <div className='px-5 py-3.5 border-b border-slate-100'>
                    <h3 className='text-sm font-bold text-slate-700'>Leave History</h3>
                </div>
                {leaves.length === 0 ? (
                    <p className='text-slate-400 text-sm p-5'>No leave requests yet.</p>
                ) : (
                    <div className='divide-y divide-slate-50'>
                        {leaves.map(leave => (
                            <div key={leave.id} className='px-5 py-4 flex items-start justify-between gap-3'>
                                <div>
                                    <p className='text-sm font-bold text-slate-700'>{leave.type}</p>
                                    <p className='text-sm text-slate-400 mt-0.5'>{leave.from} → {leave.to}</p>
                                    <p className='text-sm text-slate-400 mt-0.5'>{leave.reason}</p>
                                </div>
                                <div className='text-right shrink-0'>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${badge[leave.status]}`}>
                                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                                    </span>
                                    <p className='text-xs text-slate-400 mt-1'>Applied: {leave.appliedOn}</p>
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
