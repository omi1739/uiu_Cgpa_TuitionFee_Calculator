"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import UnitFeesCard from "./UnitFeesCard";
import CreditsCard from "./CreditsCard";
import ExtrasCard from "./ExtrasCard";
import WaiverAssistant from "./WaiverAssistant";
import FeeSummary from "./FeeSummary";

export default function TuitionCalculator() {
  const [creditFee, setCreditFee] = useState("6500");
  const [registrationFee, setRegistrationFee] = useState("5000");
  const [waiverPercent, setWaiverPercent] = useState(0);
  const [regularCredits, setRegularCredits] = useState("12");
  const [firstRetakeCredits, setFirstRetakeCredits] = useState("");
  const [retakeCredits, setRetakeCredits] = useState("");
  const [fydp, setFydp] = useState(false);
  const [lateFee, setLateFee] = useState(false);
  const [transportFee, setTransportFee] = useState(false);
  const [gymFee, setGymFee] = useState(false);
  const [trimesterMode, setTrimesterMode] = useState(true);

  const [sscGpa, setSscGpa] = useState("");
  const [hscGpa, setHscGpa] = useState("");

  const suggestedWaiver = useMemo(() => {
    const ssc = parseFloat(sscGpa);
    const hsc = parseFloat(hscGpa);

    if (!isNaN(ssc) && !isNaN(hsc)) {
      if (ssc >= 5.0 && hsc >= 5.0) return 50;
      if (ssc >= 4.5 && hsc >= 5.0) return 25;
      return 0;
    }
    return null;
  }, [sscGpa, hscGpa]);

  const cf = parseFloat(creditFee) || 0;
  const rf = parseFloat(registrationFee) || 0;
  const regCred = parseFloat(regularCredits) || 0;
  const frCred = parseFloat(firstRetakeCredits) || 0;
  const retCred = parseFloat(retakeCredits) || 0;

  const totalTuition = cf * (regCred + frCred + retCred) + rf;
  const waiverDeduction = (regCred - (fydp ? 2 : 0)) * cf * (waiverPercent / 100);
  const retakeDiscount = frCred * cf * 0.5;
  const totalWaiver = waiverDeduction + retakeDiscount;
  const netTuition = Math.max(0, totalTuition - totalWaiver);

  const lateAmt = lateFee ? 500 : 0;
  const transportAmt = transportFee ? (trimesterMode ? 1500 : 2000) : 0;
  const gymAmt = gymFee ? (trimesterMode ? 1500 : 2200) : 0;
  const totalAddedFees = lateAmt + transportAmt + gymAmt;

  const feeTotal = netTuition + totalAddedFees;
  const installments = [feeTotal * 0.4, feeTotal * 0.3, feeTotal * 0.3];

  const feeBreakdown = {
    feeTotal, installments, totalTuition, registrationFee: rf,
    waiverDeduction, retakeDiscount, netTuition,
    lateAmt, transportAmt, gymAmt,
    waiverPercent, trimesterMode, regCred, frCred, retCred, fydp, cf
  };

  return (
    <motion.main
      key="tuition-calculator"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
      className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8"
    >
      <div className="lg:col-span-8 flex flex-col gap-6">
        <UnitFeesCard
          creditFee={creditFee}
          registrationFee={registrationFee}
          waiverPercent={waiverPercent}
          onCreditFeeChange={setCreditFee}
          onRegistrationFeeChange={setRegistrationFee}
          onWaiverPercentChange={(v) => setWaiverPercent(Math.min(100, Math.max(0, parseInt(v) || 0)))}
        />
        <CreditsCard
          regularCredits={regularCredits}
          firstRetakeCredits={firstRetakeCredits}
          retakeCredits={retakeCredits}
          onRegularChange={setRegularCredits}
          onFirstRetakeChange={setFirstRetakeCredits}
          onRetakeChange={setRetakeCredits}
        />
        <ExtrasCard
          fydp={fydp}
          lateFee={lateFee}
          transportFee={transportFee}
          gymFee={gymFee}
          trimesterMode={trimesterMode}
          onFydpChange={setFydp}
          onLateFeeChange={setLateFee}
          onTransportChange={setTransportFee}
          onGymChange={setGymFee}
          onTrimesterModeChange={setTrimesterMode}
        />
        <WaiverAssistant
          sscGpa={sscGpa}
          hscGpa={hscGpa}
          suggestedWaiver={suggestedWaiver}
          onSscGpaChange={setSscGpa}
          onHscGpaChange={setHscGpa}
        />
      </div>

      <div className="lg:col-span-4 flex flex-col gap-6">
        <FeeSummary feeBreakdown={feeBreakdown} />
      </div>
    </motion.main>
  );
}
