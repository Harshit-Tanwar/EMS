import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { ClipboardList, Clock, Leaf, User, LogOut, Menu, X } from 'lucide-react'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'
import Attendance from '../employee/Attendance'
import Leaves from '../employee/Leaves'
import Profile from '../employee/Profile'

const NAV = [
    { id: 'tasks',      label: 'Tasks',      Icon: ClipboardList },
    { id: 'attendance', label: 'Attendance', Icon: Clock },
    { id: 'leaves',     label: 'Leaves',     Icon: Leaf },
    { id: 'profile',    label: 'Profile',    Icon: User },
]

const EmployeeDashboard = (props) => {
    const [userData, setUserData] = useContext(AuthContext)
    const [activeTab, setActiveTab] = useState('tasks')
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const updateTaskStatus = (taskTitle, updates, countChanges) => {
        setUserData(userData.map(employee => {
            if (employee.id !== props.data.id) return employee
            return {
                ...employee,
                tasks: employee.tasks.map(task => task.taskTitle === taskTitle ? { ...task, ...updates } : task),
                taskCounts: {
                    ...employee.taskCounts,
                    ...Object.fromEntries(Object.entries(countChanges).map(([k, d]) => [k, employee.taskCounts[k] + d]))
                }
            }
        }))
    }

    const markCompleted = t => updateTaskStatus(t, { active: false, completed: true }, { active: -1, completed: 1 })
    const markFailed    = t => updateTaskStatus(t, { active: false, failed: true },    { active: -1, failed: 1 })
    const acceptTask    = t => updateTaskStatus(t, { newTask: false, active: true },   { newTask: -1, active: 1 })

    const liveData = userData?.find(e => e.id === props.data.id) || props.data
    const initials = `${liveData.firstName?.[0] || ''}${liveData.lastName?.[0] || ''}`.toUpperCase()

    return (
        <div className='flex h-screen bg-slate-100 overflow-hidden'>
            {sidebarOpen && (
                <div className='fixed inset-0 bg-slate-900/30 z-20 sm:hidden' onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed sm:static z-30 sm:z-auto w-60 h-full bg-white border-r border-slate-200
                flex flex-col transition-transform duration-200
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
            `}>
                <div className='px-5 py-5 border-b border-slate-100'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm'>
                            {initials}
                        </div>
                        <div>
                            <p className='text-base font-bold text-slate-800'>{liveData.firstName} {liveData.lastName || ''}</p>
                            <p className='text-xs text-indigo-500 font-medium'>{liveData.role || 'Employee'}</p>
                        </div>
                    </div>
                </div>
                <nav className='flex-1 px-3 py-4 flex flex-col gap-0.5'>
                    {NAV.map(({ id, label, Icon }) => (
                        <button
                            key={id}
                            onClick={() => { setActiveTab(id); setSidebarOpen(false) }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-left w-full
                                ${activeTab === id ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
                        >
                            <Icon size={17} />
                            {label}
                        </button>
                    ))}
                </nav>
                <div className='px-3 py-4 border-t border-slate-100'>
                    <button
                        onClick={() => { localStorage.setItem('loggedInUser', ''); props.changeUser('') }}
                        className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-50 transition-colors'
                    >
                        <LogOut size={17} /> Log Out
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className='flex-1 flex flex-col overflow-hidden'>
                <div className='flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200 bg-white shadow-sm'>
                    <div className='flex items-center gap-3'>
                        <button className='sm:hidden text-slate-400 hover:text-slate-700' onClick={() => setSidebarOpen(!sidebarOpen)}>
                            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                        <h1 className='text-lg font-bold text-slate-800'>
                            {NAV.find(n => n.id === activeTab)?.label}
                        </h1>
                    </div>
                    <p className='text-sm text-slate-400 hidden sm:block'>
                        {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                <div className='flex-1 overflow-y-auto'>
                    {activeTab === 'tasks' && (
                        <div className='p-4 sm:p-6'>
                            <TaskListNumbers data={liveData} />
                            <TaskList data={liveData} markCompleted={markCompleted} markFailed={markFailed} acceptTask={acceptTask} />
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
