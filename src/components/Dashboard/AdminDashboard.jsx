import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'
import AdminAttendance from '../admin/AdminAttendance'
import AdminLeaves from '../admin/AdminLeaves'
import Employees from '../admin/Employees'

const NAV = [
    { id: 'overview',    label: 'Overview',    icon: '📊' },
    { id: 'tasks',       label: 'Tasks',       icon: '📋' },
    { id: 'attendance',  label: 'Attendance',  icon: '🕐' },
    { id: 'leaves',      label: 'Leaves',      icon: '🌿' },
    { id: 'employees',   label: 'Employees',   icon: '👥' },
]

const AdminDashboard = (props) => {
    const [userData] = useContext(AuthContext)
    const [activeTab, setActiveTab] = useState('overview')
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const totalEmployees = userData?.length || 0
    const pendingLeaves = userData?.flatMap(e => e.leaves || []).filter(l => l.status === 'pending').length || 0
    const totalTasks = userData?.flatMap(e => e.tasks || []).length || 0
    const completedTasks = userData?.flatMap(e => e.tasks || []).filter(t => t.completed).length || 0
    const presentToday = userData?.filter(e => e.todayAttendance?.clockIn).length || 0

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
                    <p className='text-xs text-gray-400 uppercase tracking-wider'>Admin Panel</p>
                    <p className='text-sm font-bold text-white mt-1'>Administrator</p>
                    <p className='text-xs text-indigo-400'>admin@example.com</p>
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
                            {item.id === 'leaves' && pendingLeaves > 0 && (
                                <span className='ml-auto bg-amber-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full'>
                                    {pendingLeaves}
                                </span>
                            )}
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
                    {activeTab === 'overview' && (
                        <div className='p-4 sm:p-6'>
                            <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6'>
                                <div className='bg-indigo-600 rounded-2xl p-5'>
                                    <p className='text-3xl font-bold text-white'>{totalEmployees}</p>
                                    <p className='text-sm text-white mt-1'>Employees</p>
                                </div>
                                <div className='bg-emerald-600 rounded-2xl p-5'>
                                    <p className='text-3xl font-bold text-white'>{presentToday}</p>
                                    <p className='text-sm text-white mt-1'>Present Today</p>
                                </div>
                                <div className='bg-amber-500 rounded-2xl p-5'>
                                    <p className='text-3xl font-bold text-white'>{pendingLeaves}</p>
                                    <p className='text-sm text-white mt-1'>Pending Leaves</p>
                                </div>
                                <div className='bg-sky-600 rounded-2xl p-5'>
                                    <p className='text-3xl font-bold text-white'>{completedTasks}/{totalTasks}</p>
                                    <p className='text-sm text-white mt-1'>Tasks Done</p>
                                </div>
                            </div>
                            <AllTask />
                        </div>
                    )}
                    {activeTab === 'tasks'      && <div className='p-4 sm:p-6'><CreateTask /><div className='mt-5'><AllTask /></div></div>}
                    {activeTab === 'attendance' && <AdminAttendance />}
                    {activeTab === 'leaves'     && <AdminLeaves />}
                    {activeTab === 'employees'  && <Employees />}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
