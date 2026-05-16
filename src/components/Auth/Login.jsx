import { useState } from 'react'
import { Users, Mail, Lock, ArrowRight } from 'lucide-react'

const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        handleLogin(email, password)
        setEmail('')
        setPassword('')
    }

    return (
        <div className='flex h-screen w-screen items-center justify-center bg-slate-100 px-4'>
            <div className='bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-md w-full max-w-md'>
                <div className='mb-8 text-center'>
                    <div className='w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md'>
                        <Users size={28} color='white' />
                    </div>
                    <h1 className='text-3xl font-bold text-slate-800'>Welcome Back</h1>
                    <p className='text-slate-400 mt-2 text-base'>Sign in to your EMS account</p>
                </div>

                {/* Demo credentials */}
                <div className='mb-6 rounded-xl bg-slate-50 border border-slate-200 p-4'>
                    <p className='text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3'>Quick Login</p>
                    <div className='flex flex-col gap-2'>
                        <button
                            type='button'
                            onClick={() => { setEmail('admin@example.com'); setPassword('123') }}
                            className='flex items-center justify-between bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-xl px-4 py-3 text-left'
                        >
                            <div>
                                <p className='text-sm font-semibold text-white'>Admin</p>
                                <p className='text-xs text-indigo-200'>admin@example.com · 123</p>
                            </div>
                            <ArrowRight size={16} color='white' className='opacity-70' />
                        </button>
                        <button
                            type='button'
                            onClick={() => { setEmail('e@e.com'); setPassword('123') }}
                            className='flex items-center justify-between bg-white hover:bg-slate-50 border border-slate-200 transition-colors rounded-xl px-4 py-3 text-left'
                        >
                            <div>
                                <p className='text-sm font-semibold text-slate-700'>Employee — Arjun</p>
                                <p className='text-xs text-slate-400'>e@e.com · 123</p>
                            </div>
                            <ArrowRight size={16} className='text-slate-400' />
                        </button>
                    </div>
                </div>

                <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm text-slate-600 font-semibold flex items-center gap-1.5'>
                            <Mail size={14} className='text-slate-400' /> Email
                        </label>
                        <input
                            value={email} onChange={e => setEmail(e.target.value)} required
                            className='outline-none bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:bg-white text-base text-slate-800 py-3 px-4 rounded-xl placeholder:text-slate-300 transition-colors'
                            type='email' placeholder='admin@example.com'
                        />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm text-slate-600 font-semibold flex items-center gap-1.5'>
                            <Lock size={14} className='text-slate-400' /> Password
                        </label>
                        <input
                            value={password} onChange={e => setPassword(e.target.value)} required
                            className='outline-none bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:bg-white text-base text-slate-800 py-3 px-4 rounded-xl placeholder:text-slate-300 transition-colors'
                            type='password' placeholder='••••••••'
                        />
                    </div>
                    <button className='mt-2 text-white font-semibold bg-indigo-600 hover:bg-indigo-700 text-base py-3 px-8 w-full rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2'>
                        Sign In <ArrowRight size={18} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
