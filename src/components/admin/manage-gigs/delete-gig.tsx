import React from "react";
import { api } from "~/utils/api";
// import { api } from "~/utils/api";

interface DeleteGigProps {
  id: string;
}

const DeleteGig: React.FC<DeleteGigProps> = ({ id }) => {
  const ctx = api.useContext();

  const deleteGig = api.gigAdmin.deleteGig.useMutation({
    onSuccess: async () => {
      await ctx.gigAdmin.invalidate();
    },
  });

  return (
    <div className="flex justify-between">
      <label
        htmlFor={`delete-gig-post${id}`}
        className="btn-primary btn-sm btn border-red-500 bg-red-500 text-slate-100 hover:border-red-600 hover:bg-red-600"
      >
        delete
      </label>
      <input
        type="checkbox"
        id={`delete-gig-post${id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Are you sure that you wanna delete this gig post!
          </h3>
          <p className="py-4">
            Once you do you can not retrieve any info from it!
          </p>
          <div className="modal-action">
            <label
              htmlFor={`delete-job-post${id}`}
              onClick={() => deleteGig.mutate({ id: id })}
              className="btn-primary btn-sm btn border-red-500 bg-red-500 text-slate-100 hover:border-red-600 hover:bg-red-600"
            >
              Delete!
            </label>
            <label htmlFor={`delete-gig-post${id}`} className="btn-sm btn">
              cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteGig;
