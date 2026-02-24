import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import Footer from '../components/Footer';

export default function ExperiencesPage() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        api.get('/experiences').then(res => {
            setExperiences(res.data);
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
                        <span className="section-title-accent">參與心得</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                        社員的學習與成長分享
                    </motion.p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {loading && <div className="loading-spinner" />}
                    {!loading && experiences.length === 0 && (
                        <div className="empty-state">
                            <h3>尚無參與心得</h3>
                            <p>管理員可至後台新增心得文章</p>
                        </div>
                    )}
                    <div className="experience-grid">
                        {experiences.map((exp, idx) => (
                            <motion.div
                                key={exp.id}
                                className="card experience-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * idx }}
                                whileHover={{ y: -4 }}
                                onClick={() => setSelected(selected?.id === exp.id ? null : exp)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="experience-author">
                                    <div className="experience-author-avatar">{exp.author?.charAt(0)}</div>
                                    <div>
                                        <div className="experience-author-name">{exp.author}</div>
                                        <div className="experience-author-date">
                                            {new Date(exp.created_at).toLocaleDateString('zh-TW')}
                                        </div>
                                    </div>
                                </div>
                                <h3>{exp.title}</h3>
                                <div className="content-preview" style={selected?.id === exp.id ? { WebkitLineClamp: 'unset' } : {}}>
                                    {exp.content}
                                </div>
                                {exp.content?.length > 200 && (
                                    <div className="text-accent mt-1" style={{ fontSize: '0.85rem' }}>
                                        {selected?.id === exp.id ? '收起' : '閱讀更多...'}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
