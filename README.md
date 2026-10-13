# The Full Wellness Package — by Daniel Bellaish

אתר סטטי (HTML/CSS/JS) עם הקורסים, הפודקאסט והמדריכים החינמיים.

## קישורים ופודקאסט
בראש `courses.js` יש `LINKS`: אינסטגרם, טיקטוק, וקישורי Spotify / Apple Podcasts.
כל עוד קישורי הפודקאסט ריקים, הכפתורים מסומנים "בקרוב". ברגע שמדביקים קישור — הם נדלקים.

## איך מוסיפים קורס
1. פותחים את `courses.js`.
2. מעתיקים בלוק `{ ... }` קיים בתוך `PAID_COURSES` (בתשלום), או מוסיפים ל-`FREE_GUIDES` (חינם) לפי הדוגמה שבהערה.
3. משנים כותרת, תיאור, מחיר וקישורים.
4. תמונות שמים בתיקייה `assets/images/` ומפנים אליהן: `image: "assets/images/my-course.jpg"`.

## איך משנים צבעים
כל הגוונים נמצאים בראש `style.css` תחת `:root`.

## פרסום
- **Vercel**: Import של הריפו → Framework: Other → Deploy (אין צורך ב-build).
- **GitHub Pages**: Settings → Pages → Deploy from branch → `main` / root.
