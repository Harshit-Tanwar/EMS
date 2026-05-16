import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const statusColors = { pending: 'bg-amber-500', approved: 'bg-emerald-600', rejected: 'bg-rose-600' }

const AdminLeaves = () => {
    const [userData, setUserData] = useContext(AuthContext)

    if (!userData) return null

    // Flatten all leaves with employee info
    const allLeaves = userData.flatMap(emp =>
        (emp.leaves || []).map(leave => ({ ...leave, empId: emp.id, empName: `${emp.firstName} ${emp.lastName || ''}`, empRole: emp.role }))
    ).sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn))

    const updateLeaveStatus = (empId, leaveId, newStatus) => {
        const updated = userData.map(emp => {
            if (emp.id !== empId) return emp
            return {
                ...emp,
                leaves: emp.leaves.map(l => l.id === leaveId ? { ...l, status: newStatus } : l)
            }
        })
        setUserData(updated)
    }

    const pending = allLeaves.filter(l => l.status === 'pending')
    const resolved = allLeaves.filter(l => l.status !== 'pending')

    return (
        <div className='p-4 sm:p-6'>
            <h2 className='text-xl font-bold text-white mb-6'>Leave Requests</h2>

            {/* Pending */}
            <div className='mb-6'>
                <h3 className='text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3'>
                    Pending ({pending.length})
                </h3>
                {pending.length === 0 ? (
                    <div className='bg-[#1a1a24] border border-white/5 rounded-2xl p-5'>
                        <p className='text-gray-400 text-sm'>No pending requests.</p>
                    </div>
                ) : (
                    <div className='flex flex-col gap-3'>
                        {pending.map(leave => (
                            <div key={leave.id} className='bg-[#1a1a24] border border-amber-500/30 rounded-2xl p-5'>
                                <div className='flex items-start justify-between gap-4 flex-wrap'>
                                    <div>
                                        <div className='flex items-center gap-2 mb-1'>
                                            <div className='w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-bold text-white'>
                                                {leave.empName[0]}
                                            </div>
                                            <p className='text-sm font-semibold text-white'>{leave.empName}</p>
                                            <span className='text-xs text-gray-400'>· {leave.empRole}</span>
                                        </div>
                                        <p className='text-sm text-indigo-300 font-medium'>{leave.type}</p>
                                        <p className='text-xs text-gray-400 mt-0.5'>{leave.from} → {leave.to}</p>
                                        <p className='text-xs text-gray-500 mt-1'>"{leave.reason}"</p>
                                        <p className='text-xs text-gray-600 mt-1'>Applied: {leave.appliedOn}</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <button
                                            onClick={() => updateLeaveStatus(leave.empId, leave.id, 'approved')}
                                            className='bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-semibold px-4 py-2 rounded-xl text-xs'
                                        >Approve</button>
                                        <button
                                            onClick={() => updateLeaveStatus(leave.empId, leave.id, 'rejected')}
                                            className='bg-rose-600 hover:bg-rose-500 transition-colors text-white font-semibold px-4 py-2 rounded-xl text-xs'
                                        >Reject</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Resolved */}
            <div>
                <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3'>
                    Resolved ({resolved.length})
                </h3>
                <div className='bg-[#1a1a24] border border-white/5 rounded-2xl overflow-hidden'>
                    {resolved.length === 0 ? (
                        <p className='text-gray-400 text-sm p-5'>No resolved requests.</p>
                    ) : (
                        <div className='divide-y divide-white/5'>
                            {resolved.map(leave => (
                                <div key={leave.id} className='flex items-center justify-between px-5 py-3 flex-wrap gap-2'>
                                    <div>
                                        <p className='text-sm font-semibold text-white'>{leave.empName} <span className='text-gray-400 font-normal'>· {leave.type}</span></p>
                                        <p className='text-xs text-gray-500'>{leave.from} → {leave.to} · "{leave.reason}"</p>
                                    </div>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${statusColors[leave.status]}`}>
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
