import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

interface DeleteCandidateProps {
  id: string;
}

const DeleteCandidate: React.FC<DeleteCandidateProps> = ({ id }) => {
  const router = useRouter();

  const deleteCondidate = api.candidateAdmin.deleteCandidate.useMutation({
    onSuccess: async () => {
      await router.push("/admin");
    },
  });

  return (
    <div className="flex justify-between px-4">
      <h1>Or you can delete this entire condidate profile here</h1>
      <label
        htmlFor="delete-condidate"
        className="btn-primary btn-sm btn border-red-500 bg-red-500 hover:border-red-600 hover:bg-red-600"
      >
        delete
      </label>
      <input type="checkbox" id="delete-condidate" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Are you sure that you wanna delete this profile!
          </h3>
          <p className="py-4">
            Once you do you can not retrieve any info from it!
          </p>
          <div className="modal-action">
            <button
              onClick={() => deleteCondidate.mutate({ id: id })}
              className="btn-primary btn-sm btn border-red-500 bg-red-500 hover:border-red-600 hover:bg-red-600"
            >
              Delete!
            </button>
            <label htmlFor="delete-condidate" className="btn-sm btn">
              cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCandidate;
