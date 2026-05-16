import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const badge = { pending: 'bg-amber-100 text-amber-700', approved: 'bg-emerald-100 text-emerald-700', rejected: 'bg-rose-100 text-rose-600' }

const AdminLeaves = () => {
    const [userData, setUserData] = useContext(AuthContext)
    if (!userData) return null

    const allLeaves = userData.flatMap(emp =>
        (emp.leaves || []).map(l => ({ ...l, empId: emp.id, empName: `${emp.firstName} ${emp.lastName || ''}`, empRole: emp.role }))
    ).sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn))

    const updateStatus = (empId, leaveId, status) => {
        setUserData(userData.map(emp => emp.id !== empId ? emp : {
            ...emp, leaves: emp.leaves.map(l => l.id === leaveId ? { ...l, status } : l)
        }))
    }

    const pending  = allLeaves.filter(l => l.status === 'pending')
    const resolved = allLeaves.filter(l => l.status !== 'pending')

    return (
        <div className='p-4 sm:p-6'>
            <h2 className='text-lg font-bold text-slate-800 mb-5'>Leave Requests</h2>

            {/* Pending */}
            <div className='mb-6'>
                <p className='text-xs font-semibold text-amber-600 uppercase tracking-wider mb-3'>Pending ({pending.length})</p>
                {pending.length === 0 ? (
                    <div className='bg-white border border-slate-200 rounded-2xl p-5 shadow-sm'>
                        <p className='text-slate-400 text-sm'>No pending requests.</p>
                    </div>
                ) : (
                    <div className='flex flex-col gap-3'>
                        {pending.map(leave => (
                            <div key={leave.id} className='bg-white border border-amber-200 rounded-2xl p-5 shadow-sm'>
                                <div className='flex items-start justify-between gap-4 flex-wrap'>
                                    <div>
                                        <div className='flex items-center gap-2 mb-2'>
                                            <div className='w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold'>
                                                {leave.empName[0]}
                                            </div>
                                            <p className='text-sm font-semibold text-slate-700'>{leave.empName}</p>
                                            <span className='text-xs text-slate-400'>· {leave.empRole}</span>
                                        </div>
                                        <p className='text-sm font-medium text-indigo-600'>{leave.type}</p>
                                        <p className='text-xs text-slate-400 mt-0.5'>{leave.from} → {leave.to}</p>
                                        <p className='text-xs text-slate-400 mt-0.5'>"{leave.reason}"</p>
                                        <p className='text-xs text-slate-300 mt-1'>Applied: {leave.appliedOn}</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button onClick={() => updateStatus(leave.empId, leave.id, 'approved')}
                                            className='bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors'>
                                            Approve
                                        </button>
                                        <button onClick={() => updateStatus(leave.empId, leave.id, 'rejected')}
                                            className='bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors'>
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Resolved */}
            <div>
                <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3'>Resolved ({resolved.length})</p>
                <div className='bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm'>
                    {resolved.length === 0 ? (
                        <p className='text-slate-400 text-sm p-5'>No resolved requests.</p>
                    ) : (
                        <div className='divide-y divide-slate-50'>
                            {resolved.map(leave => (
                                <div key={leave.id} className='flex items-center justify-between px-5 py-3.5 flex-wrap gap-2'>
                                    <div>
                                        <p className='text-sm font-semibold text-slate-700'>{leave.empName} <span className='text-slate-400 font-normal'>· {leave.type}</span></p>
                                        <p className='text-xs text-slate-400'>{leave.from} → {leave.to} · "{leave.reason}"</p>
                                    </div>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${badge[leave.status]}`}>
                                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminLeaves
