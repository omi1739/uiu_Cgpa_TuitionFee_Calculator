"use client";

import { motion } from "framer-motion";
import { Card, Separator } from "@heroui/react";
import { BookOpen, Calculator, HelpCircle } from "lucide-react";

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
            The <strong>UIU CGPA &amp; Tuition Planner</strong> is a premium academic planner built explicitly for
            students at <strong>United International University (UIU)</strong>. It helps students track their current
            semester Grade Point Average (GPA), Cumulative Grade Point Average (CGPA), and dynamic tuition costs
            instantaneously according to UIU&apos;s official rules.
          </p>
          <p>
            The application is fully optimized for speed and works on any viewport (mobile or desktop). With built-in
            features like the Target CGPA Planner, UIU students can calculate their future grade requirements to meet
            scholarship requirements or graduation targets.
          </p>

          <h3 className="text-lg font-bold text-foreground mt-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-orange-500" /> Calculation Formula
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
            title="Enter Current Semester Courses"
            description="Input your course name/code, select the credit value (usually 3.0 credits for theory, 1.0 or 1.5 credits for sessional/lab courses), and choose the letter grade you expect or have secured."
          />
          <GuideStep
            number={2}
            title="Estimate Tuition Fees & Waivers"
            description="Head over to the Tuition Fee Calculator tab, choose your degree path, and type in your SSC/HSC scores. The dashboard will automatically apply valid scholarships and show your trimester/graduation costs."
          />
          <GuideStep
            number={3}
            title="Use the Target Planner"
            description="Input your target CGPA and the credits you have remaining in your degree. The calculator will estimate the average GPA required in the upcoming semesters to hit your target."
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
        <p className="mt-1 text-xs sm:text-sm text-muted font-medium">{description}</p>
      </div>
    </div>
  );
}
