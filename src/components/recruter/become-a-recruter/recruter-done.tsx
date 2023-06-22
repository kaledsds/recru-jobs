import { CheckCircle } from "lucide-react";

interface RecruterDoneProps {
  goPreviousStep: () => void;
  submitRecruterData: () => void;
}

const RecruterDone: React.FC<RecruterDoneProps> = ({
  goPreviousStep,
  submitRecruterData,
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
        <button className="btn-primary btn-sm btn" onClick={submitRecruterData}>
          Begin
        </button>
      </div>
    </div>
  );
};

export default RecruterDone;
