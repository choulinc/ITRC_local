import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import Footer from '../components/Footer';

export default function ActivityPlansPage() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/activities', { params: { type: 'plan' } }).then(res => {
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
                        <span className="section-title-accent">活動規劃</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                        本學期活動與課程安排
                    </motion.p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {loading && <div className="loading-spinner" />}
                    {!loading && activities.length === 0 && (
                        <div className="empty-state">
                            <h3>目前沒有規劃中的活動</h3>
                            <p>管理員可至後台新增活動規劃</p>
                        </div>
                    )}
                    {!loading && activities.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="plans-table-wrapper">
                                <table className="plans-table">
                                    <thead>
                                        <tr>
                                            <th>日期</th>
                                            <th>主題</th>
                                            <th>主講人</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activities.map((activity, idx) => (
                                            <motion.tr
                                                key={activity.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.03 * idx }}
                                            >
                                                <td className="plans-date">{activity.date || ''}</td>
                                                <td className="plans-title">
                                                    {activity.title}
                                                    {activity.description && (
                                                        <span className="plans-desc">{activity.description}</span>
                                                    )}
                                                </td>
                                                <td className="plans-speaker">{activity.speaker || ''}</td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}
