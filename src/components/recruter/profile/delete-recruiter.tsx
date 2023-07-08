import { useRouter } from "next/router";
import { api } from "~/utils/api";

const DeleteRecruiter = () => {
  //User router to redirect to another page
  const goto = useRouter();
  // Delete recruiter profile mutation
  const deleteRecruiterProfile = api.recruter.deleteRecruiter.useMutation({
    onSuccess: () => void goto.push("/recruter"),
  });

  return (
    <div className="flex justify-between px-4">
      <h1>Or you can delete your entire recruiter profile here</h1>
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
              onClick={() => deleteRecruiterProfile.mutate()}
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

export default DeleteRecruiter;
