import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { Users } from 'lucide-react'

const AllTask = () => {
    const [userData] = useContext(AuthContext)

    return (
        <div className='bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden'>
            <div className='px-5 py-4 border-b border-slate-100 flex items-center gap-2'>
                <Users size={18} className='text-indigo-500' />
                <h2 className='text-base font-bold text-slate-800'>Employee Task Overview</h2>
            </div>

            {/* Desktop */}
            <div className='hidden sm:block'>
                <div className='bg-slate-50 px-5 py-3 flex justify-between border-b border-slate-100'>
                    {['Employee', 'New', 'Active', 'Completed', 'Failed'].map(h => (
                        <span key={h} className='text-xs font-bold text-slate-400 uppercase tracking-wider w-1/5'>{h}</span>
                    ))}
                </div>
                {userData?.map((elem, idx) => (
                    <div key={idx} className='px-5 py-4 flex justify-between border-b border-slate-50 hover:bg-slate-50 transition-colors'>
                        <span className='text-sm font-bold text-slate-700 w-1/5'>{elem.firstName}</span>
                        <span className='text-sm font-semibold w-1/5 text-sky-600'>{elem.taskCounts.newTask}</span>
                        <span className='text-sm font-semibold w-1/5 text-amber-500'>{elem.taskCounts.active}</span>
                        <span className='text-sm font-semibold w-1/5 text-emerald-600'>{elem.taskCounts.completed}</span>
                        <span className='text-sm font-semibold w-1/5 text-rose-500'>{elem.taskCounts.failed}</span>
                    </div>
                ))}
            </div>

            {/* Mobile */}
            <div className='sm:hidden divide-y divide-slate-100'>
                {userData?.map((elem, idx) => (
                    <div key={idx} className='p-4'>
                        <p className='text-sm font-bold text-slate-700 mb-3'>{elem.firstName}</p>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='bg-sky-500 rounded-xl px-3 py-2.5'>
                                <p className='text-xs text-sky-100'>New</p>
                                <p className='text-lg font-bold text-white'>{elem.taskCounts.newTask}</p>
                            </div>
                            <div className='bg-amber-400 rounded-xl px-3 py-2.5'>
                                <p className='text-xs text-amber-100'>Active</p>
                                <p className='text-lg font-bold text-white'>{elem.taskCounts.active}</p>
                            </div>
                            <div className='bg-emerald-500 rounded-xl px-3 py-2.5'>
                                <p className='text-xs text-emerald-100'>Completed</p>
                                <p className='text-lg font-bold text-white'>{elem.taskCounts.completed}</p>
                            </div>
                            <div className='bg-rose-500 rounded-xl px-3 py-2.5'>
                                <p className='text-xs text-rose-100'>Failed</p>
                                <p className='text-lg font-bold text-white'>{elem.taskCounts.failed}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllTask
