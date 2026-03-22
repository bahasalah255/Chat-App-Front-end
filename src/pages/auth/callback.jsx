// src/pages/auth/callback.jsx (or wherever your router points)
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
        const pathToken = window.location.pathname
            .split('/')
            .filter(Boolean)
            .slice(2)
            .join('') || null;
        const rawToken =
            params.get('token') ||
            params.get('access_token') ||
            params.get('auth_token') ||
            params.get('accessToken') ||
            hashParams.get('token') ||
            hashParams.get('access_token') ||
            hashParams.get('auth_token') ||
            hashParams.get('accessToken') ||
            pathToken;

        const token = rawToken ? decodeURIComponent(rawToken).trim() : '';
        const existingToken =
            localStorage.getItem('token') ||
            localStorage.getItem('auth_token') ||
            '';

        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('auth_token', token);
            navigate('/dash', { replace: true });
        } else if (existingToken) {
            localStorage.setItem('token', existingToken);
            localStorage.setItem('auth_token', existingToken);
            navigate('/dash', { replace: true });
        } else {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    return <p>Logging you in...</p>;
}