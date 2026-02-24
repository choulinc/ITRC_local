import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AboutSection({ content }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="section" id="about" ref={ref}>
            <div className="container">
                <motion.div
                    className="quote-block"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="quote-mark" aria-hidden="true">
                        <svg width="64" height="52" viewBox="0 0 64 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 52V34.667C0 28.444 1.111 22.889 3.333 18C5.556 13.111 8.667 8.889 12.667 5.333L22 0C19.333 4.444 17.333 8.889 16 13.333C14.667 17.778 14 22.222 14 26.667H26V52H0ZM38 52V34.667C38 28.444 39.111 22.889 41.333 18C43.556 13.111 46.667 8.889 50.667 5.333L60 0C57.333 4.444 55.333 8.889 54 13.333C52.667 17.778 52 22.222 52 26.667H64V52H38Z" fill="#4d7ea8" />
                        </svg>
                    </div>
                    <p className="quote-text">
                        {content || '中山投研社透過系統化的課程規劃與實戰操作，提升成員在投資研究與理財規劃上的專業能力。'}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
