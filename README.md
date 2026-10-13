# Best Version by Daniel — אתר הקורסים

אתר סטטי (HTML/CSS/JS) שמציג קורסים בתשלום ומדריכים בחינם.

## איך מוסיפים קורס
1. פותחים את `courses.js`.
2. מעתיקים בלוק `{ ... }` קיים בתוך `PAID_COURSES` (בתשלום) או `FREE_GUIDES` (חינם).
3. משנים כותרת, תיאור, מחיר וקישורים. מוחקים את השורה `example: true`.
4. תמונות שמים בתיקייה `assets/images/` ומפנים אליהן: `image: "assets/images/my-course.jpg"`.

## איך משנים צבעים
כל הגוונים נמצאים בראש `style.css` תחת `:root`.

## פרסום
- **Vercel**: Import של הריפו → Framework: Other → Deploy (אין צורך ב-build).
- **GitHub Pages**: Settings → Pages → Deploy from branch → `main` / root.
