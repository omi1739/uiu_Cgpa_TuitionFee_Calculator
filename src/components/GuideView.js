"use client";

import { motion } from "framer-motion";
import { Card, Separator } from "@heroui/react";
import { BookOpen, Calculator, DollarSign, Link2, HelpCircle } from "lucide-react";

export default function GuideView() {
  return (
    <motion.main
      key="about-guide"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto px-6 flex flex-col gap-8"
    >
      <Card className="border border-border bg-surface/70 backdrop-blur-xl shadow-sm">
        <Card.Header className="px-6 pt-6">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-black text-foreground">About the Calculator</h2>
          </div>
        </Card.Header>
        <Separator className="my-2 bg-separator" />
        <Card.Content className="px-6 py-6 flex flex-col gap-4 text-foreground leading-relaxed text-sm">
          <p>
            The <strong>UIU CGPA &amp; Tuition Planner</strong> is a comprehensive academic planning tool built
            for students at <strong>United International University (UIU)</strong>. It combines four essential
            tools into a single dashboard:
          </p>

          <ul className="flex flex-col gap-3 pl-2">
            <li className="flex items-start gap-2.5">
              <Calculator className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
              <span><strong>CGPA Calculator</strong> &mdash; Calculate semester GPA and cumulative CGPA using UIU&apos;s official grade scale.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <DollarSign className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
              <span><strong>Tuition Fee Calculator</strong> &mdash; Estimate tuition costs with waiver discounts and view installment schedules.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Link2 className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
              <span><strong>Links for Students</strong> &mdash; Quick access to essential university portals like ELMS, UCAM, and library.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <HelpCircle className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
              <span><strong>User Guide &amp; About</strong> &mdash; Documentation and reference for all features.</span>
            </li>
          </ul>

          <h3 className="text-lg font-bold text-foreground mt-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-orange-500" /> UIU Grading System &amp; GPA Calculation
          </h3>
          <p>
            United International University (UIU) follows the standard letter-grade system with GPA values ranging
            from <strong>4.00 (A)</strong> to <strong>0.00 (F)</strong>. Each letter grade corresponds to a specific
            mark range and grade point used in GPA computation:
          </p>
          <ul className="flex flex-col gap-1.5 pl-2 text-sm">
            <li><strong>A (4.00)</strong> &mdash; 90-100% (Outstanding)</li>
            <li><strong>A- (3.67)</strong> &mdash; 86-89% (Excellent)</li>
            <li><strong>B+ (3.33)</strong> &mdash; 82-85% (Very Good)</li>
            <li><strong>B (3.00)</strong> &mdash; 78-81% (Good)</li>
            <li><strong>B- (2.67)</strong> &mdash; 74-77% (Satisfactory)</li>
            <li><strong>C+ (2.33)</strong> &mdash; 70-73% (Above Average)</li>
            <li><strong>C (2.00)</strong> &mdash; 66-69% (Average)</li>
            <li><strong>C- (1.67)</strong> &mdash; 62-65% (Below Average)</li>
            <li><strong>D+ (1.33)</strong> &mdash; 58-61% (Poor)</li>
            <li><strong>D (1.00)</strong> &mdash; 55-57% (Very Poor)</li>
            <li><strong>F (0.00)</strong> &mdash; Below 55% (Failed)</li>
          </ul>
          <p>
            Your <strong>semester GPA</strong> is calculated by dividing the total grade points earned by the total
            credits attempted in that semester:
          </p>
          <div className="bg-surface-secondary p-4 rounded-xl border border-border font-mono text-center text-xs sm:text-sm text-orange-600">
            GPA = &sum; (Course Credits &times; Grade Points) / Total Attempted Credits
          </div>

          <h4 className="font-bold text-foreground mt-3">How UIU Calculates Cumulative CGPA</h4>
          <p>
            Your <strong>cumulative CGPA</strong> considers all semesters completed so far. It is computed by taking
            the total grade points accumulated over every semester divided by the total credits completed. Use the
            <strong> Previous CGPA input</strong> on the calculator to combine your existing academic history with
            your current semester results for an accurate overall CGPA.
          </p>

          <h4 className="font-bold text-foreground mt-3">UIU Passing Marks &amp; Retake Policy</h4>
          <p>
            At UIU, the minimum passing mark is <strong>55% (D grade)</strong>. A grade of <strong>F (below 55%)</strong>
            is a fail and must be retaken. When you retake a course, the new grade replaces the old one in your
            CGPA calculation. The first retake of any course receives a <strong>50% discount</strong> on the
            per-credit tuition fee, making retake registration more affordable. Repeated retakes are charged at the
            full per-credit rate. The CGPA calculator and tuition fee calculator both account for these rules
            automatically.
          </p>

          <h3 className="text-lg font-bold text-foreground mt-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-orange-500" /> UIU Tuition Fee Structure
          </h3>
          <p>
            UIU tuition fees are calculated based on the <strong>per-credit fee</strong> multiplied by the number of
            credits enrolled, plus a fixed <strong>registration fee</strong> each trimester or semester. The total
            tuition is computed as:
          </p>
          <div className="bg-surface-secondary p-4 rounded-xl border border-border font-mono text-center text-xs sm:text-sm text-orange-600">
            Total Tuition = (Per-Credit Fee &times; Total Credits) + Registration Fee
          </div>

          <h4 className="font-bold text-foreground mt-3">Merit-Based Scholarship &amp; Waiver Criteria</h4>
          <p>
            UIU offers admission scholarships based on <strong>SSC and HSC GPA</strong> (Spring 2025 onwards):
          </p>
          <p className="font-semibold text-foreground text-xs mt-2">National Curriculum:</p>
          <ul className="flex flex-col gap-1.5 pl-2 text-sm">
            <li><strong>50% Waiver</strong> &mdash; SSC GPA 5.00 (with 4th subject) &amp; HSC GPA 5.00 (without 4th subject)</li>
            <li><strong>25% Waiver</strong> &mdash; SSC GPA 4.50 (with 4th subject) &amp; HSC GPA 5.00 (with 4th subject)</li>
          </ul>
          <p className="font-semibold text-foreground text-xs mt-2">English Medium (O/A Level):</p>
          <ul className="flex flex-col gap-1.5 pl-2 text-sm">
            <li><strong>50% Waiver</strong> &mdash; 5 A&apos;s in O-Level (in one sitting) &amp; 2 A&apos;s in A-Level</li>
            <li><strong>25% Waiver</strong> &mdash; 5 A&apos;s in O-Level (in one sitting) &amp; 1 A in A-Level</li>
          </ul>
          <p>
            The waiver applies only to the <strong>credit fee portion</strong> of your tuition, not the registration
            fee. The <strong>Waiver Assistant</strong> feature automatically checks your eligibility when you enter
            your SSC and HSC GPAs. Students can also manually set a waiver percentage in the tuition fee calculator.
          </p>

          <h4 className="font-bold text-foreground mt-3">FYPD Credit Exemption &amp; Fee Discounts</h4>
          <p>
            If you are enrolled in the <strong>Final Year Project (FYPD)</strong>, 2 credits are exempted from the
            tuition waiver calculation. The tuition fee calculator also applies the <strong>first-retake 50%
            discount</strong> automatically when you enter first-retake credits separately from regular retakes.
          </p>

          <h4 className="font-bold text-foreground mt-3">Installment Payment Plan</h4>
          <p>
            UIU divides tuition fees into <strong>three installments</strong> per trimester or semester:
            <strong>40% + 30% + 30%</strong>. Optional fees such as <strong>transportation (Tk 4,000 per trimester,
            Tk 6,000 per semester)</strong>, gym membership, and late registration fees are added to the first
            installment. The Fee Summary panel displays a complete breakdown of all charges and the installment
            schedule.
          </p>
        </Card.Content>
      </Card>

      <Card className="border border-border bg-surface/70 backdrop-blur-xl shadow-sm">
        <Card.Header className="px-6 pt-6">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-black text-foreground">Step-by-Step User Guide</h2>
          </div>
        </Card.Header>
        <Separator className="my-2 bg-separator" />
        <Card.Content className="px-6 py-6 flex flex-col gap-6 text-foreground text-sm">
          <GuideStep
            number={1}
            title="Calculate Your Semester GPA &amp; CGPA"
            description="Go to the CGPA Calculator tab. Add your current semester courses by entering course names, selecting credit hours (3.0 for theory, 1.0/1.5 for lab/sessional), and choosing your expected or earned grade. Optionally, enter your previous CGPA and earned credits to calculate your updated cumulative CGPA. Click 'Calculate CGPA' to see results and use the Target CGPA Planner to plan future semesters."
          />
          <GuideStep
            number={2}
            title="Estimate Tuition Fees &amp; Waivers"
            description="Switch to the Tuition Fee Calculator tab. Select your per-credit fee, registration fee, and waiver percentage from presets or enter custom values. Input your enrolled credits (regular, first-retake at 50% discount, and retake). The Waiver Assistant can automatically suggest your merit-based waiver when you enter your SSC and HSC GPAs. Optional fees like transportation (Tk 4,000/trimester or Tk 6,000/semester), gym, and late fee can be toggled. The Fee Summary panel shows a detailed breakdown with installment schedule."
          />
          <GuideStep
            number={3}
            title="Access Student Portals &amp; Resources"
            description="The Links for Students tab provides quick one-click access to essential UIU portals: ELMS for course materials, UCAM for academic records, the Exam Routine Portal, library resources, and the main university website. Each link opens in a new tab for convenience."
          />
          <GuideStep
            number={4}
            title="Use the Target CGPA Planner"
            description="After calculating your current GPA, set a target CGPA and the number of remaining credits in your degree. The planner will compute the average GPA you need in upcoming semesters to reach your goal — helping you stay on track for graduation requirements or scholarship retention."
          />
          <GuideStep
            number={5}
            title="Explore the Grade Scale &amp; Theme Toggle"
            description="Click the 'Scale' button in the top navigation to view UIU's official A-F grading system with GPA values, mark ranges, and remarks. Use the sun/moon theme toggle to switch between dark and light modes for comfortable viewing."
          />
        </Card.Content>
      </Card>
    </motion.main>
  );
}

function GuideStep({ number, title, description }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="h-8 w-8 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 flex items-center justify-center font-bold shrink-0">
        {number}
      </div>
      <div>
        <h4 className="font-bold text-foreground text-base">{title}</h4>
        <p className="mt-1 text-xs sm:text-sm text-muted font-medium leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
