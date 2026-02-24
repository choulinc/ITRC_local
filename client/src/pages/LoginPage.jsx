import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await api.post('/auth/login', { username, password });
            login(res.data.token, res.data.user);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.error || '登入失敗');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2><span className="section-title-accent">管理員登入</span></h2>
                <p className="login-subtitle">ITRC Content Management System</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>帳號</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="請輸入管理員帳號"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>密碼</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="請輸入密碼"
                            required
                        />
                    </div>
                    {error && <div className="login-error">{error}</div>}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                        {loading ? '登入中...' : '登入'}
                    </button>
                </form>
            </div>
        </div>
    );
}
