import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import Footer from '../components/Footer';

export default function ActivityRecordsPage() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/activities', { params: { type: 'record' } }).then(res => {
            setActivities(res.data);
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
                        <span className="section-title-accent">活動紀錄</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                        社團活動的精彩回顧
                    </motion.p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {loading && <div className="loading-spinner" />}
                    {!loading && activities.length === 0 && (
                        <div className="empty-state">
                            <h3>尚無活動紀錄</h3>
                            <p>管理員可至後台新增活動紀錄</p>
                        </div>
                    )}
                    <div className="timeline">
                        {activities.map((activity, idx) => (
                            <motion.div
                                key={activity.id}
                                className="timeline-item"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * idx }}
                            >
                                <div className="timeline-dot" />
                                {activity.date && <div className="timeline-date">{activity.date}</div>}
                                <div className="timeline-content">
                                    <h3>{activity.title}</h3>
                                    {activity.description && <p>{activity.description}</p>}
                                    {activity.image_url && (
                                        <img src={activity.image_url} alt={activity.title}
                                            style={{ width: '100%', borderRadius: 8, marginTop: 12, maxHeight: 300, objectFit: 'cover' }} />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
