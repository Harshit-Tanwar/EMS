import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { LayoutDashboard, ClipboardList, Clock, Leaf, Users, LogOut, Menu, X } from 'lucide-react'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'
import AdminAttendance from '../admin/AdminAttendance'
import AdminLeaves from '../admin/AdminLeaves'
import Employees from '../admin/Employees'

const NAV = [
    { id: 'overview',   label: 'Overview',   Icon: LayoutDashboard },
    { id: 'tasks',      label: 'Tasks',      Icon: ClipboardList },
    { id: 'attendance', label: 'Attendance', Icon: Clock },
    { id: 'leaves',     label: 'Leaves',     Icon: Leaf },
    { id: 'employees',  label: 'Employees',  Icon: Users },
]

const AdminDashboard = (props) => {
    const [userData] = useContext(AuthContext)
    const [activeTab, setActiveTab] = useState('overview')
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const totalEmployees = userData?.length || 0
    const pendingLeaves  = userData?.flatMap(e => e.leaves || []).filter(l => l.status === 'pending').length || 0
    const totalTasks     = userData?.flatMap(e => e.tasks || []).length || 0
    const completedTasks = userData?.flatMap(e => e.tasks || []).filter(t => t.completed).length || 0
    const presentToday   = userData?.filter(e => e.todayAttendance?.clockIn).length || 0

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
                        <div className='w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm'>
                            <Users size={18} color='white' />
                        </div>
                        <div>
                            <p className='text-base font-bold text-slate-800'>Administrator</p>
                            <p className='text-xs text-indigo-500 font-medium'>Admin Panel</p>
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
                            {id === 'leaves' && pendingLeaves > 0 && (
                                <span className='ml-auto bg-amber-400 text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none'>
                                    {pendingLeaves}
                                </span>
                            )}
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
                    {activeTab === 'overview' && (
                        <div className='p-4 sm:p-6'>
                            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6'>
                                <div className='bg-indigo-600 rounded-2xl p-5 shadow-sm'>
                                    <p className='text-4xl font-bold text-white'>{totalEmployees}</p>
                                    <p className='text-sm text-indigo-200 mt-1 font-medium'>Employees</p>
                                </div>
                                <div className='bg-emerald-500 rounded-2xl p-5 shadow-sm'>
                                    <p className='text-4xl font-bold text-white'>{presentToday}</p>
                                    <p className='text-sm text-emerald-100 mt-1 font-medium'>Present Today</p>
                                </div>
                                <div className='bg-amber-400 rounded-2xl p-5 shadow-sm'>
                                    <p className='text-4xl font-bold text-white'>{pendingLeaves}</p>
                                    <p className='text-sm text-amber-100 mt-1 font-medium'>Pending Leaves</p>
                                </div>
                                <div className='bg-sky-500 rounded-2xl p-5 shadow-sm'>
                                    <p className='text-4xl font-bold text-white'>{completedTasks}<span className='text-xl text-sky-200'>/{totalTasks}</span></p>
                                    <p className='text-sm text-sky-100 mt-1 font-medium'>Tasks Done</p>
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
