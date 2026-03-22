import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../useToast';

const Dash = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      showToast(response.data?.message, "success");
      console.log(response.data?.message)
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.log(error);
      showToast(error.response?.data?.message, "error");
      
      // If the token is already invalid/expired on the server, log them out locally anyway
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8f7f4] p-[20px] font-sans text-[#1a1a2e]">
      {/* App Container */}
      <div className="flex w-full max-w-[1240px] h-full min-h-[85vh] bg-white border border-[#e2e0da] rounded-[20px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        
        {/* Sidebar */}
        <div className="w-[300px] border-r border-[#e2e0da] flex flex-col bg-white shrink-0">
          {/* Sidebar Header */}
          <div className="h-[76px] px-5 flex items-center justify-between border-b border-[#e2e0da]">
            <div className="flex items-center gap-2.5">
              <div className="w-[38px] h-[38px] bg-[#4F6EF7] rounded-[10px] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white" />
                </svg>
              </div>
              <span className="font-semibold text-[17px]">Chattio</span>
            </div>
            <div className="flex gap-2">
              <button className="w-[34px] h-[34px] rounded-full border border-[#e2e0da] flex items-center justify-center hover:bg-gray-50 text-gray-500 transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21L16.65 16.65"/></svg>
              </button>
              <button className="w-[34px] h-[34px] rounded-full border border-[#e2e0da] flex items-center justify-center hover:bg-gray-50 text-gray-500 transition-colors">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          </div>

          {/* Sidebar Content (Empty State) */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-center">
            <div className="w-[84px] h-[84px] bg-[#f2f1ee] rounded-full flex items-center justify-center mb-4 text-[#8888aa]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <p className="text-[14px] font-semibold text-[#1a1a2e]">Your chats will appear here</p>
            <p className="text-[12px] text-[#8888aa] mt-1.5 px-4 leading-relaxed">Start exploring by adding a new conversation or waiting for a message.</p>
          </div>

          {/* Sidebar Footer (Profile & Logout) */}
          <div className="h-[76px] px-5 flex items-center justify-between border-t border-[#e2e0da] bg-[#f8f7f4]/40">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-[42px] h-[42px] bg-[#4F6EF7] rounded-full flex items-center justify-center text-white font-semibold text-[13px] tracking-wide shadow-sm">
                  MB
                </div>
                <div className="absolute bottom-0 right-0 w-[14px] h-[14px] bg-[#28c840] border-[2px] border-white rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-[#1a1a2e]">Moaad B.</span>
                <span className="text-[11px] font-medium text-[#28c840]">● Active</span>
              </div>
            </div>
            <button 
                onClick={handleLogout}
                title="Logout"
                className="w-10 h-10 rounded-full border border-[#e2e0da] bg-white flex items-center justify-center text-[#8888aa] hover:border-[#ff5f57] hover:bg-[#fff5f4] hover:text-[#ff5f57] transition-all shadow-sm"
             >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header (Empty State / Dummy) */}
          <div className="h-[76px] px-6 flex items-center justify-between border-b border-[#e2e0da]">
            <div className="flex items-center gap-3">
              <div className="w-[42px] h-[42px] bg-[#f2f1ee] rounded-full flex items-center justify-center text-[#8888aa] font-semibold text-[13px]">
                ?
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-[#1a1a2e]">Select a Chat</span>
                <span className="text-[12px] text-[#8888aa]">Or start a new conversation</span>
              </div>
            </div>
            {/* Dummy Header Actions */}
            <div className="flex gap-2">
                <button className="w-[34px] h-[34px] rounded-[10px] border border-[#e2e0da] flex items-center justify-center hover:bg-gray-50 text-gray-500 transition-colors">
                   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </button>
                <button className="w-[34px] h-[34px] rounded-[10px] border border-[#e2e0da] flex items-center justify-center hover:bg-gray-50 text-gray-500 transition-colors">
                   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                </button>
                <button className="w-[34px] h-[34px] rounded-[10px] border border-[#e2e0da] flex items-center justify-center hover:bg-gray-50 text-gray-500 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 flex flex-col justify-center items-center bg-gray-50/20">
             <div className="w-[100px] h-[100px] bg-[#f8f7f4] rounded-full flex items-center justify-center border border-[#e2e0da] mb-4 shadow-sm">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e2e0da" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
             </div>
             <p className="text-[15px] font-medium text-[#4a4a6a]">It's nice and quiet here...</p>
             <p className="text-[13px] text-[#8888aa] mt-1 text-center max-w-sm">When you choose a chat or start a new one, your messages will appear in this space.</p>
          </div>

          {/* Chat Input Placeholder */}
          <div className="h-[90px] p-5 border-t border-[#e2e0da] bg-white flex items-center gap-3">
            <button className="w-[44px] h-[44px] rounded-[12px] border border-[#e2e0da] flex items-center justify-center hover:bg-gray-50 text-[#8888aa] shrink-0 transition-colors shadow-sm">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <div className="flex-1 h-[46px] border border-[#e2e0da] rounded-[12px] flex items-center px-4 bg-[#fdfcf9] opacity-70">
               <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="w-full h-full bg-transparent outline-none text-[14px] text-[#1a1a2e] placeholder-[#8888aa] cursor-not-allowed" 
                  disabled
               />
               <div className="flex items-center gap-3.5 ml-2 text-[#b0b0cc]">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
               </div>
            </div>
            <button className="w-[46px] h-[46px] rounded-[12px] bg-[#4F6EF7] opacity-60 flex items-center justify-center text-white shrink-0 shadow-sm cursor-not-allowed">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dash;