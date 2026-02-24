const bcrypt = require('bcryptjs');
const db = require('./db');

console.log('Seeding database...');

// Create admin user
const passwordHash = bcrypt.hashSync('admin123', 10);
const existingUser = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
if (!existingUser) {
    db.prepare('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)').run('admin', passwordHash, 'admin');
    console.log('✓ Admin user created (admin / admin123)');
} else {
    console.log('⊘ Admin user already exists');
}

// Seed sections
const sections = [
    {
        key: 'course_intro',
        title: '課程簡介',
        content: '中山投研社透過系統化課程、案例討論與期末競賽，結合理論與市場實務，提升成員投資研究與理財規劃能力，並藉由師資指導、資源共享與團隊合作，培養金融領域核心競爭力。'
    },
    {
        key: 'course_info',
        title: '課程資訊 Info.',
        content: JSON.stringify({
            time: '每週五 18:00 - 21:00',
            location: '管理學院 CM1037',
            coordinators: '張大恒、李沁彤、許筠采',
            email: 'zhongshantouyan@gmail.com',
            ig: 'nsysu_itrc'
        })
    },
    {
        key: 'hero_title',
        title: 'Hero 標題',
        content: '中山大學投資交易研究社'
    },
    {
        key: 'hero_subtitle',
        title: 'Hero 副標題',
        content: 'NSYSU Investment & Trading Research Club, ITRC'
    }
];

const insertSection = db.prepare('INSERT OR IGNORE INTO sections (key, title, content) VALUES (?, ?, ?)');
sections.forEach(s => {
    insertSection.run(s.key, s.title, s.content);
});
console.log('✓ Sections seeded');

// Seed achievements
const achievements = [
    { semester: '114-1', title: '加密貨幣 期末分享', category: '加密貨幣', order_num: 1 },
    { semester: '114-1', title: '台股 期末分享', category: '台股', order_num: 2 },
    { semester: '114-1', title: '台股2 期末分享', category: '台股', order_num: 3 },
    { semester: '114-1', title: '台股3 期末分享', category: '台股', order_num: 4 },
    { semester: '114-1', title: '台股4 期末分享', category: '台股', order_num: 5 },
    { semester: '114-1', title: '美股 期末分享', category: '美股', order_num: 6 },
    { semester: '114-1', title: '美股2 期末分享', category: '美股', order_num: 7 },
];

const existingAchievements = db.prepare('SELECT COUNT(*) as count FROM achievements').get();
if (existingAchievements.count === 0) {
    const insertAchievement = db.prepare('INSERT INTO achievements (semester, title, category, order_num) VALUES (?, ?, ?, ?)');
    achievements.forEach(a => {
        insertAchievement.run(a.semester, a.title, a.category, a.order_num);
    });
    console.log('✓ Achievements seeded');
} else {
    console.log('⊘ Achievements already exist');
}

// Seed sample members
const members = [
    { name: '張大恒', role: '召集人', order_num: 1 },
    { name: '李沁彤', role: '召集人', order_num: 2 },
    { name: '許筠采', role: '召集人', order_num: 3 },
];

const existingMembers = db.prepare('SELECT COUNT(*) as count FROM members').get();
if (existingMembers.count === 0) {
    const insertMember = db.prepare('INSERT INTO members (name, role, order_num) VALUES (?, ?, ?)');
    members.forEach(m => {
        insertMember.run(m.name, m.role, m.order_num);
    });
    console.log('✓ Members seeded');
} else {
    console.log('⊘ Members already exist');
}

// Seed activity plans
const activityPlans = [
    { type: 'plan', date: '114年09月26日(五)', title: '社課介紹+破冰遊戲', speaker: '張大恒 社長' },
    { type: 'plan', date: '114年10月03日(五)', title: '投資與交易的本質', speaker: '張大恒 社長' },
    { type: 'plan', date: '114年10月10日 (五)', title: '國慶放假', speaker: '', description: '國慶放假' },
    { type: 'plan', date: '114年10月17日(五)', title: '投資技術分析', speaker: '王昭文 教授' },
    { type: 'plan', date: '114年10月21日(二)', title: '2025永續金融科技創新投資國際論壇', speaker: '專家學者與業內人士' },
    { type: 'plan', date: '114年10月24日(五)', title: '光復節補假', speaker: '', description: '光復節補假' },
    { type: 'plan', date: '114年10月31日(五)', title: '加密貨幣：Web3.0與交易策略', speaker: 'Ourbit團隊講師' },
    { type: 'plan', date: '114年11月07日(五)', title: '估值與投資', speaker: 'Freddy Chen' },
    { type: 'plan', date: '114年11月14日(五)', title: '基本面分析的經驗分享', speaker: 'Vincent Cheng-Wen Yu' },
    { type: 'plan', date: '114年11月21日(五)', title: 'STO證券型代幣發行', speaker: '簡憶伶 襄理' },
    { type: 'plan', date: '114年12月05日 (五)', title: '期末成果發表及媒合會', speaker: '張大恒 社長' },
];

const existingActivities = db.prepare('SELECT COUNT(*) as count FROM activities').get();
if (existingActivities.count === 0) {
    const insertActivity = db.prepare('INSERT INTO activities (type, date, title, speaker, description) VALUES (?, ?, ?, ?, ?)');
    activityPlans.forEach(a => {
        insertActivity.run(a.type, a.date, a.title, a.speaker || null, a.description || null);
    });
    console.log('✓ Activity plans seeded');
} else {
    console.log('⊘ Activities already exist');
}

console.log('Seeding complete!');

