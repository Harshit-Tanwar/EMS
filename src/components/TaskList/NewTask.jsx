import { CheckSquare } from 'lucide-react'

const NewTask = ({ data, acceptTask }) => (
    <div className='flex-shrink-0 w-[270px] sm:w-[290px] bg-white border border-slate-200 rounded-2xl shadow-sm p-5 flex flex-col'>
        <div className='flex justify-between items-center mb-3'>
            <span className='bg-sky-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg'>{data.category}</span>
            <span className='text-xs text-slate-400'>{data.taskDate}</span>
        </div>
        <span className='text-xs font-bold text-sky-500 uppercase tracking-wider mb-1'>New Task</span>
        <h2 className='text-base font-bold text-slate-800 leading-snug'>{data.taskTitle}</h2>
        <p className='text-sm text-slate-400 mt-2 leading-relaxed flex-1'>{data.taskDescription}</p>
        <button
            onClick={() => acceptTask(data.taskTitle)}
            className='mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold py-2.5 text-sm transition-colors flex items-center justify-center gap-2'
        >
            <CheckSquare size={15} /> Accept Task
        </button>
    </div>
)

export default NewTask
