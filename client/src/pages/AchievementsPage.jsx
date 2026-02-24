import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import Footer from '../components/Footer';

export default function AchievementsPage() {
    const [data, setData] = useState({ grouped: {} });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/achievements').then(res => {
            setData(res.data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-title-accent">成果發表</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        社團成員的研究成果與期末報告
                    </motion.p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {loading && <div className="loading-spinner" />}
                    {!loading && Object.keys(data.grouped).length === 0 && (
                        <div className="empty-state">
                            <h3>尚無成果資料</h3>
                            <p>管理員可至後台新增成果</p>
                        </div>
                    )}
                    {Object.entries(data.grouped).sort((a, b) => b[0].localeCompare(a[0])).map(([semester, items]) => (
                        <div key={semester} className="semester-group">
                            <div className="semester-title">
                                <span className="semester-badge">{semester}</span>
                                本社團之{semester}學年期末成果
                            </div>
                            <div className="achievement-grid">
                                {items.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        className="card achievement-card"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.05 * idx }}
                                        whileHover={{ y: -4 }}
                                    >
                                        {item.category && <span className="category-tag">{item.category}</span>}
                                        <h3>{item.title}</h3>
                                        {item.description && <p>{item.description}</p>}
                                        {item.link && (
                                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm mt-2">
                                                查看更多
                                            </a>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    );
}
