// UserPickerModal.jsx
import React,{useState, useEffect} from 'react';
import axios from "axios";
export default function UserPickerModal({ isOpen, onClose, onConfirm }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [name,setname] = useState(null);
  const [users,setusers] = useState([]);
  
  useEffect(() => {
    
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setusers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    fetchUsers();
  },[])
  
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={onClose} // close on backdrop click
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-3 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-medium text-gray-900">Choose a user Conversation</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* User list */}
        <div className="max-h-72 overflow-y-auto px-2 py-2">
          {filtered.map(user => (
            <div
              key={user.id}
              onClick={() => {setSelected(user.id)
                setname(user.name)
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors
                ${selected === user.id ? "bg-blue-50" : "hover:bg-gray-50"}`}
            >
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-medium shrink-0">
                <img  src={`http://127.0.0.1:8000/storage/${user.avatar_url}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0
                ${selected === user.id ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}>
                {selected === user.id && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 10 10">
                    <polyline points="1.5,5 4,7.5 8.5,2.5" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {name ? `${name} selected` : "No user selected"}
          </span>
          <button
            onClick={() => { onConfirm(selected); onClose(); }}
            disabled={!selected}
            className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded-lg font-medium disabled:opacity-40"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}