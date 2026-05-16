import React, { useState } from 'react'

const Login = ({handleLogin}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const submitHandler = (e)=>{
        e.preventDefault()
        handleLogin(email,password)
        setEmail("")
        setPassword("")
    }
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-[#0f0f13] px-4'>
        <div className='bg-[#1a1a24] border border-indigo-500/30 rounded-2xl p-8 sm:p-12 shadow-2xl shadow-indigo-900/20 w-full max-w-md'>
            <div className='mb-8 text-center'>
                <h1 className='text-2xl sm:text-3xl font-bold text-white'>Welcome Back</h1>
                <p className='text-gray-400 mt-2 text-sm'>Sign in to your EMS account</p>
            </div>

            {/* Demo credentials */}
            <div className='mb-6 rounded-xl bg-[#0f0f13] border border-white/10 p-4'>
                <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3'>Demo Credentials</p>
                <div className='flex flex-col gap-2'>
                    <button
                        type='button'
                        onClick={() => { setEmail('admin@example.com'); setPassword('123') }}
                        className='flex items-center justify-between bg-indigo-600 hover:bg-indigo-500 transition-colors rounded-lg px-3 py-2 text-left'
                    >
                        <div>
                            <p className='text-xs font-semibold text-white'>Admin</p>
                            <p className='text-xs text-indigo-200'>admin@example.com · 123</p>
                        </div>
                        <span className='text-xs text-indigo-200'>Click to fill →</span>
                    </button>
                    <button
                        type='button'
                        onClick={() => { setEmail('e@e.com'); setPassword('123') }}
                        className='flex items-center justify-between bg-[#1a1a2e] hover:bg-[#22223a] border border-white/10 transition-colors rounded-lg px-3 py-2 text-left'
                    >
                        <div>
                            <p className='text-xs font-semibold text-white'>Employee (Arjun)</p>
                            <p className='text-xs text-gray-400'>e@e.com · 123</p>
                        </div>
                        <span className='text-xs text-gray-500'>Click to fill →</span>
                    </button>
                </div>
            </div>

            <form 
            onSubmit={(e)=>{
                submitHandler(e)
            }}
            className='flex flex-col gap-4'
            >
                <div className='flex flex-col gap-1'>
                    <label className='text-xs text-gray-400 font-medium uppercase tracking-wider'>Email</label>
                    <input 
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    required 
                    className='outline-none bg-[#0f0f13] border border-indigo-500/40 focus:border-indigo-500 font-medium text-base py-3 px-5 rounded-xl placeholder:text-gray-600 transition-colors' type="email" placeholder='admin@example.com' 
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-xs text-gray-400 font-medium uppercase tracking-wider'>Password</label>
                    <input
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    required 
                    className='outline-none bg-[#0f0f13] border border-indigo-500/40 focus:border-indigo-500 font-medium text-base py-3 px-5 rounded-xl placeholder:text-gray-600 transition-colors' type="password" placeholder='••••••••' />
                </div>
                <button className='mt-3 text-white border-none outline-none font-semibold bg-indigo-600 hover:bg-indigo-500 text-base py-3 px-8 w-full rounded-xl transition-colors shadow-lg shadow-indigo-900/40'>Sign In</button>
            </form>
        </div>
    </div>
  )
}

export default Login