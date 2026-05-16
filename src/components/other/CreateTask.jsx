import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { PlusCircle } from 'lucide-react'

const inputCls = 'text-sm py-2.5 px-3 w-full rounded-xl outline-none bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:bg-white text-slate-800 placeholder:text-slate-300 transition-colors'
const labelCls = 'text-sm text-slate-600 font-semibold mb-1.5 block'

const CreateTask = () => {
    const [userData, setUserData] = useContext(AuthContext)
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        const task = { taskTitle, taskDescription, taskDate, category, active: false, newTask: true, failed: false, completed: false }
        setUserData(userData.map(elem =>
            asignTo.trim().toLowerCase() === elem.firstName.toLowerCase()
                ? { ...elem, tasks: [...elem.tasks, task], taskCounts: { ...elem.taskCounts, newTask: elem.taskCounts.newTask + 1 } }
                : elem
        ))
        setTaskTitle(''); setCategory(''); setAsignTo(''); setTaskDate(''); setTaskDescription('')
    }

    return (
        <div className='p-5 bg-white border border-slate-200 rounded-2xl shadow-sm'>
            <div className='flex items-center gap-2 mb-5'>
                <PlusCircle size={20} className='text-indigo-500' />
                <h2 className='text-base font-bold text-slate-800'>Create New Task</h2>
            </div>
            <form onSubmit={submitHandler} className='flex flex-col sm:flex-row sm:flex-wrap w-full items-start sm:justify-between'>
                <div className='w-full sm:w-1/2 pr-0 sm:pr-6'>
                    <div className='mb-4'><label className={labelCls}>Task Title</label><input value={taskTitle} onChange={e => setTaskTitle(e.target.value)} className={inputCls} type='text' placeholder='Make a UI design' /></div>
                    <div className='mb-4'><label className={labelCls}>Date</label><input value={taskDate} onChange={e => setTaskDate(e.target.value)} className={inputCls} type='date' /></div>
                    <div className='mb-4'><label className={labelCls}>Assign To</label><input value={asignTo} onChange={e => setAsignTo(e.target.value)} className={inputCls} type='text' placeholder='Employee name' /></div>
                    <div className='mb-4'><label className={labelCls}>Category</label><input value={category} onChange={e => setCategory(e.target.value)} className={inputCls} type='text' placeholder='design, dev, etc' /></div>
                </div>
                <div className='w-full sm:w-2/5 flex flex-col'>
                    <label className={labelCls}>Description</label>
                    <textarea value={taskDescription} onChange={e => setTaskDescription(e.target.value)}
                        className='w-full h-36 sm:h-44 text-sm py-2.5 px-3 rounded-xl outline-none bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:bg-white text-slate-800 placeholder:text-slate-300 transition-colors resize-none'
                        placeholder='Task description...' />
                    <button className='bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-3 px-5 rounded-xl text-sm font-bold mt-4 w-full shadow-sm flex items-center justify-center gap-2'>
                        <PlusCircle size={16} /> Create Task
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask
