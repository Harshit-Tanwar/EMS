import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const CreateTask = () => {

    const [userData, setUserData] = useContext(AuthContext)

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [asignTo, setAsignTo] = useState('')
    const [category, setCategory] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        const task = {
            taskTitle,
            taskDescription,
            taskDate,
            category,
            active: false,
            newTask: true,
            failed: false,
            completed: false
        }

        const updatedData = userData.map((elem) => {
            if (asignTo.trim().toLowerCase() === elem.firstName.toLowerCase()) {
                return {
                    ...elem,
                    tasks: [...elem.tasks, task],
                    taskCounts: {
                        ...elem.taskCounts,
                        newTask: elem.taskCounts.newTask + 1
                    }
                }
            }
            return elem
        })

        setUserData(updatedData)
        console.log(updatedData);

        setTaskTitle('')
        setCategory('')
        setAsignTo('')
        setTaskDate('')
        setTaskDescription('')

    }

    return (
        <div className='p-4 sm:p-5 bg-[#1a1a24] border border-white/5 mt-5 rounded-2xl shadow-xl'>
            <h2 className='text-lg font-semibold text-white mb-4'>Create New Task</h2>
            <form onSubmit={(e) => { submitHandler(e) }}
                className='flex flex-col sm:flex-row sm:flex-wrap w-full items-start sm:justify-between gap-0'
            >
                <div className='w-full sm:w-1/2'>
                    <div>
                        <h3 className='text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1'>Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => { setTaskTitle(e.target.value) }}
                            className='text-sm py-2 px-3 w-full sm:w-4/5 rounded-lg outline-none bg-[#0f0f13] border border-white/10 focus:border-indigo-500 mb-4 placeholder:text-gray-600 transition-colors' type="text" placeholder='Make a UI design'
                        />
                    </div>
                    <div>
                        <h3 className='text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1'>Date</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => { setTaskDate(e.target.value) }}
                            className='text-sm py-2 px-3 w-full sm:w-4/5 rounded-lg outline-none bg-[#0f0f13] border border-white/10 focus:border-indigo-500 mb-4 transition-colors' type="date" />
                    </div>
                    <div>
                        <h3 className='text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1'>Assign To</h3>
                        <input
                            value={asignTo}
                            onChange={(e) => { setAsignTo(e.target.value) }}
                            className='text-sm py-2 px-3 w-full sm:w-4/5 rounded-lg outline-none bg-[#0f0f13] border border-white/10 focus:border-indigo-500 mb-4 placeholder:text-gray-600 transition-colors' type="text" placeholder='Employee name' />
                    </div>
                    <div>
                        <h3 className='text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1'>Category</h3>
                        <input
                            value={category}
                            onChange={(e) => { setCategory(e.target.value) }}
                            className='text-sm py-2 px-3 w-full sm:w-4/5 rounded-lg outline-none bg-[#0f0f13] border border-white/10 focus:border-indigo-500 mb-4 placeholder:text-gray-600 transition-colors' type="text" placeholder='design, dev, etc' />
                    </div>
                </div>

                <div className='w-full sm:w-2/5 flex flex-col items-start'>
                    <h3 className='text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1'>Description</h3>
                    <textarea value={taskDescription}
                        onChange={(e) => { setTaskDescription(e.target.value) }}
                        className='w-full h-36 sm:h-44 text-sm py-2 px-4 rounded-lg outline-none bg-[#0f0f13] border border-white/10 focus:border-indigo-500 placeholder:text-gray-600 transition-colors resize-none' placeholder='Task description...'></textarea>
                    <button className='bg-indigo-600 hover:bg-indigo-500 transition-colors py-3 px-5 rounded-lg text-sm font-semibold mt-4 w-full shadow-lg shadow-indigo-900/30'>Create Task</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask