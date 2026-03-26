# Cut_to_Code — Official Club Website

A premium, modern, glassmorphism-themed website for the Cut_to_Code (C2C) coding club at SLIET. Built for performance, high-end interactivity, and seamless recruitment.

## 🚀 Tech Stack
- **React 18** + **Vite**
- **Tailwind CSS** (Utility-first styling, custom glow effects)
- **GSAP & ScrollTrigger** (Advanced scroll animations, seamless sliders, page transitions)
- **React Router DOM** (Instant page routing for the Join application)
- **Google Apps Script** (Serverless database integration via Google Sheets)

## 📁 Project Structure
```text
src/
├── App.jsx                 ← Main entry, handles React Router routes
├── index.css               ← Global styles, Tailwind directives
├── main.jsx                ← ReactDOM entry
└── components/
    ├── Navbar.jsx          ← Fixed blurred navbar with smooth scroll anchors
    ├── Hero.jsx            ← Hero section with campus background & glassmorphism stats
    ├── About.jsx           ← Editorial layout with simulated terminal
    ├── Domains.jsx         ← Interactive domain deep-dive with auto-play
    ├── Team.jsx            ← Seamless auto-scrolling member slider with department filters
    ├── Events.jsx          ← Notice board dashboard with category sorting
    ├── Footer.jsx          ← Dynamic mouse-spotlight CTA & official contact links
    └── Join.jsx            ← Dedicated recruitment application form (Routes to /join)
```

## 💻 Setup & Run

```bash
# Install dependencies (including react-router-dom and gsap)
npm install

# Start the local development server
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## ✏️ Customization & Management Guide

### 1. Update Core Assets (Logo & Backgrounds)
- Place your images in the `src/assets/` folder.
- In `src/App.jsx`, update the imports at the top:
  ```js
  import Logo from './assets/your-logo.png';
  import HeroBg from './assets/your-background.jpg';
  ```

### 2. Managing the Team
- Open `src/components/Team.jsx`.
- Locate the `teamData` array at the top of the file.
- You can add, remove, or edit members here. The slider and filters will automatically adjust based on the `category` you assign them. Don't forget to update their `linkedin` URLs!

### 3. Posting Events & Notices
- Open `src/components/Events.jsx`.
- Locate the `events` array at the top.
- Add new objects for your upcoming Hackathons, Workshops, or Notices. 
- Change the `status` to `'past'` to automatically gray them out and archive them.

### 4. Updating Social Links
- Open `src/components/Footer.jsx`.
- Locate the `socialLinks` array at the top to update LinkedIn, Instagram, X, or add new platforms.
- The official club email is already linked to automatically open the user's Gmail.

---

## 🗄️ Google Sheets Database Setup (Recruitment Form)

The `/join` form sends data directly to a Google Sheet without needing a backend server. To set this up for a new year or new workspace:

### Step 1: Prepare the Sheet
1. Create a new Google Sheet.
2. In Row 1, add these exact headers (case-sensitive) in columns A through G:
   `timestamp` | `fullName` | `email` | `phone` | `year` | `domain` | `query`

### Step 2: Add the Apps Script
1. In your Google Sheet, click **Extensions > Apps Script**.
2. Delete any existing code and paste the following:
   ```javascript
   const sheetName = 'Sheet1'; // Make sure this matches your sheet tab name at the bottom
   const scriptProp = PropertiesService.getScriptProperties();

   function initialSetup () {
     const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
     scriptProp.setProperty('key', activeSpreadsheet.getId());
   }

   function doPost (e) {
     const lock = LockService.getScriptLock();
     lock.tryLock(10000);
     try {
       const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
       const sheet = doc.getSheetByName(sheetName);
       const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
       const nextRow = sheet.getLastRow() + 1;
       
       const newRow = headers.map(function(header) {
         return header === 'timestamp' ? new Date() : e.parameter[header];
       });
       
       sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
       return ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow })).setMimeType(ContentService.MimeType.JSON);
     } catch (e) {
       return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': e })).setMimeType(ContentService.MimeType.JSON);
     } finally {
       lock.releaseLock();
     }
   }
   ```
3. Save the file (Ctrl+S / Cmd+S).
4. Select `initialSetup` from the function dropdown at the top and click **Run**. Grant all requested permissions.

### Step 3: Deploy & Connect
1. Click **Deploy > New deployment** (Top right).
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set "Execute as" to **Me**, and "Who has access" to **Anyone**.
4. Click Deploy and **Copy the Web App URL**.
5. Open `src/components/Join.jsx` in your project.
6. Paste the URL into the `GOOGLE_SCRIPT_URL` variable at the top of the file.

---

## 🚀 Build for Production

When you are ready to push the website live to platforms like Vercel, Netlify, or GitHub Pages:

```bash
npm run build
```
This will generate an optimized, minified bundle in the `dist/` directory ready for deployment.
```