import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

// Delete condidate profile
const DeleteCondidate = () => {
  // Use router to redirect to another page
  const goto = useRouter();
  // Delete condidate profile mutation
  const deleteCondidateProfile = api.candidate.deleteCandidate.useMutation({
    onSuccess: () => void goto.push("/candidate"),
  });
  return (
    <div className="flex justify-between px-4">
      <h1>Or you can delete your entire condidate profile here</h1>
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
            Are you sure that you wanna delete your profile!
          </h3>
          <p className="py-4">
            Once you do you can not retrieve any info from it!
          </p>
          <div className="modal-action">
            <button
              onClick={() => deleteCondidateProfile.mutate()}
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

export default DeleteCondidate;
