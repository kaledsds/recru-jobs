import { Trash2 } from "lucide-react";
import React from "react";
import { api } from "~/utils/api";

interface DeleteUserProps {
  id: string;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ id }) => {
  const ctx = api.useContext();

  const deleteUser = api.userAdmin.deleteUser.useMutation({
    onSuccess: async () => {
      await ctx.userAdmin.invalidate();
    },
  });

  return (
    <div className="flex justify-center px-4">
      <label
        htmlFor={`delete-condidate${id}`}
        className="flex cursor-pointer items-center justify-center text-red-600"
      >
        <Trash2 />
      </label>
      <input
        type="checkbox"
        id={`delete-condidate${id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Are you sure that you wanna delete this User!
          </h3>
          <p className="pt-4">Once you do all the related data will be wiped</p>
          <p>and you will not be able to retrieve any info from it!</p>
          <div className="modal-action">
            <label
              htmlFor={`delete-condidate${id}`}
              onClick={() => deleteUser.mutate({ userId: id })}
              className="btn-primary btn-sm btn border-red-500 bg-red-500 text-slate-100 hover:border-red-600 hover:bg-red-600"
            >
              Delete!
            </label>
            <label htmlFor={`delete-condidate${id}`} className="btn-sm btn">
              cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
