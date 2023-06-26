import { type FormEvent, useState } from "react";
import { Spinner } from "~/components/ui";
import { uploadPDFService } from "~/services/uploadPDF";

interface CandidateResumeProps {
  goPreviousStep: () => void;
  submitData: (url: string) => void;
}

/**
 * Candidate Resume
 * @param {CandidateResumeProps} props
 * @returns {JSX.Element} JSX.Element
 */

const CandidateResume: React.FC<CandidateResumeProps> = ({
  goPreviousStep,
  submitData,
}) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Prevent Defaults
    e.preventDefault();
    // If File Not Selected
    if (!selectedFile) {
      return;
    }
    try {
      // Start Loading
      setIsLoading(true);
      // Upload The File
      const url = await uploadPDFService(selectedFile);
      if (url) {
        submitData(url);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => void onSubmit(e)}
      className="flex w-full flex-col gap-8 py-2"
    >
      <h1 className="font-bold">Please provide your resume:</h1>
      {/* Inputs */}
      <div className="space-y-4">
        {/* Resume */}
        <div className="form-control w-full">
          <label htmlFor="pdf" className="pb-2 font-semibold">
            Select your resume:
          </label>
          <input
            className="file-input-bordered file-input-primary file-input w-full"
            id="pdf"
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setSelectedFile(e.target.files[0]);
              }
            }}
          />
          <label className="label">
            {error && (
              <span className="label-text-alt text-error">
                Somthing went wrong!
              </span>
            )}
          </label>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex justify-between">
        {/* Previous btn */}
        <button
          className="btn-outline btn-primary btn-sm btn"
          onClick={goPreviousStep}
        >
          Previous
        </button>
        {/* Upload btn */}
        <button
          type="submit"
          className="btn-primary btn-sm btn space-x-2"
          disabled={!selectedFile}
        >
          <span>Upload</span>
          {isLoading && <Spinner size="sm" />}
        </button>
      </div>
    </form>
  );
};

export default CandidateResume;
