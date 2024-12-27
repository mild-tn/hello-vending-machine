import { useState } from "react";

export const useStepPreview = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);

  const handleNextStep = (condition?: boolean) => {
    if (condition) {
      setNextStep(0);
      setCurrentStep(0);
      return;
    }
    setNextStep(nextStep + 1);
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = (condition: boolean, lastStep = 0) => {
    if (condition) {
      setPreviousStep(lastStep);
      setCurrentStep(lastStep);
      return;
    }
    setPreviousStep(previousStep - 1);
    setCurrentStep(currentStep - 1);
  };

  const reset = () => {
    setCurrentStep(0);
    setNextStep(0);
    setPreviousStep(0);
  };

  return {
    currentStep,
    nextStep,
    previousStep,
    handleNextStep,
    handlePrevStep,
    reset,
  };
};
