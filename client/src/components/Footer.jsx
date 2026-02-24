import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h3>NSYSU ITRC</h3>
                        <p>中山大學投資交易研究社<br />系統化課程規劃與實戰操作，培養金融領域核心競爭力。</p>
                    </div>
                    <div>
                        <h4>頁面導覽</h4>
                        <ul className="footer-links">
                            <li><Link to="/">首頁</Link></li>
                            <li><Link to="/achievements">成果發表</Link></li>
                            <li><Link to="/activities">活動紀錄</Link></li>
                            <li><Link to="/plans">活動規劃</Link></li>
                            <li><Link to="/experiences">參與心得</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4>聯絡我們</h4>
                        <ul className="footer-links">
                            <li><a href="mailto:zhongshantouyan@gmail.com">zhongshantouyan@gmail.com</a></li>
                            <li><a href="https://www.instagram.com/nsysu_itrc/" target="_blank" rel="noopener noreferrer">Instagram @nsysu_itrc</a></li>
                            <li><span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>管理學院 CM1037</span></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    © {new Date().getFullYear()} NSYSU Investment & Trading Research Club. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
