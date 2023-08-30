import type { Job } from "@prisma/client";
import { CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { api } from "~/utils/api";

interface GigRecruteProps {
  gigId: string;
  recruterJobs: Job[];
}

const GigRecrute: React.FC<GigRecruteProps> = ({ gigId, recruterJobs }) => {
  // Steps Counter
  const [currentStep, setCurrentStep] = useState<number>(1);
  // Selected Job state
  const [selectedJob, setSelectedJob] = useState<string | number>(0);
  // Error state
  const [error, setError] = useState<boolean>(false);

  // createGigRequest mutation
  const createGigRequest = api.gigRequest.createGigRequest.useMutation({
    onSuccess: () => {
      console.log("success");
      setCurrentStep((prevStep) => prevStep + 1);
    },
    onError: () => {
      setError(true);
    },
  });

  // OnGigRecrute
  const onGigRecrute = () => {
    createGigRequest.mutate({ gigId, jobId: selectedJob as string });
  };

  return (
    <div className="flex justify-between">
      <label
        htmlFor={`delete-job-post${gigId}`}
        className="btn-primary btn-sm btn"
        onClick={() => setCurrentStep(1)}
      >
        Recrute
      </label>
      <input
        type="checkbox"
        id={`delete-job-post${gigId}`}
        className="modal-toggle"
      />
      {currentStep === 1 && (
        <div className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Select a job to assign :</h3>
            {error && (
              <p className="pt-4 text-red-500">
                This job is aleardy assigned to this candiante.
              </p>
            )}
            <div className="py-6">
              <select
                className="select-info select w-full"
                onChange={(e) => {
                  setError(false);
                  setSelectedJob(e.target.value);
                }}
                value={selectedJob}
              >
                <option value={0} disabled>
                  Please click to select!
                </option>
                {recruterJobs.map((job) => (
                  <option value={job.id} key={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button
                onClick={onGigRecrute}
                className="btn-primary btn-sm btn"
                disabled={selectedJob === 0}
              >
                Assign
              </button>
              <label
                htmlFor={`delete-job-post${gigId}`}
                onClick={() => setSelectedJob(0)}
                className="btn-sm btn"
              >
                cancel
              </label>
            </div>
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className="modal">
          <div className="modal-box">
            <h3 className="text-center text-lg font-bold">
              Job assigned successfully!
            </h3>
            <div className="pt-8">
              <CheckCircle className="mx-auto h-20 w-20 text-emerald-500" />
            </div>
            <div className="modal-action">
              <label
                htmlFor={`delete-job-post${gigId}`}
                className="btn-sm btn"
                onClick={() => setSelectedJob(0)}
              >
                Done
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GigRecrute;
