import { CheckCircle, XCircle } from 'lucide-react'

const AcceptTask = ({ data, markCompleted, markFailed }) => (
    <div className='flex-shrink-0 w-[270px] sm:w-[290px] bg-white border border-slate-200 rounded-2xl shadow-sm p-5 flex flex-col'>
        <div className='flex justify-between items-center mb-3'>
            <span className='bg-amber-400 text-white text-xs font-bold px-2.5 py-1 rounded-lg'>{data.category}</span>
            <span className='text-xs text-slate-400'>{data.taskDate}</span>
        </div>
        <span className='text-xs font-bold text-amber-500 uppercase tracking-wider mb-1'>In Progress</span>
        <h2 className='text-base font-bold text-slate-800 leading-snug'>{data.taskTitle}</h2>
        <p className='text-sm text-slate-400 mt-2 leading-relaxed flex-1'>{data.taskDescription}</p>
        <div className='flex gap-2 mt-4'>
            <button onClick={() => markCompleted(data.taskTitle)}
                className='flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold py-2.5 text-xs transition-colors flex items-center justify-center gap-1.5'>
                <CheckCircle size={14} /> Complete
            </button>
            <button onClick={() => markFailed(data.taskTitle)}
                className='flex-1 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold py-2.5 text-xs transition-colors flex items-center justify-center gap-1.5'>
                <XCircle size={14} /> Failed
            </button>
        </div>
    </div>
)

export default AcceptTask
