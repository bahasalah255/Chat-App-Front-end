import React, { useState } from 'react';

function Login() {
    const [message, setmessage] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleadd = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                setmessage(data.message)
                setTimeout(() => {
                    setmessage('')
                }, 3000);
            })
            .catch(data => console.log(data.message))
    }

    return (
        <div className="flex items-center justify-center min-h-screen  px-4 py-6">
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
                {/* Browser Bar */}
                <div className="bg-gray-100 border-b border-gray-200 px-3 py-2.5 flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 flex items-center gap-1.5 ml-2">
                       
                       
                    </div>
                </div>

                {/* Auth Body */}
                <div className="px-8 py-10 flex flex-col items-center">
                    {/* Logo */}
                    <div className="w-11 h-11 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white" />
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-gray-900 mb-1 text-center">Welcome back</h2>
                    <p className="text-sm text-gray-500 mb-7 text-center">Sign in to your account to continue</p>

                    {/* Error Message */}
                    {message && (
                        <div className="w-full max-w-sm px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg text-success-600 text-xs text-center mb-3.5">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleadd} className="w-full">
                        {/* Email Group */}
                        <div className="w-full max-w-sm mx-auto mb-3.5">
                            <label className="text-xs font-medium text-gray-600 block mb-1.5">Email address</label>
                            <div className="h-10 border border-gray-300 rounded-lg bg-slate-50 px-3 py-2 flex items-center gap-2 focus-within:border-indigo-600 focus-within:bg-indigo-50">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" stroke="#4F6EF7" strokeWidth="1.5" />
                                    <path d="M2 6L12 13L22 6" stroke="#4F6EF7" strokeWidth="1.5" />
                                </svg>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="moaad@example.com"
                                    className="flex-1 text-sm text-gray-900 placeholder-gray-500 bg-transparent outline-none"
                                    onChange={(e) => setemail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Group */}
                        <div className="w-full max-w-sm mx-auto mb-4.5">
                            <label className="text-xs font-medium text-gray-600 block mb-1.5">Password</label>
                            <div className="h-10 border border-gray-300 rounded-lg bg-slate-50 px-3 py-2 flex items-center gap-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="#6b7280" strokeWidth="1.5" />
                                    <path d="M7 11V7a5 5 0 0110 0v4" stroke="#6b7280" strokeWidth="1.5" />
                                </svg>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••••"
                                    className="flex-1 text-sm text-gray-900 placeholder-gray-500 bg-transparent outline-none"
                                    onChange={(e) => setpassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-xs text-indigo-600 font-medium hover:text-indigo-700 cursor-pointer"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="w-full max-w-sm mx-auto flex justify-end mb-4.5">
                            <a href="#forgot" className="text-xs text-indigo-600 font-medium hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="w-full max-w-sm mx-auto h-10.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-700 text-white font-semibold rounded-lg px-4 mb-5 flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M15 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H15M10 17L15 12L10 7M15 12H3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Sign in
                        </button>

                        {/* Divider */}
                        <div className="w-full max-w-sm mx-auto flex items-center gap-3 mb-4">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="text-xs text-gray-500 whitespace-nowrap">or continue with</span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        {/* Google Button */}
                        <button
                            type="button"
                            className="w-full max-w-sm mx-auto h-10 bg-white hover:bg-slate-50 border border-gray-300 hover:border-indigo-600 text-gray-600 font-medium rounded-lg px-4 mb-6 flex items-center justify-center gap-2 transition-all"
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>

                        {/* Account Link */}
                        <p className="text-sm text-gray-500 text-center">
                            Don't have an account? <a href="#register" className="text-indigo-600 font-medium hover:underline">Create one</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
