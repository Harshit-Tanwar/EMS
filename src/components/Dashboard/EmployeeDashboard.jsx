import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'
import Attendance from '../employee/Attendance'
import Leaves from '../employee/Leaves'
import Profile from '../employee/Profile'

const NAV = [
    { id: 'tasks',      label: 'Tasks',      icon: '📋' },
    { id: 'attendance', label: 'Attendance',  icon: '🕐' },
    { id: 'leaves',     label: 'Leaves',      icon: '🌿' },
    { id: 'profile',    label: 'Profile',     icon: '👤' },
]

const EmployeeDashboard = (props) => {
    const [userData, setUserData] = useContext(AuthContext)
    const [activeTab, setActiveTab] = useState('tasks')
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const updateTaskStatus = (taskTitle, updates, countChanges) => {
        const updatedData = userData.map((employee) => {
            if (employee.id === props.data.id) {
                const updatedTasks = employee.tasks.map((task) => {
                    if (task.taskTitle === taskTitle) return { ...task, ...updates }
                    return task
                })
                return {
                    ...employee,
                    tasks: updatedTasks,
                    taskCounts: {
                        ...employee.taskCounts,
                        ...Object.fromEntries(
                            Object.entries(countChanges).map(([key, delta]) => [key, employee.taskCounts[key] + delta])
                        )
                    }
                }
            }
            return employee
        })
        setUserData(updatedData)
    }

    const markCompleted = (taskTitle) => updateTaskStatus(taskTitle, { active: false, completed: true }, { active: -1, completed: 1 })
    const markFailed    = (taskTitle) => updateTaskStatus(taskTitle, { active: false, failed: true },    { active: -1, failed: 1 })
    const acceptTask    = (taskTitle) => updateTaskStatus(taskTitle, { newTask: false, active: true },   { newTask: -1, active: 1 })

    // Always read fresh employee data from context
    const liveData = userData?.find(e => e.id === props.data.id) || props.data

    return (
        <div className='flex h-screen bg-[#0f0f13] overflow-hidden'>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className='fixed inset-0 bg-black/60 z-20 sm:hidden' onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed sm:static z-30 sm:z-auto
                w-56 h-full bg-[#1a1a24] border-r border-white/5
                flex flex-col
                transition-transform duration-200
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
            `}>
                <div className='px-5 py-5 border-b border-white/5'>
                    <p className='text-xs text-gray-400 uppercase tracking-wider'>Employee Portal</p>
                    <p className='text-sm font-bold text-white mt-1'>{liveData.firstName} {liveData.lastName || ''}</p>
                    <p className='text-xs text-indigo-400'>{liveData.role || ''}</p>
                </div>
                <nav className='flex-1 px-3 py-4 flex flex-col gap-1'>
                    {NAV.map(item => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-left w-full
                                ${activeTab === item.id
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>
                <div className='px-3 py-4 border-t border-white/5'>
                    <button
                        onClick={() => { localStorage.setItem('loggedInUser', ''); props.changeUser('') }}
                        className='w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-600/10 transition-colors'
                    >
                        <span>🚪</span> Log Out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className='flex-1 flex flex-col overflow-hidden'>
                {/* Top bar */}
                <div className='flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/5 bg-[#1a1a24]'>
                    <div className='flex items-center gap-3'>
                        <button
                            className='sm:hidden text-gray-400 hover:text-white'
                            onClick={() => setSidebarOpen(true)}
                        >
                            ☰
                        </button>
                        <h1 className='text-base font-semibold text-white'>
                            {NAV.find(n => n.id === activeTab)?.icon} {NAV.find(n => n.id === activeTab)?.label}
                        </h1>
                    </div>
                    <p className='text-xs text-gray-400 hidden sm:block'>
                        {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Page content */}
                <div className='flex-1 overflow-y-auto'>
                    {activeTab === 'tasks' && (
                        <div className='p-4 sm:p-6'>
                            <TaskListNumbers data={liveData} />
                            <TaskList
                                data={liveData}
                                markCompleted={markCompleted}
                                markFailed={markFailed}
                                acceptTask={acceptTask}
                            />
                        </div>
                    )}
                    {activeTab === 'attendance' && <Attendance data={liveData} />}
                    {activeTab === 'leaves'     && <Leaves data={liveData} />}
                    {activeTab === 'profile'    && <Profile data={liveData} />}
                </div>
            </div>
        </div>
    )
}

export default EmployeeDashboard
