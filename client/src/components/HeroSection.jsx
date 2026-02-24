import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const bgImages = [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&q=80',
];

export default function HeroSection({ heroTitle, heroSubtitle }) {
    const [currentBg, setCurrentBg] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % bgImages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const particles = useMemo(() =>
        Array.from({ length: 25 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: `${Math.random() * 6}s`,
            duration: `${4 + Math.random() * 4}s`,
        })), []
    );

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero" id="hero">
            <div className="hero-bg">
                {bgImages.map((img, i) => (
                    <div
                        key={i}
                        className="hero-bg-image"
                        style={{
                            backgroundImage: `url(${img})`,
                            opacity: currentBg === i ? 1 : 0,
                        }}
                    />
                ))}
                <div className="hero-overlay" />
            </div>

            <div className="hero-particles">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="hero-particle"
                        style={{
                            left: p.left,
                            top: p.top,
                            animationDelay: p.delay,
                            animationDuration: p.duration,
                        }}
                    />
                ))}
            </div>

            <div className="hero-content">
                <motion.div
                    className="hero-badge"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    NSYSU ITRC
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {heroTitle || '中山大學投資交易研究社'}
                </motion.h1>

                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    {heroSubtitle || 'NSYSU Investment & Trading Research Club, ITRC'}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <button className="btn btn-primary" onClick={scrollToAbout} style={{ marginRight: 12 }}>
                        探索更多
                    </button>
                    <a href="https://www.instagram.com/nsysu_itrc/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                        Instagram
                    </a>
                </motion.div>
            </div>

            <div className="hero-scroll" onClick={scrollToAbout}>
                <span>SCROLL</span>
                <div className="hero-scroll-line" />
            </div>
        </section>
    );
}
