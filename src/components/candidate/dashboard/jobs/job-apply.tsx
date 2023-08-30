import { api } from "~/utils/api";

interface JobApplyProps {
  jobId: string;
}

const JobApply: React.FC<JobApplyProps> = ({ jobId }) => {
  const ctx = api.useContext();
  const { data: checkRequest } = api.jobRequest.checkRequest.useQuery({
    jobId: jobId,
  });
  const sendJobRequest = api.jobRequest.createJobRequest.useMutation({
    onSuccess: async () => {
      await ctx.jobRequest.invalidate();
    },
  });

  if (checkRequest === true) {
    return (
      <button
        onClick={() => {
          sendJobRequest.mutate({
            id: jobId,
          });
        }}
        className="btn-primary btn-sm btn"
      >
        Apply
      </button>
    );
  }
  return (
    <span className="btn-sm flex items-center justify-center rounded-lg border border-success p-2 pb-3 text-success">
      Applayed
    </span>
  );
};

export default JobApply;
