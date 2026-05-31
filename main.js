/* ==========================================================================
   1. General Setup & Smooth Scroll
   ========================================================================== */

document.documentElement.classList.add('js-loaded');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarToggler && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});

/* ==========================================================================
   2. Project Modals Logic
   ========================================================================== */

window.openProject = function(projectId) {
    const container = document.getElementById('project-details-container');
    const content = document.getElementById(projectId + '-content');

    if (!container || !content) return;

    container.classList.remove('d-none');
    container.classList.add('d-flex');

    requestAnimationFrame(() => {
        container.classList.add('active');
    });

    document.querySelectorAll('.project-details-content').forEach(el => {
        el.classList.add('d-none');
        el.classList.remove('active-content');
    });

    content.classList.remove('d-none');
    
    setTimeout(() => {
        content.classList.add('active-content');
    }, 50);

    document.body.style.overflow = 'hidden';
};

window.closeProject = function() {
    const container = document.getElementById('project-details-container');
    if (!container) return;

    container.classList.remove('active');
    document.querySelectorAll('.project-details-content').forEach(el => {
        el.classList.remove('active-content');
    });

    setTimeout(() => {
        container.classList.remove('d-flex');
        container.classList.add('d-none');
        document.querySelectorAll('.project-details-content').forEach(el => {
            el.classList.add('d-none');
        });
        document.body.style.overflow = 'auto';
    }, 400); 
};

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('project-details-container');
    if (container) {
        container.addEventListener('click', function(e) {
            if (e.target === this) closeProject();
        });
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeProject();
});

/* ==========================================================================
   3. TagCanvas (Hero Skill Cloud)
   ========================================================================== */

window.addEventListener('load', function() {
    try {
        if(typeof TagCanvas !== 'undefined') {
            TagCanvas.Start('myCanvas', 'tags', {
                textColour: '#2D2E4E',
                outlineColour: 'transparent',
                reverse: true,
                depth: 0.8,
                maxSpeed: 0.05,
                initial: [0.1, -0.1],
                wheelZoom: false,
                imageScale: 1,
                fadeIn: 1000,
                clickToFront: 600,
                shape: 'sphere'
            });
        }
    } catch(e) {
        const canvasContainer = document.getElementById('myCanvasContainer');
        const tagsList = document.getElementById('tags');
        if(canvasContainer) canvasContainer.style.display = 'none';
        if(tagsList) tagsList.style.display = 'block';
    }
});

/* ==========================================================================
   4. Scroll Reveal Animations
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll(
        '.reveal-section, .reveal-grid, .stagger-item, .fade-up, .big-contact-bg-text, .reveal-slide-right, .slide-from-left, .slide-from-right'
    );

    elementsToReveal.forEach(el => observer.observe(el));
});

/* ==========================================================================
   5. Language Toggle Logic & Dictionary
   ========================================================================== */

// --- LANGUAGE TOGGLE LOGIC ---
    const translations = {
        en: {
            nav_home: "HOME", nav_about: "ABOUT", nav_projects: "PROJECTS", nav_contact: "CONTACT",
            name_main: "LIHI HARARY", hero_subtitle: "Design & Technology",
            hero_text: "B.A. student in Learning Technologies at HIT, specializing in UX/UI design. <br> Skilled in user-centered design, wireframing, and prototyping with Figma.",
            btn_projects: "Projects", btn_about: "About Me", btn_contact: "Contact Me",
            card_name: "Lihi Harary", card_role: "UX/UI DESIGN & DEV", btn_cv: "Download CV",
            about_title: "About Me",
            about_text: "Third-year <strong>Instructional Technologies</strong> student at HIT, specializing in <strong>UX/UI design</strong> and <strong>web development</strong>. Passionate about combining creativity with analytical thinking to craft clear, user-centered digital experiences.",
            core_competencies: "Core Competencies",
            comp_ux: "UX/UI Design", desc_ux: "Wireframing, prototyping, and designing intuitive interfaces.",
            comp_game: "Game Dev", desc_game: "Interactive experiences in Unity & C#.",
            comp_web: "Web Dev", desc_web: "Responsive websites using HTML, CSS, JS.",
            comp_edu: "E-Learning", desc_edu: "Instructional design with Storyline & Rise.",
            degree_title: "B.A. in Instructional Technologies", degree_inst: "Holon Institute of Technology (HIT)", degree_year: "2023 - Present",
            proj_title_sel: "Selected", proj_title_proj: "Projects", proj_subtitle: "A selection of interactive, design-driven and technology-based projects",
            contact_bg: "Contact", contact_ready: "Ready to start something new?", contact_chat: "Let's Chat",
            label_email: "Email", label_social: "Social", label_loc: "Location", val_loc: "Ramat Gan, Israel",
            form_name: "Name", form_comp: "Company (Optional)", form_email: "Email", form_phone: "Phone", form_msg: "Have a project in mind?  I'd love to hear about it", form_send: "Send Message",
            
            // Project Cards
            cat_gamedev: "Game Dev", cat_webdev: "Web Dev", cat_aitool: "AI Tool", cat_elearning: "E-Learning", cat_branding: "Branding", cat_inprogress: "In-Progress", cat_product: "Product Design", cat_mobile: "Mobile App",
            mm_card_title: "Magic & Match", rg_card_title: "Ruach Gabit", mb_card_title: "MushBot", el_card_title: "Growing Plants", or_card_title: "Packaging", pa_card_title: "Pastella", ai_card_title: "AI Platform", bu_card_title: "Back-Up",

            // Back-Up (Cognyte) Details - Full Text
            tag_product: "Product Design & UX", bu_title: "Back-Up: Salesforce Companion", bu_subtitle: "Smart Performance Support for Cognyte",
            bu_h1: "1. Organization & The Challenge",
            bu_p1: "<strong>Client:</strong> Cognyte (NASDAQ: CGNT). Context: A complex B2G sales environment with long sales cycles.",
            bu_p2: "<strong>The Problem:</strong> Although reps were trained in MEDDPICC, they failed to apply it within Salesforce. The CRM was perceived as a 'policing' burden, leading to poor data quality and forcing management to rely on guesswork.",
            bu_h2: "2. The Solution: Back-Up",
            bu_p3: "Instead of traditional training, we developed a smart performance-support overlay that transforms Salesforce into a proactive sales companion.",
            bu_strong1: "The Sales Rep’s Perspective (Efficiency & Trust):",
            bu_li1: "<strong>Pre-Meeting:</strong> A 'Smart Cheat-Sheet' with critical questions tailored to the stage.",
            bu_li2: "<strong>During Meeting:</strong> Distraction-free interface to focus on the conversation.",
            bu_li3: "<strong>AI Copilot:</strong> Listens, analyzes, and auto-fills data. Rep simply reviews and approves, removing grunt work.",
            bu_li4: "<strong>Data Control:</strong> Rep chooses which notes stay private and which outcomes to publish.",
            bu_strong2: "The Manager’s Perspective (Control & Visibility):",
            bu_li5: "<strong>Instant Visualization:</strong> 'Color Wheels' show deal health instantly, highlighting missing data.",
            bu_li6: "<strong>Smart Gates:</strong> Identifies Red status (missing criteria) and blocks premature advancement.",
            bu_li7: "<strong>Insights:</strong> Analyzes bottlenecks for reliable forecasting.",
            bu_h3: "3. The Process",
            bu_p4: "Our breakthrough came from a mindset shift: from 'Enforcement' to 'Performance Support'.",
            bu_li8: "<strong>User Research:</strong> Identified Salesforce was seen as a policing tool.",
            bu_li9: "<strong>Safe Space:</strong> Architectural separation between private drafts and public view.",
            bu_li10: "<strong>Modular Development:</strong> Scalable from Logic Wizard to advanced AI Copilot.",
            
            // Back-Up Gallery Descriptions (New & Clear)
            btn_manager_view: "Manager View", btn_rep_view: "Rep View",
            bu_img1_title: "Manager Command Center", bu_img1_desc: "Overview of pipeline health. Managers can see risks and forecast accuracy at a glance.",
            bu_img2_title: "Pipeline Health Visualization", bu_img2_desc: "Manager view: The Color Wheels show exactly what's missing (Red) vs. completed (Green) for each deal.",
            bu_img3_title: "During Meeting (Manual Mode)", bu_img3_desc: "A focused interface for the Rep. Yellow sections mean 'In Progress'. The user manually inputs data without AI.",
            bu_img4_title: "Stage Completed (Green Status)", bu_img4_desc: "Success! All critical criteria for this stage are met and validated. The deal is healthy.",
            bu_img5_title: "AI Copilot (Red Status)", bu_img5_desc: "The AI detected missing info (Red). It suggests data, but the Rep must actively 'Approve' it to fix the status.",

            // Other Projects (Keep existing)
            tag_gamedev: "Game Development", mm_title: "Magic & Match", mm_subtitle: "Developed in Unity & C# | Custom Game Generator", header_about_proj: "About the Project", mm_header_goal: "Goal & Uniqueness", mm_desc1: "An interactive 2D educational matching game, fully designed and programmed in Unity with C#.", mm_desc2: "The project features a custom-built generator that lets users create and personalize their own games.", mm_desc3: "All game logic, scene flow, and animations were developed through C# scripts.", mm_desc4: "The game blends learning with interactivity, as players match enchanted clouds to lift a floating house back into the sky.", link_figma: "Link for Figma Wireframes", btn_view_live: "View Live Project", mm_gal_1: "Custom Game Generator", mm_gal_2: "Opening Cinematic", mm_gal_3: "Core Gameplay", mm_gal_4: "Ending & Feedback",
            tag_webdev: "Web Development", rg_title: "Ruach Gabit", rg_subtitle: "Social-Impact Website", rg_desc1: "“Ruach Gabit” , A Social-Impact Website Supporting Independent Businesses During Iron Swords War.", rg_desc2: "The focus was on creating a socially driven website that promotes and supports independent business owners affected during the war, providing them with an online platform to increase visibility and connect with new customers.", rg_desc3: "The website was built entirely with HTML, CSS, and JavaScript, combining responsive web design with interactive front-end functionality.", rg_header_feat: "Interactive Features", rg_desc4: "Includes interactive registration form that allows business owners to sign up for the platform , dynamically adapting to user input through JavaScript event-driven logic.", link_form: "View Interactive Form",
            tag_aidev: "AI Development", mb_title: "MushBot", mb_subtitle: "AI-Powered Mushroom Identification", mb_desc1: "Mushbot bridges the gap between nature and technology to help travelers identify mushrooms safely.", mb_desc2: "Real-time identification: Integrated Kindwise API for high-accuracy botanical identification.", mb_desc3: "Safety first: Smart logic that provides instant green/red safety alerts to prevent accidents.", mb_desc4: "Rich data: Local content retrieval via Wikipedia API.", mb_desc5: "Dynamic UX: Automatic recipe generator for edible mushrooms.", header_tools: "Tools & Technologies", mb_desc6: "Built entirely with HTML, CSS, and JavaScript. <br> integrated multiple AI and Web tools including Kindwise API, ml5.js, Gemini, and Suno AI.",
            tag_instdesign: "Instructional Design", el_title: "Growing & Caring for Plants", el_subtitle: "Interactive Module for Children", el_desc1: "This interactive e-learning designed specifically for young children to introduce the three essential conditions for plant growth: soil, water, and sunlight.", el_desc2: "The learning experience is intuitive and exploratory, allowing children to actively engage with the content rather than passively consume it. Through colorful animations and simple feedback mechanics, learners reveal each condition and advance to a knowledge-check quiz.", header_design_tech: "Design & Technology", el_desc3: "All visual elements,illustrations, icons, and layout,were fully created in <strong>Adobe Illustrator</strong>, using a clean, playful, and age-appropriate vector style.", el_desc4: "The module was built in <strong>Articulate Storyline 360</strong>, combining instructional design principles with custom visual storytelling.",
            tag_branding: "Brand Identity", or_title: "Oreo Rebranding Project", or_subtitle: "Visual Identity & Packaging Design", or_desc1: "This project reimagines the classic Oreo cookie through a creative rebranding process inspired by storytelling and user experience principles.", or_desc2: "The goal was to design a fresh visual identity that preserves Oreo’s iconic, playful character while giving it a more modern, cohesive, and emotionally engaging look.", header_design_process: "Design Process", or_desc3: "The entire concept was developed from scratch , from mood boards and color exploration to vector illustrations, composition, and packaging layout.", or_desc4: "All visual elements were created in Adobe Illustrator, following brand and print standards for real-world packaging production, including front, back, and side panels with nutritional information and barcodes.", or_desc5: "The project demonstrates a strong sense of visual strategy, brand storytelling, and attention to detail, emphasizing how design can connect emotion, nostalgia, and product experience.",
            tag_mobile: "Mobile App Design", pa_title: "Pastella", pa_subtitle: "Mobile App for a Smart Pasta Maker",
            pa_h1: "Concept & UX Process",
            pa_desc1: "Pastella is a mobile app concept designed for a home pasta-making machine, created to make the pasta preparation process clearer, simpler, and more enjoyable.",
            pa_desc2: "The project was designed from scratch in Figma, from information architecture and user flow to a fully interactive prototype. The goal was to simulate the complete user journey, reduce clicks, and lower visual load.",
            pa_h2: "Visual Language",
            pa_desc3: "The UI language is culinary, elegant, and minimal. Delicate line-art illustrations, deep burgundy, and a soft cream background create clear contrast and high readability while working in the kitchen.",
            pa_h3: "Generative AI Process",
            pa_desc4: "Generative AI tools were used to create the graphic assets, including the machine, pasta discs, and ingredients. Through precise prompt engineering, the visual style stayed consistent across all screens.",
            btn_view_prototype: "View Prototype",
            pa_img1_title: "Opening Screen", pa_img2_title: "AI Flour Scanner", pa_img3_title: "Guest Calculator", pa_img4_title: "Water Reminder", pa_img5_title: "Disc Guide",

            tag_inprogress: "In-Progress, AI Systems Project", ai_title: "AI-Based Instructional Design Platform", ai_subtitle: "Multi-Agent System & Automation", ai_desc1: "Designing a multi-agent AI system that supports and automates instructional design processes based on the <strong>ADDIE model</strong> and <strong>Human-in-the-Loop</strong> principles.", header_dev_focus: "Development Focus", ai_list1: "Defining system architecture and agent orchestration.", ai_list2: "Creating end-to-end user flows for AI-human collaboration.", ai_list3: "User research to optimize interaction interaction.", btn_progress: "Currently in Development", ai_arch_title: "System Architecture", ai_arch_desc: "Visuals and diagrams for the multi-agent orchestration and user flows are currently being designed."
        },
        he: {
            nav_home: "ראשי", nav_about: "אודות", nav_projects: "פרויקטים", nav_contact: "צור קשר",
            name_main: "ליהי הררי", hero_subtitle: "עיצוב וטכנולוגיה",
            hero_text: "סטודנטית שנה ג' לטכנולוגיות למידה ב-HIT, מתמחה בעיצוב UX/UI.<br> בעלת מיומנויות בעיצוב ממוקד משתמש, אפיון ויצירת פרוטוטייפים ב-Figma.",
            btn_projects: "לפרויקטים", btn_about: "קצת עליי", btn_contact: "צרו קשר",
            card_name: "ליהי הררי", card_role: "עיצוב ופיתוח UX/UI", btn_cv: "הורדת קו\"ח",
            about_title: "קצת עליי",
            about_text: "סטודנטית שנה ג' ל<strong>טכנולוגיות למידה</strong> ב-HIT, מתמחה ב-<strong>UX/UI</strong> ופיתוח WEB. בעלת תשוקה לשילוב יצירתיות עם חשיבה אנליטית ליצירת חוויות דיגיטליות ברורות וממוקדות משתמש.",
            core_competencies: "תחומי התמחות",
            comp_ux: "עיצוב UX/UI", desc_ux: "אפיון, יצירת פרוטוטייפים ועיצוב ממשקים אינטואיטיביים.",
            comp_game: "פיתוח משחקים", desc_game: "חוויות אינטראקטיביות ב-Unity ו-C#.",
            comp_web: "פיתוח Web", desc_web: "אתרים רספונסיביים באמצעות HTML, CSS, JS.",
            comp_edu: "פיתוח למידה", desc_edu: "עיצוב והדרכה באמצעות Storyline ו-Rise.",
            degree_title: "תואר ראשון בטכנולוגיות למידה", degree_inst: "המכון הטכנולוגי חולון (HIT)", degree_year: "2023 - היום",
            proj_title_sel: "פרויקטים", proj_title_proj: "נבחרים", proj_subtitle: "מבחר פרויקטים אינטראקטיביים המשלבים עיצוב וטכנולוגיה",
            contact_bg: " יצירת קשר", contact_ready: "מוכנים להתחיל משהו חדש?", contact_chat: "בואו נדבר",
            label_email: "אימייל", label_social: "רשתות", label_loc: "מיקום", val_loc: "רמת גן, ישראל",
            form_name: "שם מלא", form_comp: "חברה (אופציונלי)", form_email: "אימייל", form_phone: "טלפון", form_msg: "יש לכם פרויקט בראש? אשמח לשמוע עליו", form_send: "שלח הודעה",
            cat_gamedev: "פיתוח משחקים", cat_webdev: "פיתוח Web", cat_aitool: "כלי AI", cat_elearning: "לומדה", cat_branding: "מיתוג", cat_inprogress: "בתהליך", cat_product: "עיצוב מוצר",
            mm_card_title: "מג'יק אנד מאץ'", rg_card_title: "רוח גבית", mb_card_title: "MushBot", el_card_title: "צומחים ולומדים", or_card_title: "אריזות ומיתוג", ai_card_title: "פלטפורמת AI", bu_card_title: "Back-Up",

            // Back-Up (Cognyte) Hebrew Details
            tag_product: "עיצוב מוצר ו-UX", bu_title: "Back-Up: מלווה חכם ל-Salesforce", bu_subtitle: "מערכת תומכת ביצועים עבור Cognyte",
            bu_h1: "1. הארגון והאתגר",
            bu_p1: "<strong>לקוח:</strong> Cognyte (NASDAQ: CGNT). הקשר: סביבת מכירות B2G מורכבת עם מחזורי מכירה ארוכים.",
            bu_p2: "<strong>הבעיה:</strong> למרות שנציגי המכירות הוכשרו בשיטת MEDDPICC, הם לא יישמו אותה ב-Salesforce. המערכת נתפסה ככלי 'שיטור' בירוקרטי, מה שהוביל לנתונים חסרים ואילץ את ההנהלה לנחש תחזיות עסקיות.",
            bu_h2: "2. הפתרון: Back-Up",
            bu_p3: "במקום עוד הדרכה מסורתית, פיתחנו שכבת תמיכה חכמה (Performance Support) שהופכת את ה-CRM מכלי דיווח לעוזר אישי פרואקטיבי.",
            bu_strong1: "נקודת המבט של הנציג (יעילות ואמון):",
            bu_li1: "<strong>לפני פגישה:</strong> דף שליפים חכם המכין את הנציג עם שאלות קריטיות המותאמות לשלב העסקה.",
            bu_li2: "<strong>במהלך פגישה:</strong> ממשק נקי מהסחות דעת המאפשר להתמקד בניהול השיחה.",
            bu_li3: "<strong>AI Copilot:</strong> מקשיב, מנתח וממלא אוטומטית את שדות ה-CRM. הנציג רק מאשר, מה שחוסך 'עבודה שחורה'.",
            bu_li4: "<strong>שליטה במידע:</strong> הנציג בוחר אילו הערות נשארות פרטיות ואילו תוצאות מאומתות עוברות למנהל.",
            bu_strong2: "נקודת המבט של המנהל (שליטה ונראות):",
            bu_li5: "<strong>ויזואליזציה מיידית:</strong> 'גלגלי צבעים' מציגים את בריאות העסקה במבט אחד ומדגישים נתונים חסרים.",
            bu_li6: "<strong>שערים חכמים (Smart Gates):</strong> המערכת מזהה סטטוס אדום (קריטריונים חסרים) ומונעת התקדמות מוקדמת מדי.",
            bu_li7: "<strong>תובנות:</strong> ניתוח צווארי בקבוק לתחזיות אמינות וניהול סיכונים.",
            bu_h3: "3. התהליך",
            bu_p4: "פריצת הדרך הגיעה משינוי תפיסה: מ'אכיפה' ל'תמיכה בביצועים'.",
            bu_li8: "<strong>מחקר משתמשים:</strong> זיהוי ש-Salesforce נתפס ככלי שיטור ולא כמערכת תומכת.",
            bu_li9: "<strong>עקרון 'המרחב הבטוח':</strong> הפרדה ארכיטקטונית ברורה בין טיוטות פרטיות לבין התצוגה הציבורית של המנהל.",
            bu_li10: "<strong>פיתוח מודולרי:</strong> פתרון סקיילבילי שיכול לצמוח מאשף לוגי פשוט ועד ל-AI Copilot מתקדם.",
            
            // Back-Up Gallery Hebrew
            btn_manager_view: "צד המנהל", btn_rep_view: "צד הנציג",
            bu_img1_title: "מרכז שליטה למנהלים", bu_img1_desc: "מבט על מקיף על בריאות העסקה וניהול סיכונים.",
            bu_img2_title: "ויזואליזציה של בריאות עסקה", bu_img2_desc: "מבט מנהל: גלגלי הצבעים מראים בדיוק מה חסר (אדום) לעומת מה הושלם (ירוק) בכל עסקה.",
            bu_img3_title: "במהלך פגישה (מצב ידני)", bu_img3_desc: "ממשק פוקוס לנציג. צבע צהוב מסמן 'בתהליך'. המשתמש מזין נתונים ידנית ללא AI.",
            bu_img4_title: "שלב הושלם (סטטוס ירוק)", bu_img4_desc: "הצלחה! כל הקריטריונים הקריטיים לשלב זה מולאו ואומתו. העסקה בריאה.",
            bu_img5_title: "AI Copilot (סטטוס אדום)", bu_img5_desc: "ה-AI זיהה מידע חסר (אדום). הוא מציע נתונים, אך הנציג חייב ללחוץ 'אישור' כדי לתקן את הסטטוס.",

            // Other Projects (Existing)
            tag_gamedev: "פיתוח משחקים", mm_title: "Magic & Match", mm_subtitle: "פותח ב-Unity ו-C# | מחולל משחקים מותאם אישית", header_about_proj: "אודות הפרויקט", mm_header_goal: "מטרה וייחוד", mm_desc1: "משחק התאמה לימודי אינטראקטיבי בדו-מימד, שפותח ועוצב במלואו ב-Unity באמצעות C#.", mm_desc2: "הפרויקט כולל מחולל ייחודי המאפשר למשתמשים ליצור ולהתאים אישית משחקים משלהם.", mm_desc3: "כל הלוגיקה, המעברים והאנימציות פותחו באמצעות סקריפטים ב-C#.", mm_desc4: "המשחק משלב למידה עם אינטראקטיביות, כאשר השחקנים מתאימים עננים קסומים כדי להרים בית צף חזרה לשמיים.", link_figma: "קישור לאפיון ב-Figma", btn_view_live: "לצפייה בפרויקט", mm_gal_1: "מחולל משחקים מותאם אישית", mm_gal_2: "סרטון פתיחה", mm_gal_3: "משחקיות ליבה", mm_gal_4: "סיום ומשוב",
            tag_webdev: "פיתוח אתרים", rg_title: "רוח גבית", rg_subtitle: "אתר חברתי לעסקים במלחמה", rg_desc1: "אתר 'רוח גבית' , פרויקט חברתי לתמיכה בעסקים עצמאיים בזמן מלחמת חרבות ברזל.", rg_desc2: "המטרה הייתה ליצור פלטפורמה חברתית שמקדמת ותומכת בבעלי עסקים שנפגעו במלחמה, ומעניקה להם חשיפה וחיבור ללקוחות חדשים.", rg_desc3: "האתר נבנה כולו באמצעות HTML, CSS ו-JavaScript, ומשלב עיצוב רספונסיבי עם פונקציונליות צד-לקוח.", rg_header_feat: "פיצ'רים אינטראקטיביים", rg_desc4: "כולל טופס הרשמה אינטראקטיבי המאפשר לבעלי עסקים להירשם לפלטפורמה , מתאים עצמו דינמית לקלט המשתמש באמצעות לוגיקת JS.", link_form: "לצפייה בטופס האינטראקטיבי",
            tag_aidev: "פיתוח AI", mb_title: "MushBot", mb_subtitle: "זיהוי פטריות מבוסס בינה מלאכותית", mb_desc1: "Mushbot מחבר בין הטבע לטכנולוגיה כדי לסייע למטיילים לזהות פטריות בצורה בטוחה.", mb_desc2: "זיהוי בזמן אמת: אינטגרציה עם Kindwise API לזיהוי בוטני מדויק.", mb_desc3: "בטיחות קודמת לכל: לוגיקה חכמה המספקת התראות בטיחות (ירוק/אדום) למניעת תאונות.", mb_desc4: "מידע עשיר: שליפת תוכן מקומי דרך Wikipedia API.", mb_desc5: "חווית משתמש דינמית: מחולל מתכונים אוטומטי לפטריות מאכל.", header_tools: "כלים וטכנולוגיות", mb_desc6: "נבנה ב-HTML, CSS, JS. שילוב כלי AI ו-Web כולל Kindwise API, ml5.js, Gemini ו-Suno AI.",
            tag_instdesign: "פיתוח הדרכה", el_title: "צומחים ומטפלים", el_subtitle: "לומדה אינטראקטיבית לילדים", el_desc1: "לומדה זו תוכננה במיוחד לילדים צעירים כדי להציג את שלושת התנאים ההכרחיים לצמיחת צמחים: אדמה, מים ושמש.", el_desc2: "חווית הלמידה היא אינטואיטיבית וחוקרת, ומאפשרת לילדים להיות מעורבים בתוכן במקום לצרוך אותו פסיבית. דרך אנימציות ומשוב פשוט, הלומדים מגלים כל תנאי ומתקדמים למבדק ידע.", header_design_tech: "עיצוב וטכנולוגיה", el_desc3: "כל האלמנטים הוויזואליים , איורים ואייקונים , נוצרו ב-Adobe Illustrator בסגנון וקטורי נקי ומותאם גיל.", el_desc4: "הלומדה פותחה ב-Articulate Storyline 360, תוך שילוב עקרונות פיתוח הדרכה עם סיפור ויזואלי.",
            tag_branding: "זהות מותגית", or_title: "מיתוג מחדש - Oreo", or_subtitle: "זהות ויזואלית ועיצוב אריזה", or_desc1: "פרויקט זה מדמיין מחדש את עוגיית האוראו הקלאסית דרך תהליך מיתוג מחדש יצירתי בהשראת עקרונות חווית משתמש.", or_desc2: "המטרה הייתה לעצב זהות ויזואלית רעננה ששומרת על האופי השובב של המותג, אך מעניקה לו מראה מודרני, אחיד ומרגש יותר.", header_design_process: "תהליך העיצוב", or_desc3: "הקונספט כולו פותח מאפס , מלוחות השראה וצבעוניות ועד איורים וקטוריים, קומפוזיציה ועיצוב האריזה.", or_desc4: "כל האלמנטים נוצרו ב-Illustrator לפי סטנדרטים של דפוס ואריזה, כולל חזית, גב וצדדים עם מידע תזונתי וברקודים.", or_desc5: "הפרויקט מפגין חשיבה אסטרטגית, סיפור מותגי ותשומת לב לפרטים המחברים בין רגש לחווית המוצר.",
            tag_inprogress: "בתהליך, מערכת בינה מלאכותית", ai_title: "פלטפורמת פיתוח הדרכה מבוססת AI", ai_subtitle: "מערכת מרובת-סוכנים ואוטומציה", ai_desc1: "תכנון מערכת AI מרובת-סוכנים (Multi-Agent) התומכת ומבצעת אוטומציה לתהליכי פיתוח הדרכה המבוססים על מודל ADDIE ועקרונות Human-in-the-Loop.", header_dev_focus: "מיקוד הפיתוח", ai_list1: "הגדרת ארכיטקטורת המערכת ותזמור הסוכנים.", ai_list2: "יצירת תרשימי זרימה לשיתוף פעולה בין אדם לבינה מלאכותית.", ai_list3: "מחקר משתמשים לאופטימיזציה של האינטראקציה.", btn_progress: "נמצא כרגע בפיתוח", ai_arch_title: "ארכיטקטורת מערכת", ai_arch_desc: "ויזואליזציות ותרשימים לתזמור הסוכנים נמצאים כרגע בשלבי עיצוב."
        }

};

const langToggleBtn = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');
let currentLang = 'en'; 

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'he' : 'en';
        updateLanguage(currentLang);
    });
}

function updateLanguage(lang) {
    if (lang === 'he') {
        document.body.classList.add('rtl');
        document.documentElement.setAttribute('lang', 'he');
        if (langText) langText.innerText = "HE";
    } else {
        document.body.classList.remove('rtl');
        document.documentElement.setAttribute('lang', 'en');
        if (langText) langText.innerText = "EN";
    }

    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}

/* ==========================================================================
   6. Contact Form Buttons Logic
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function() {
    const contactBtns = document.querySelectorAll('.pill-btn:not([type="submit"])');
    const hiddenInput = document.getElementById('inquiry-type');

    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); 

            contactBtns.forEach(b => {
                b.classList.remove('active');
                const dot = b.querySelector('.dot');
                if (dot) dot.classList.add('empty');
            });

            this.classList.add('active');
            const activeDot = this.querySelector('.dot');
            if (activeDot) activeDot.classList.remove('empty');

            if (hiddenInput) {
                hiddenInput.value = this.innerText.trim();
            }
        });
    });
});
