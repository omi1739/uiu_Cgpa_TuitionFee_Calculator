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
            <Calculator className="h-5 w-5 text-orange-500" /> GPA Calculation Formula
          </h3>
          <p>
            Your GPA is calculated by taking the sum of the product of course credits and their corresponding grade
            points, divided by the total credits attempted:
          </p>
          <div className="bg-surface-secondary p-4 rounded-xl border border-border font-mono text-center text-xs sm:text-sm text-orange-600">
            GPA = &sum; (Course Credits &times; Grade Points) / Total Attempted Credits
          </div>
          <p>
            Cumulative CGPA is computed by taking the total cumulative grade points accumulated over all semesters,
            divided by the overall credits completed.
          </p>

          <h3 className="text-lg font-bold text-foreground mt-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-orange-500" /> Tuition Calculation Overview
          </h3>
          <p>
            The tuition fee is computed as: <strong>Total Tuition = (Per-Credit Fee &times; Total Credits) + Registration Fee</strong>.
            Waivers and discounts (merit-based scholarships, first-retake 50% discount) are subtracted, and optional
            fees (transportation, gym, late fee) are added to produce the final payable amount.
          </p>
          <p>
            Fees are split into three installments: <strong>40% + 30% + 30%</strong>, following UIU&apos;s standard
            payment schedule.
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
