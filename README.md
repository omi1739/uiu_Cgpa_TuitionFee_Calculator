# UIU CGPA Calculator

<p align="center">
  <a href="https://uiu-cgpa-calculator.vercel.app" target="_blank"><strong>Launch Live App →</strong></a>
  <br />
  <a href="https://uiu-cgpa-calculator.vercel.app">https://uiu-cgpa-calculator.vercel.app</a>
</p>

A comprehensive academic planning tool for **United International University (UIU)** students. Calculate semester GPA, cumulative CGPA, tuition fees, and scholarship waivers — all in one place.

Built with [Next.js](https://nextjs.org) (App Router), [HeroUI](https://heroui.com), [Tailwind CSS v4](https://tailwindcss.com), and [Capacitor](https://capacitorjs.com) for cross-platform mobile support.

## Features

- **CGPA Calculator** — Add courses with credits & grades, compute semester GPA and cumulative CGPA using UIU's official grade scale
- **Target CGPA Planner** — Plan what GPA you need in remaining credits to reach a desired CGPA
- **Tuition Fee Calculator** — Calculate tuition fees based on credit count, retake discounts, FYDP adjustments, waivers, and extra fees (transport, gym, late fee)
- **Waiver Assistant** — Check admission scholarship eligibility based on SSC/HSC GPA
- **Important Links** — Quick access to UIU ELMS, UCAM, exam routines, library, and more
- **Installable PWA** — Works as a Progressive Web App with offline support

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 16 (App Router) | Framework with static export |
| React 19 | UI library |
| HeroUI 3 | Component library |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| Capacitor 8 | Native mobile wrapper (iOS + Android) |
| Vercel Analytics | Usage tracking |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Build

```bash
npm run build
```

Exports a static site to the `out/` directory.

## Deployment

The app is designed for static hosting (Vercel, Netlify, GitHub Pages) or as a Capacitor native app.

```bash
npm run build
npx cap sync
npx cap open android   # or: npx cap open ios
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.js           # Root layout (metadata, fonts, analytics)
│   ├── page.js             # Home page with feature cards
│   ├── client-shell.js     # Client wrapper (navbar, footer, theme)
│   ├── calculator/page.js  # CGPA calculator route
│   ├── tuition/page.js     # Tuition fee calculator route
│   ├── guide/page.js       # User guide route
│   └── links/page.js       # Important links route
├── components/             # React components
│   ├── constants.js        # Grade scale, presets, links data
│   ├── CGPACalculator.js   # CGPA calculation logic
│   ├── CourseList.js       # Course entry form
│   ├── ResultsPanel.js     # GPA result display
│   ├── PreviousCGPAInput.js
│   ├── TargetPlanner.js    # Target CGPA planning
│   ├── TuitionCalculator.js
│   ├── CreditsCard.js      # Credit breakdown
│   ├── UnitFeesCard.js     # Fee settings
│   ├── ExtrasCard.js       # Optional fees & mode
│   ├── WaiverAssistant.js  # Scholarship checker
│   ├── FeeSummary.js       # Fee breakdown
│   ├── Navbar.js, Footer.js
│   ├── GradeScaleModal.js
│   ├── LinksView.js, GuideView.js
│   └── HeroBanner.js
└── app/globals.css         # Tailwind v4 + theme variables
```

## License

MIT
