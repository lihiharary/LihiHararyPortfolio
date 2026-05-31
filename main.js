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
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});

/* ==========================================================================
   2. Project Modals Logic
   ========================================================================== */

window.openProject = function(projectId) {
    console.log("Opening project:", projectId);

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
            if (e.target === this) {
                closeProject();
            }
        });
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProject();
    }
});

/* ==========================================================================
   3. TagCanvas Logic
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
        console.error("Canvas Error:", e);
        const canvasContainer = document.getElementById('myCanvasContainer');
        const tagsList = document.getElementById('tags');
        if(canvasContainer) canvasContainer.style.display = 'none';
        if(tagsList) tagsList.style.display = 'block';
    }
});

/* ==========================================================================
   4. Scroll Animations (Re-triggerable)
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

    const sectionsToReveal = document.querySelectorAll(
        '.reveal-section, .reveal-grid, .stagger-item, .slide-in-left, .fade-up, .big-contact-header, .reveal-slide-right, .slide-from-left, .slide-from-right'
    );

    sectionsToReveal.forEach(section => {
        observer.observe(section);
    });
});

/* ==========================================================================
   5. Contact Form Buttons Logic
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

/* ==========================================================================
   6. Internationalization (Language Switcher & Translations)
   ========================================================================== */

const translations = {
    en: {
        // Navbar & Hero
        nav_home: "HOME", nav_about: "ABOUT", nav_projects: "PROJECTS", nav_contact: "CONTACT",
        hero_name: "LIHI HARARY", hero_role: "Design & Technology",
        hero_desc: "B.A. student in Learning Technologies at HIT, specializing in UX/UI design. <br> Skilled in user-centered design, wireframing, and prototyping with Figma.",
        btn_projects: "Projects", btn_about_me: "About Me", btn_contact_me: "Contact Me",
        
        // About Section
        profile_name: "Lihi Harary", profile_role: "UX/UI DESIGN & DEV", location: "Ramat Gan, Israel",
        btn_download_cv: "Download CV", btn_contact_me_short: "Contact Me",
        about_title: "About Me", about_text: "Third-year <strong>Instructional Technologies</strong> student at HIT, specializing in <strong>UX/UI design</strong> and <strong>web development</strong>. Passionate about combining creativity with analytical thinking to craft clear, user-centered digital experiences.",
        core_competencies: "Core Competencies",
        comp_uxui_title: "UX/UI Design", comp_uxui_desc: "Wireframing, prototyping, and designing intuitive interfaces.",
        comp_game_title: "Game Development", comp_game_desc: "Interactive experiences in Unity & C#.",
        comp_web_title: "Web Development", comp_web_desc: "Responsive websites using HTML, CSS, JS.",
        comp_elearning_title: "E-Learning", comp_elearning_desc: "Instructional design with Storyline & Rise.",
        edu_degree: "B.A. in Instructional Technologies", edu_school: "Holon Institute of Technology (HIT)", edu_years: "2023 - Present",

        // Projects Section General
        projects_title_selected: "Selected", projects_title_projects: "Projects", projects_subtitle: "A selection of interactive, design-driven and technology-based projects",
        
        // Cards Titles & Categories
        p1_overlay_title: "Magic & Match", p1_cat: "Game Dev",
        p2_overlay_title: "Ruach Gabit", p2_cat: "Web Dev",
        p3_overlay_title: "MushBot", p3_cat: "AI Tool",
        p4_overlay_title: "Growing Plants", p4_cat: "E-Learning",
        p5_overlay_title: "Packaging", p5_cat: "Branding",
        p6_overlay_title: "AI Platform", p6_cat: "In-Progress",
        cat_product: "Product Design", bu_card_title: "Back-Up",
        pm_overlay_title: "Pasta Maker", pm_cat: "UX/UI App",

        // Modals General Headers
        modal_about_title: "About the Project", modal_goal_title: "Goal & Uniqueness", modal_interactive_title: "Interactive Features",
        modal_tools_title: "Tools & Technologies", modal_design_tech_title: "Design & Technology", modal_process_title: "Design Process",
        modal_dev_focus: "Development Focus", btn_view_project: "View Live Project", btn_dev_status: "Currently in Development", status_in_progress: "In Progress", link_figma: "View Figma Prototype",

        // Project 1 Content
        p1_tag: "Game Development", p1_title: "Magic & Match", p1_subtitle: "Developed in Unity & C# | Custom Game Generator",
        p1_desc_1: "An interactive 2D educational matching game, fully designed and programmed in Unity with C#.", p1_desc_2: "The project features a custom-built generator that lets users create and personalize their own games.", p1_desc_3: "All game logic, scene flow, and animations were developed through C# scripts.", p1_goal: "The game blends learning with interactivity, as players match enchanted clouds to lift a floating house back into the sky.",
        
        // Project 2 (Back-Up) Content
        tag_product: "Product Design & UX", bu_title: "Back-Up: Salesforce Companion", bu_subtitle: "Smart Performance Support for Cognyte",
        bu_h1: "1. Organization & The Challenge", bu_p1: "<strong>Client:</strong> Cognyte (NASDAQ: CGNT). Context: A complex B2G sales environment with long sales cycles.", bu_p2: "<strong>The Problem:</strong> Although reps were trained in MEDDPICC, they failed to apply it within Salesforce. The CRM was perceived as a 'policing' burden, leading to poor data quality and forcing management to rely on guesswork.",
        bu_h2: "2. The Solution: Back-Up", bu_p3: "Instead of traditional training, we developed a smart performance-support overlay that transforms Salesforce into a proactive sales companion.",
        bu_strong1: "The Sales Rep’s Perspective (Efficiency & Trust):", bu_li1: "<strong>Pre-Meeting:</strong> A 'Smart Cheat-Sheet' with critical questions tailored to the stage.", bu_li2: "<strong>During Meeting:</strong> Distraction-free interface to focus on the conversation.", bu_li3: "<strong>AI Copilot:</strong> Listens, analyzes, and auto-fills data. Rep simply reviews and approves, removing grunt work.", bu_li4: "<strong>Data Control:</strong> Rep chooses which notes stay private and which outcomes to publish.",
        bu_strong2: "The Manager’s Perspective (Control & Visibility):", bu_li5: "<strong>Instant Visualization:</strong> 'Color Wheels' show deal health instantly, highlighting missing data.", bu_li6: "<strong>Smart Gates:</strong> Identifies Red status (missing criteria) and blocks premature advancement.", bu_li7: "<strong>Insights:</strong> Analyzes bottlenecks for reliable forecasting.",
        bu_h3: "3. The Process", bu_p4: "Our breakthrough came from a mindset shift: from 'Enforcement' to 'Performance Support'.",
        bu_li8: "<strong>User Research:</strong> Identified Salesforce was seen as a policing tool.", bu_li9: "<strong>Safe Space:</strong> Architectural separation between private drafts and public view.", bu_li10: "<strong>Modular Development:</strong> Scalable from Logic Wizard to advanced AI Copilot.",
        btn_manager_view: "Manager View", btn_rep_view: "Sales Representative View",
        bu_img1_title: "Manager Command Center", bu_img1_desc: "Overview of pipeline health. Managers can see risks and forecast accuracy at a glance.",
        bu_img2_title: "Pipeline Health Visualization", bu_img2_desc: "Manager view: The Color Wheels show exactly what's missing (Red) vs. completed (Green) for each deal.",
        bu_img3_title: "During Meeting (Manual Mode)", bu_img3_desc: "A focused interface for the Rep. Yellow sections mean 'In Progress'. The user manually inputs data without AI.",
        bu_img4_title: "Stage Completed (Green Status)", bu_img4_desc: "Success! All critical criteria for this stage are met and validated. The deal is healthy.",
        bu_img5_title: "AI Copilot (Red Status)", bu_img5_desc: "The AI detected missing info (Red). It suggests data, but the Rep must actively 'Approve' it to fix the status.",

        // Project 3 Content
        p2_tag: "Web Development", p2_title: "Ruach Gabit", p2_subtitle: "Social-Impact Website",
        p2_desc_1: "“Ruach Gabit” – A Social-Impact Website Supporting Independent Businesses During Iron Swords War.", p2_desc_2: "The focus was on creating a socially driven website that promotes and supports independent business owners affected during the war, providing them with an online platform to increase visibility and connect with new customers.", p2_desc_3: "The website was built entirely with HTML, CSS, and JavaScript, combining responsive web design with interactive front-end functionality.", p2_features: "Includes interactive registration form that allows business owners to sign up for the platform — dynamically adapting to user input through JavaScript event-driven logic.", link_form: "View Interactive Form",

        // Project 4 (Pasta Maker) Content
        pm_tag: "UX/UI Design & Figma Prototype", pm_title: "Pasta Maker Companion", pm_subtitle: "Smart Interface for Culinary Equipment",
        pm_h1: "Architecture & Prototyping", pm_desc_1: "Built from scratch in Figma, starting with information architecture through to a fully interactive prototype. The goal was to simulate the end-to-end user journey while reducing click-fatigue and visual cognitive load.",
        pm_h2: "Culinary UI Language", pm_desc_2: "We established a minimalist, elegant design concept. Choosing a delicate line-art illustration style paired with a meticulous palette of deep burgundy on a light cream background, creating high contrast and maximum readability for users while working in a kitchen environment.",
        pm_h3: "Generative AI Integration", pm_desc_3: "The interface's graphic assets (machine illustrations, discs, and raw materials) were generated using AI image generators. Through precise prompt engineering, we controlled the 2D style and maintained a completely uniform visual language across all Figma screens, avoiding any disruptive realistic elements.",

        // Project 5 Content
        p3_tag: "AI Development", p3_title: "MushBot", p3_subtitle: "AI-Powered Mushroom Identification",
        p3_desc_1: "Mushbot bridges the gap between nature and technology to help travelers identify mushrooms safely.", p3_desc_2: "Real-time identification: Integrated Kindwise API for high-accuracy botanical identification.", p3_desc_3: "Safety first: Smart logic that provides instant green/red safety alerts to prevent accidents.", p3_desc_4: "Rich data: Local content retrieval via Wikipedia API.", p3_desc_5: "Dynamic UX: Automatic recipe generator for edible mushrooms.", p3_tools: "Built entirely with HTML, CSS, and JavaScript. <br> integrated multiple AI and Web tools including Kindwise API, ml5.js, Gemini, and Suno AI.",

        // Project 6 Content
        p4_tag: "Instructional Design", p4_title: "Growing & Caring for Plants", p4_subtitle: "Interactive Module for Children",
        p4_desc_1: "This interactive e-learning designed specifically for young children to introduce the three essential conditions for plant growth: soil, water, and sunlight.", p4_desc_2: "The learning experience is intuitive and exploratory, allowing children to actively engage with the content rather than passively consume it. Through colorful animations and simple feedback mechanics, learners reveal each condition and advance to a knowledge-check quiz.", p4_tech_1: "All visual elements—illustrations, icons, and layout—were fully created in <strong>Adobe Illustrator</strong>, using a clean, playful, and age-appropriate vector style.", p4_tech_2: "The module was built in <strong>Articulate Storyline 360</strong>, combining instructional design principles with custom visual storytelling.",

        // Project 7 Content
        p5_tag: "Brand Identity", p5_title: "Oreo Rebranding Project", p5_subtitle: "Visual Identity & Packaging Design",
        p5_desc_1: "This project reimagines the classic Oreo cookie through a creative rebranding process inspired by storytelling and user experience principles.", p5_desc_2: "The goal was to design a fresh visual identity that preserves Oreo’s iconic, playful character while giving it a more modern, cohesive, and emotionally engaging look.", p5_process_1: "The entire concept was developed from scratch — from mood boards and color exploration to vector illustrations, composition, and packaging layout.", p5_process_2: "All visual elements were created in Adobe Illustrator, following brand and print standards for real-world packaging production, including front, back, and side panels with nutritional information and barcodes.", p5_process_3: "The project demonstrates a strong sense of visual strategy, brand storytelling, and attention to detail, emphasizing how design can connect emotion, nostalgia, and product experience.",

        // Project 8 Content
        p6_tag: "In-Progress, AI Systems Project", p6_title: "AI-Based Instructional Design Platform", p6_subtitle: "Multi-Agent System & Automation",
        p6_desc: "Designing a multi-agent AI system that supports and automates instructional design processes based on the <strong>ADDIE model</strong> and <strong>Human-in-the-Loop</strong> principles.", p6_focus_1: "Defining system architecture and agent orchestration.", p6_focus_2: "Creating end-to-end user flows for AI-human collaboration.", p6_focus_3: "User research to optimize interaction interaction.", p6_img_title: "System Architecture", p6_img_desc: "Visuals and diagrams for the multi-agent orchestration and user flows are currently being designed.",

        // Contact Section
        contact_big_header: "Contact", contact_btn_work: "Work Together", contact_btn_hi: "Just Saying Hi",
        contact_label_email: "Email", contact_label_social: "Social", contact_link_linkedin: "LinkedIn Profile ↗", contact_label_location: "Location",
        form_label_name: "Name", form_label_company: "Company (Optional)", form_label_email: "Email", form_label_phone: "Phone", form_label_message: "Want to know more? Drop me a line!", form_btn_send: "Send Message"
    },
    he: {
        nav_home: "ראשי", nav_about: "אודות", nav_projects: "פרויקטים", nav_contact: "צור קשר",
        hero_name: "ליהי הררי", hero_role: "עיצוב וטכנולוגיה",
        hero_desc: "סטודנטית שנה ג' לטכנולוגיות למידה ב-HIT, מתמחה ב-UX/UI. <br> בעלת מיומנות בעיצוב ממוקד משתמש, אפיון ויצירת פרוטוטייפים ב-Figma.",
        btn_projects: "לפרויקטים", btn_about_me: "קצת עליי", btn_contact_me: "צרו קשר",
        
        // About
        profile_name: "ליהי הררי", profile_role: "פיתוח ועיצוב UX/UI", location: "רמת גן, ישראל",
        btn_download_cv: "הורדת קו\"ח", btn_contact_me_short: "צרו קשר",
        about_title: "קצת עליי", about_text: "סטודנטית שנה שלישית לטכנולוגיות למידה ב-HIT, מתמחה ב-<strong>עיצוב UX/UI</strong> ו-<strong>פיתוח WEB</strong>. אוהבת לשלב יצירתיות עם חשיבה אנליטית ליצירת חוויות דיגיטליות נקיות וממוקדות משתמש.",
        core_competencies: "יכולות ליבה",
        comp_uxui_title: "עיצוב UX/UI", comp_uxui_desc: "אפיון, פרוטוטייפינג ועיצוב ממשקים אינטואיטיביים.",
        comp_game_title: "פיתוח משחקים", comp_game_desc: "חוויות אינטראקטיביות ב-Unity ו-C#.",
        comp_web_title: "פיתוח WEB", comp_web_desc: "אתרים רספונסיביים ב-HTML, CSS, JS.",
        comp_elearning_title: "למידה מתוקשבת", comp_elearning_desc: "עיצוב למידה עם Storyline ו-Rise.",
        edu_degree: "תואר ראשון בטכנולוגיות למידה", edu_school: "המכון הטכנולוגי חולון (HIT)", edu_years: "2023 - הווה",

        // Projects Section
        projects_title_selected: "פרויקטים", projects_title_projects: "נבחרים", projects_subtitle: "מבחר פרויקטים אינטראקטיביים המשלבים עיצוב וטכנולוגיה",
        
        // Project Cards
        p1_overlay_title: "מג'יק אנד מאץ'", p1_cat: "פיתוח משחקים",
        p2_overlay_title: "רוח גבית", p2_cat: "פיתוח WEB",
        p3_overlay_title: "MushBot", p3_cat: "כלי AI",
        p4_overlay_title: "גידול צמחים", p4_cat: "למידה מתוקשבת",
        p5_overlay_title: "אריזות", p5_cat: "מיתוג",
        p6_overlay_title: "פלטפורמת AI", p6_cat: "בתהליך",
        cat_product: "עיצוב מוצר", bu_card_title: "Back-Up",
        pm_overlay_title: "Pasta Maker", pm_cat: "אפליקציית UX/UI",

        // Modals (General)
        modal_about_title: "על הפרויקט", modal_goal_title: "מטרה וייחוד", modal_interactive_title: "פיצ'רים אינטראקטיביים",
        modal_tools_title: "כלים וטכנולוגיות", modal_design_tech_title: "עיצוב וטכנולוגיה", modal_process_title: "תהליך העיצוב",
        modal_dev_focus: "מיקוד הפיתוח", btn_view_project: "צפייה בפרויקט", btn_dev_status: "כרגע בפיתוח", status_in_progress: "בתהליך", link_figma: "צפייה בפרוטוטייפ ב-Figma",

        // Project 1 Content
        p1_tag: "פיתוח משחקים", p1_title: "מג'יק אנד מאץ'", p1_subtitle: "פותח ב-Unity ו-C# | מחולל משחקים מותאם אישית",
        p1_desc_1: "משחק התאמה לימודי אינטראקטיבי בדו-מימד, עוצב ותוכנת במלואו ב-Unity עם C#.", p1_desc_2: "הפרויקט כולל מחולל מותאם אישית המאפשר למשתמשים ליצור משחקים משלהם.", p1_desc_3: "כל לוגיקת המשחק, מעבר הסצנות והאנימציות פותחו באמצעות סקריפטים ב-C#.", p1_goal: "המשחק משלב למידה עם אינטראקטיביות, כאשר שחקנים מתאימים עננים קסומים כדי להרים בית צף חזרה לשמיים.",

        // Project 2 Content
        tag_product: "עיצוב מוצר ו-UX", bu_title: "Back-Up: מלווה חכם ל-Salesforce", bu_subtitle: "מערכת תומכת ביצועים עבור Cognyte",
        bu_h1: "1. הארגון והאתגר", bu_p1: "<strong>לקוח:</strong> Cognyte (NASDAQ: CGNT). הקשר: סביבת מכירות B2G מורכבת עם מחזורי מכירה ארוכים.", bu_p2: "<strong>הבעיה:</strong> למרות שהנציגים הוכשרו ב-MEDDPICC, הם לא יישמו אותה ב-Salesforce. ה-CRM נתפס ככלי 'שיטור' בירוקרטי, מה שהוביל לנתונים חסרים ואילץ את ההנהלה לנחש תחזיות.",
        bu_h2: "2. הפתרון: Back-Up", bu_p3: "במקום עוד הדרכה מסורתית, פיתחנו שכבת תמיכה חכמה (Performance Support) שהופכת את Salesforce מעול לעוזר אישי פרואקטיבי.",
        bu_strong1: "נקודת המבט של הנציג (יעילות ואמון):", bu_li1: "<strong>לפני פגישה:</strong> דף שליפים חכם המכין את הנציג עם שאלות קריטיות.", bu_li2: "<strong>במהלך פגישה:</strong> ממשק נקי שמאפשר להתמקד בשיחה.", bu_li3: "<strong>AI Copilot:</strong> מנתח וממלא אוטומטית שדות במערכת. הנציג רק מאשר ומונע עבודה שחורה.", bu_li4: "<strong>שליטה במידע:</strong> הנציג בוחר מה יישאר כטיוטה פרטית ומה יפורסם.",
        bu_strong2: "נקודת המבט של המנהל (שליטה ונראות):", bu_li5: "<strong>ויזואליזציה מיידית:</strong> 'גלגלי צבעים' מראים את סטטוס העסקה במבט אחד ומדגישים חוסרים.", bu_li6: "<strong>שערים חכמים (Smart Gates):</strong> זיהוי קריטריונים אדומים ומניעת התקדמות פיקטיבית.", bu_li7: "<strong>תובנות:</strong> זיהוי צווארי בקבוק לתחזיות אמינות.",
        bu_h3: "3. התהליך", bu_p4: "פריצת הדרך הייתה בשינוי התפיסה: מ'אכיפה' ל'תמיכה בביצועים'.",
        bu_li8: "<strong>מחקר משתמשים:</strong> זיהוי ההתנגדויות לשימוש במערכת הקיימת.", bu_li9: "<strong>המרחב הבטוח:</strong> הפרדה בין טיוטת הנציג למסך המנהל.", bu_li10: "<strong>פיתוח מודולרי:</strong> מאשף לוגיקה ועד לטייס משנה חכם.",
        btn_manager_view: "תצוגת מנהל", btn_rep_view: "תצוגת נציג מכירות",
        bu_img1_title: "מרכז שליטה למנהל", bu_img1_desc: "מבט על של כלל העסקאות. המנהל רואה סיכונים ותחזיות במבט אחד.",
        bu_img2_title: "ויזואליזציה של בריאות עסקה", bu_img2_desc: "גלגלי הצבעים מראים בדיוק מה חסר (אדום) לעומת מה שהושלם (ירוק).",
        bu_img3_title: "במהלך פגישה (ידני)", bu_img3_desc: "ממשק פוקוס. צהוב אומר 'בתהליך'. המשתמש מקליד נתונים ללא AI.",
        bu_img4_title: "שלב הושלם (ירוק)", bu_img4_desc: "הצלחה! כל הקריטריונים אומתו. העסקה מתקדמת בצורה בריאה.",
        bu_img5_title: "AI Copilot (אדום)", bu_img5_desc: "ה-AI זיהה מידע חסר. הוא מציע נתון אבל הנציג חייב 'לאשר' כדי לתקן את הסטטוס.",

        // Project 3 Content
        p2_tag: "פיתוח WEB", p2_title: "רוח גבית", p2_subtitle: "אתר בעל אימפקט חברתי",
        p2_desc_1: "“רוח גבית” – אתר לתמיכה בעסקים עצמאיים בזמן מלחמת חרבות ברזל.", p2_desc_2: "המיקוד היה ביצירת פלטפורמה חברתית המקדמת ותומכת בבעלי עסקים שנפגעו במלחמה, ומעניקה להם נראות וחיבור ללקוחות חדשים.", p2_desc_3: "האתר נבנה כולו ב-HTML, CSS ו-JavaScript, ומשלב עיצוב רספונסיבי עם פונקציונליות צד-לקוח.", p2_features: "כולל טופס הרשמה אינטראקטיבי המאפשר לבעלי עסקים להירשם לפלטפורמה — מתאים עצמו דינמית לקלט המשתמש באמצעות לוגיקה מבוססת אירועים ב-JS.", link_form: "צפייה בטופס האינטראקטיבי",

        // Project 4 Content (Pasta Maker)
        pm_tag: "אפיון ופרוטוטייפ ב-Figma", pm_title: "אפליקציה למכונת פסטה", pm_subtitle: "ממשק חכם לציוד קולינרי",
        pm_h1: "אפיון ופרוטוטייפ", pm_desc_1: "הפרויקט נבנה מאפס ב-Figma, החל מיצירת ארכיטקטורת המידע ועד לבניית אב-טיפוס (Prototype) אינטראקטיבי מלא. המטרה הייתה לדמות את מסע המשתמש מקצה לקצה תוך צמצום מספר הקליקים והפחתת עומס ויזואלי.",
        pm_h2: "שפת UI קולינרית", pm_desc_2: "גיבשנו קונספט עיצובי מינימליסטי ואלגנטי. בחרנו בסגנון איור קווי עדין (Line-art), יחד עם פלטת צבעים מוקפדת של בורדו עמוק על רקע קרמי בהיר, כדי לייצר ניגודיות (קונטרסט) גבוהה וקריאות מקסימלית למשתמש בזמן העבודה במטבח.",
        pm_h3: "שילוב AI בתהליך העיצוב", pm_desc_3: "הנכסים הגרפיים של הממשק (איורי המכונה, הדיסקיות וחומרי הגלם) נוצרו במחוללי תמונות (Generative AI). באמצעות הנדסת פרומפטים קפדנית, שלטנו בסגנון הדו-ממדי ושמרנו על שפה ויזואלית אחידה לחלוטין לכל אורך המסכים בפיגמה, ללא אלמנטים ריאליסטיים שוברי-רצף.",

        // Project 5 Content
        p3_tag: "פיתוח AI", p3_title: "MushBot", p3_subtitle: "זיהוי פטריות מבוסס AI",
        p3_desc_1: "Mushbot מגשר על הפער בין טבע לטכנולוגיה ומסייע למטיילים לזהות פטריות בבטחה.", p3_desc_2: "זיהוי בזמן אמת: אינטגרציה עם Kindwise API לזיהוי בוטני מדויק.", p3_desc_3: "בטיחות קודמת לכל: לוגיקה חכמה המספקת התראות בטיחות (ירוק/אדום) למניעת תאונות.", p3_desc_4: "מידע עשיר: שליפת תוכן מקומי דרך Wikipedia API.", p3_desc_5: "חווית משתמש דינמית: מחולל מתכונים אוטומטי לפטריות למאכל.", p3_tools: "נבנה כולו ב-HTML, CSS ו-JavaScript. <br> שילב מספר כלי AI ו-Web כולל Kindwise API, ml5.js, Gemini ו-Suno AI.",

        // Project 6 Content
        p4_tag: "עיצוב למידה", p4_title: "לגדול ולטפח", p4_subtitle: "מודול אינטראקטיבי לילדים",
        p4_desc_1: "לומדה אינטראקטיבית שתוכננה במיוחד לילדים צעירים כדי להכיר להם את שלושת התנאים לגידול צמחים: אדמה, מים ושמש.", p4_desc_2: "חווית הלמידה היא אינטואיטיבית וחוקרת, ומאפשרת לילדים להיות מעורבים בתוכן במקום לצרוך אותו פסיבית. באמצעות אנימציות צבעוניות ומשוב פשוט, הלומדים חושפים כל תנאי ומתקדמים למבדק ידע.", p4_tech_1: "כל האלמנטים הוויזואליים—איורים, אייקונים ופריסה—נוצרו ב-<strong>Adobe Illustrator</strong>, בסגנון וקטורי נקי ומותאם גיל.", p4_tech_2: "המודול נבנה ב-<strong>Articulate Storyline 360</strong>, ומשלב עקרונות פיתוח הדרכה עם סיפור ויזואלי מותאם אישית.",

        // Project 7 Content
        p5_tag: "זהות מותגית", p5_title: "מיתוג מחדש לאוראו", p5_subtitle: "זהות ויזואלית ועיצוב אריזה",
        p5_desc_1: "פרויקט זה מדמיין מחדש את עוגיית האוראו הקלאסית באמצעות תהליך מיתוג מחדש יצירתי בהשראת עקרונות של סיפור וחווית משתמש.", p5_desc_2: "המטרה הייתה לעצב זהות ויזואלית רעננה שמשמרת את האופי האייקוני והמשחקי של אוראו, תוך הענקת מראה מודרני, אחיד ומרגש יותר.", p5_process_1: "כל הקונספט פותח מאפס — מלוחות השראה וחקירת צבעים ועד איורים וקטוריים, קומפוזיציה ופריסת אריזה.", p5_process_2: "כל האלמנטים הויזואליים נוצרו ב-Adobe Illustrator, תוך הקפדה על סטנדרטים לדפוס ואריזה, כולל חזית, גב וצדדים עם מידע תזונתי וברקודים.", p5_process_3: "הפרויקט מדגים חשיבה אסטרטגית ויזואלית, סיפור מותג ותשומת לב לפרטים, ומדגיש כיצד עיצוב יכול לחבר בין רגש, נוסטלגיה וחווית מוצר.",

        // Project 8 Content
        p6_tag: "בתהליך, מערכות AI", p6_title: "פלטפורמת עיצוב למידה מבוססת AI", p6_subtitle: "מערכת מרובת-סוכנים ואוטומציה",
        p6_desc: "עיצוב מערכת AI מרובת-סוכנים התומכת ומאוטומטת תהליכי עיצוב למידה המבוססים על <strong>מודל ADDIE</strong> ועקרונות <strong>Human-in-the-Loop</strong>.", p6_focus_1: "הגדרת ארכיטקטורת מערכת ותזמור סוכנים (Agent Orchestration).", p6_focus_2: "יצירת זרימות משתמש (User Flows) לשיתוף פעולה בין אדם ל-AI.", p6_focus_3: "מחקר משתמשים לאופטימיזציה של האינטראקציה.", p6_img_title: "ארכיטקטורת מערכת", p6_img_desc: "ויז'ואלים ודיאגרמות לתזמור הסוכנים וזרימות המשתמש נמצאים כרגע בשלבי עיצוב.",

        // Contact Section
        contact_big_header: "צור קשר", contact_btn_work: "בואו נעבוד יחד", contact_btn_hi: "סתם להגיד היי",
        contact_label_email: "אימייל", contact_label_social: "רשתות", contact_link_linkedin: "פרופיל לינקדאין ↗", contact_label_location: "מיקום",
        form_label_name: "שם", form_label_company: "חברה (אופציונלי)", form_label_email: "אימייל", form_label_phone: "טלפון", form_label_message: "רוצים לשמוע עוד? כתבו לי!", form_btn_send: "שלח הודעה"
    }
};

let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'he' : 'en';
    updatePageLanguage();
}

function updatePageLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    const body = document.body;
    
    // Toggle RTL class on body
    if (currentLang === 'he') {
        body.classList.add('rtl');
        document.documentElement.setAttribute('lang', 'he');
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        body.classList.remove('rtl');
        document.documentElement.setAttribute('lang', 'en');
        document.documentElement.setAttribute('dir', 'ltr');
    }

    // Update text content
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                // Placeholder update if needed
            } else {
                el.innerHTML = translations[currentLang][key];
            }
        }
    });
}
