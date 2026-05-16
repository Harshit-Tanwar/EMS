import { Inbox, CheckCircle, Loader, XCircle } from 'lucide-react'

const stats = (data) => [
    { label: 'New Tasks',   value: data.taskCounts.newTask,   bg: 'bg-sky-500',     Icon: Inbox },
    { label: 'Completed',   value: data.taskCounts.completed, bg: 'bg-emerald-500', Icon: CheckCircle },
    { label: 'In Progress', value: data.taskCounts.active,    bg: 'bg-amber-400',   Icon: Loader },
    { label: 'Failed',      value: data.taskCounts.failed,    bg: 'bg-rose-500',    Icon: XCircle },
]

const TaskListNumbers = ({ data }) => (
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6'>
        {stats(data).map(({ label, value, bg, Icon }) => (
            <div key={label} className={`${bg} rounded-2xl py-5 px-5 shadow-sm`}>
                <div className='flex items-center justify-between mb-2'>
                    <Icon size={20} color='white' className='opacity-80' />
                </div>
                <p className='text-3xl font-bold text-white'>{value}</p>
                <p className='text-sm text-white/80 mt-1 font-medium'>{label}</p>
            </div>
        ))}
    </div>
)

export default TaskListNumbers
