import React from "react";
import { api } from "~/utils/api";

interface DeleteJobProps {
  id: string;
}

const DeleteJob: React.FC<DeleteJobProps> = ({ id }) => {
  const ctx = api.useContext();

  const deleteJob = api.job.deleteJob.useMutation({
    onSuccess: async () => {
      await ctx.job.invalidate();
    },
  });

  return (
    <div className="flex justify-between px-4">
      <label
        htmlFor="delete-condidate"
        className="btn-primary btn-sm btn border-red-500 bg-red-500 text-slate-100 hover:border-red-600 hover:bg-red-600"
      >
        delete
      </label>
      <input type="checkbox" id="delete-condidate" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Are you sure that you wanna delete this job post!
          </h3>
          <p className="py-4">
            Once you do you can not retrieve any info from it!
          </p>
          <div className="modal-action">
            <label
              htmlFor="delete-condidate"
              onClick={() => deleteJob.mutate({ id })}
              className="btn-primary btn-sm btn border-red-500 bg-red-500 text-slate-100 hover:border-red-600 hover:bg-red-600"
            >
              Delete!
            </label>
            <label htmlFor="delete-condidate" className="btn-sm btn">
              cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteJob;
