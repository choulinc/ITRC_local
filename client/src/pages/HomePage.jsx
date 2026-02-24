import { useState, useEffect } from 'react';
import api from '../api';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import CourseInfo from '../components/CourseInfo';
import ProfessorSection from '../components/ProfessorSection';
import MemberList from '../components/MemberList';
import Footer from '../components/Footer';

export default function HomePage() {
    const [sections, setSections] = useState({});
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [secRes, memRes] = await Promise.all([
                    api.get('/sections'),
                    api.get('/members'),
                ]);
                const secMap = {};
                secRes.data.forEach(s => { secMap[s.key] = s; });
                setSections(secMap);
                setMembers(memRes.data);
            } catch (err) {
                console.error('Failed to fetch data:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <div className="loading-spinner" style={{ minHeight: '100vh', alignItems: 'center' }} />;

    return (
        <>
            <HeroSection
                heroTitle={sections.hero_title?.content}
                heroSubtitle={sections.hero_subtitle?.content}
            />
            <AboutSection content={sections.course_intro?.content} />
            <CourseInfo info={sections.course_info?.content} />
            <ProfessorSection />
            <MemberList members={members} />
            <Footer />
        </>
    );
}
