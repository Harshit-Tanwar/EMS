import { CheckCircle2 } from 'lucide-react'

const CompleteTask = ({ data }) => (
    <div className='flex-shrink-0 w-[270px] sm:w-[290px] bg-white border border-slate-200 rounded-2xl shadow-sm p-5 flex flex-col'>
        <div className='flex justify-between items-center mb-3'>
            <span className='bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg'>{data.category}</span>
            <span className='text-xs text-slate-400'>{data.taskDate}</span>
        </div>
        <span className='text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1'>Completed</span>
        <h2 className='text-base font-bold text-slate-800 leading-snug'>{data.taskTitle}</h2>
        <p className='text-sm text-slate-400 mt-2 leading-relaxed flex-1'>{data.taskDescription}</p>
        <div className='mt-4 w-full bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl font-bold py-2.5 text-sm text-center flex items-center justify-center gap-2'>
            <CheckCircle2 size={15} /> Completed
        </div>
    </div>
)

export default CompleteTask
