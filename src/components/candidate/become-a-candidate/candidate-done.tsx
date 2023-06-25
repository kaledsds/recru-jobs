import { CheckCircle } from "lucide-react";

interface CandidateDoneProps {
  goPreviousStep: () => void;
  submitCandidateData: () => void;
}

/**
 * The candidate done component.
 * @param goPreviousStep The function to go to the previous step.
 * @param submitCandidateData The function to submit the candidate data.
 * @returns The JSX element for the candidate done component.
 */
const CandidateDone: React.FC<CandidateDoneProps> = ({
  goPreviousStep,
  submitCandidateData,
}) => {
  return (
    <div className="space-y-8 py-4">
      <h1 className="text-center text-5xl font-bold">Begin your journey!</h1>
      <CheckCircle className="mx-auto h-20 w-20 text-emerald-500" />
      {/* Buttons */}
      <div className="flex justify-between">
        {/* Previous btn */}
        <button
          className="btn-outline btn-primary btn-sm btn"
          onClick={goPreviousStep}
        >
          Previous
        </button>
        {/* Next btn */}
        <button
          className="btn-primary btn-sm btn"
          onClick={submitCandidateData}
        >
          Begin
        </button>
      </div>
    </div>
  );
};

export default CandidateDone;
