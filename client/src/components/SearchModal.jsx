import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const typeLabels = {
    section: '頁面內容',
    achievement: '成果發表',
    activity: '活動',
    experience: '參與心得',
    member: '社團成員',
};

export default function SearchModal({ onClose }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        inputRef.current?.focus();
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    useEffect(() => {
        if (!query.trim()) { setResults([]); return; }
        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await api.get('/search', { params: { q: query } });
                setResults(res.data.results);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    const handleResultClick = (item) => {
        onClose();
        switch (item.type) {
            case 'achievement': navigate('/achievements'); break;
            case 'activity': navigate('/activities'); break;
            case 'experience': navigate('/experiences'); break;
            case 'member': navigate('/', { state: { scrollTo: 'members' } }); break;
            default: navigate('/');
        }
    };

    return (
        <div className="search-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <button className="search-close" onClick={onClose}>×</button>
            <div className="search-container">
                <div className="search-input-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        className="search-input"
                        placeholder="搜尋社團內容..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <div className="search-results">
                    {loading && <div className="loading-spinner" />}
                    {!loading && results.length === 0 && query.trim() && (
                        <div className="empty-state" style={{ padding: '40px 0' }}>
                            <p>找不到「{query}」的相關結果</p>
                        </div>
                    )}
                    {results.map((item, idx) => (
                        <div key={`${item.type}-${item.id}-${idx}`} className="search-result-item" onClick={() => handleResultClick(item)}>
                            <div className="search-result-type">{typeLabels[item.type] || item.type}</div>
                            <div className="search-result-title">{item.title}</div>
                            {item.snippet && <div className="search-result-snippet">{item.snippet}</div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
