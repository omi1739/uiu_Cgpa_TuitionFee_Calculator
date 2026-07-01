# UIU CGPA & Tuition Fee Calculator

<p align="center">
  <a href="https://uiu-cgpa-tuition-fee-calculator.vercel.app" target="_blank"><strong>🚀 Launch Live App →</strong></a>
  <br />
  <a href="https://uiu-cgpa-tuition-fee-calculator.vercel.app">https://uiu-cgpa-tuition-fee-calculator.vercel.app</a>
</p>

---

## 📚 About

The **UIU CGPA & Tuition Fee Calculator** is the ultimate **free academic planning tool** for **United International University (UIU)** students in Dhaka, Bangladesh. 

Whether you're planning your semester, checking scholarship eligibility, or estimating your tuition costs, this comprehensive calculator has you covered.

### 🎯 Perfect For:
- **UIU Undergraduates** — Calculate semester GPA and cumulative CGPA
- **Academic Planners** — Plan target CGPA and course retakes
- **Financial Planning** — Estimate trimester tuition fees with waivers
- **Scholarship Seekers** — Check waiver eligibility based on admission GPA

---

## ✨ Features

- **📊 CGPA Calculator** — Add courses with credits & grades, compute semester GPA and cumulative CGPA using UIU's official grade scale
- **🎯 Target CGPA Planner** — Plan what GPA you need in remaining credits to reach a desired CGPA
- **💰 Tuition Fee Calculator** — Calculate tuition fees based on:
  - Credit count and per-credit pricing
  - Retake discounts (50% off for first retakes)
  - FYDP adjustments
  - Scholarship waivers and discounts
  - Extra fees (transportation, gym, late fees)
- **🏆 Waiver Assistant** — Check admission scholarship eligibility based on SSC/HSC GPA
- **🔗 Important Links** — Quick access to UIU ELMS, UCAM, exam routines, library, and more
- **📱 Installable PWA** — Works as a Progressive Web App with offline support
- **🌙 Dark Mode** — Easy on the eyes with theme toggle
- **⚡ Lightning Fast** — Optimized for performance on mobile and desktop

---

## 🛠️ Tech Stack

| Tool | Purpose | Version |
|------|---------|----------|
| **Next.js** | Framework with static export | 16.2.9 |
| **React** | UI library | 19.2.4 |
| **HeroUI** | Component library | 3.2.1 |
| **Tailwind CSS** | Styling | v4 |
| **Framer Motion** | Animations | 12.42.1 |
| **Lucide React** | Icons | 1.22.0 |
| **Capacitor** | Native mobile wrapper (iOS + Android) | 8.0+ |
| **Vercel Analytics** | Usage tracking | 2.0.1 |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/omi1739/uiu_Cgpa_TuitionFee_Calculator.git
cd uiu_Cgpa_TuitionFee_Calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build & Deployment

### Build Static Site

```bash
npm run build
```

Exports a static site to the `out/` directory, ready for hosting on Vercel, Netlify, or GitHub Pages.

### Deploy to Vercel

The app is already configured for Vercel deployment:

```bash
# Push to GitHub and connect with Vercel
# Vercel will auto-deploy on push to main
```

### Build Native Mobile App

```bash
npm run build
npx cap sync
npx cap open android   # or: npx cap open ios
```

---

## 📁 Project Structure

```
uiu_Cgpa_TuitionFee_Calculator/
├── src/
│   ├── app/
│   │   ├── layout.js                # Root layout (metadata, fonts, analytics)
│   │   ├── page.js                  # Home page with feature cards
│   │   ├── client-shell.js          # Client wrapper (navbar, footer, theme)
│   │   ├── calculator/page.js       # CGPA calculator route
│   │   ├── tuition/page.js          # Tuition fee calculator route
│   │   ├── guide/page.js            # User guide route
│   │   ├── links/page.js            # Important links route
│   │   └── globals.css              # Tailwind v4 + theme variables
│   └── components/
│       ├── CGPACalculator.js        # CGPA calculation logic
│       ├── CourseList.js            # Course entry form
│       ├── ResultsPanel.js          # GPA result display
│       ├── PreviousCGPAInput.js     # Previous CGPA input
│       ├── TargetPlanner.js         # Target CGPA planning
│       ├── TuitionCalculator.js     # Tuition fee logic
│       ├── CreditsCard.js           # Credit breakdown
│       ├── UnitFeesCard.js          # Fee settings
│       ├── ExtrasCard.js            # Optional fees & mode
│       ├── WaiverAssistant.js       # Scholarship checker
│       ├── FeeSummary.js            # Fee breakdown
│       ├── constants.js             # Grade scale, presets, links data
│       ├── Navbar.js & Footer.js    # Navigation & footer
│       ├── GradeScaleModal.js       # Grade scale reference
│       ├── LinksView.js & GuideView.js
│       └── HeroBanner.js            # Hero section
├── public/
│   ├── sitemap.xml                  # SEO sitemap
│   ├── robots.txt                   # Search engine crawling rules
│   ├── manifest.json                # PWA manifest
│   ├── og-image.png                 # Open Graph image
│   ├── logo.svg                     # App logo
│   └── ...
├── next.config.js                   # Next.js configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── package.json                     # Dependencies & scripts
└── README.md                        # This file
```

---

## 📖 UIU Grade Scale Reference

Calculator uses UIU's official grading scale:

| Grade | Grade Points | Range |
|-------|--------------|-------|
| A | 4.00 | 90-100 |
| A- | 3.67 | 85-89 |
| B+ | 3.33 | 80-84 |
| B | 3.00 | 75-79 |
| B- | 2.67 | 70-74 |
| C+ | 2.33 | 65-69 |
| C | 2.00 | 60-64 |
| D | 1.00 | 55-59 |
| F | 0.00 | 0-54 |

---

## ❓ FAQ

**Q: Is this calculator officially affiliated with UIU?**  
A: No, this is an independent student project. However, it follows UIU's official grading policy and fee structure based on public information.

**Q: Can I use this offline?**  
A: Yes! Install the app as a PWA. After first load, all calculations work offline.

**Q: Is my data stored somewhere?**  
A: No, all calculations happen locally in your browser. We don't store personal academic data.

**Q: How often is the calculator updated?**  
A: We update pricing and policies as UIU announces changes. Check back regularly!

**Q: Does this work on mobile?**  
A: Yes! The app is fully responsive and works on all devices. You can install it as a native app.

---

## 🔒 Privacy & Security

- ✅ **No data collection** — All calculations happen locally
- ✅ **No cookies** — We use analytics only (anonymous)
- ✅ **HTTPS only** — Secure connection
- ✅ **Open source** — Full transparency

---

## 🤝 Contributing

We welcome contributions! To improve the calculator:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m 'Add feature'`
4. **Push** to the branch: `git push origin feature/your-feature`
5. **Open a Pull Request**

### Areas for Contribution:
- Fix bugs or inaccuracies in calculations
- Update fee structures and policies
- Improve UI/UX
- Add translations (Bangla, etc.)
- Improve documentation

---

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details

---

## 📞 Support & Feedback

- **Report a Bug**: [GitHub Issues](https://github.com/omi1739/uiu_Cgpa_TuitionFee_Calculator/issues)
- **Suggest a Feature**: [GitHub Discussions](https://github.com/omi1739/uiu_Cgpa_TuitionFee_Calculator/discussions)
- **Contact**: Open an issue on GitHub

---

## 🌟 Give Us a Star!

If this calculator helps you, please **star** this repository! It helps other UIU students discover the tool.

[![GitHub Stars](https://img.shields.io/github/stars/omi1739/uiu_Cgpa_TuitionFee_Calculator?style=social)](https://github.com/omi1739/uiu_Cgpa_TuitionFee_Calculator)

---

## 👨‍💻 Built by

**Omi** — UIU Student & Developer

---

**Made with ❤️ for UIU Students**