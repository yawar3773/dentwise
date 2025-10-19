import { ChevronRightIcon } from "lucide-react";

const PROGRESS_STEPS = ["Select Dentist", "Choose Time", "Confirm"];

function ProgressSteps({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      {PROGRESS_STEPS.map((stepName, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep >= stepNumber;

        return (
          <div key={stepNumber} className="flex items-center gap-2">
            {/* step circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {stepNumber}
            </div>

            {/* step name */}
            <span className={`text-sm ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
              {stepName}
            </span>

            {/* arrow (not shown for last step) */}
            {stepNumber < PROGRESS_STEPS.length && (
              <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        );
      })}
    </div>
  );
}
export default ProgressSteps;