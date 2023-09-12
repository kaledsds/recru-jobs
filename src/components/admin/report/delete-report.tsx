import { Trash2 } from "lucide-react";
import { api } from "~/utils/api";

interface ReportDeleteProps {
  id: string;
}

const DeleteReport: React.FC<ReportDeleteProps> = ({ id }) => {
  const ctx = api.useContext();
  const deleteReport = api.report.deleteReport.useMutation({
    onSuccess: async () => {
      await ctx.report.invalidate();
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
        <div className="modal-box max-w-[380px]">
          <h3 className="text-lg font-bold">
            Are you sure that you wanna delete it!
          </h3>
          <p className="pt-4">Once you will not be able to retrieve</p>
          <span>any info from it!</span>
          <div className="modal-action">
            <label
              htmlFor={`delete-condidate${id}`}
              onClick={() => deleteReport.mutate({ id: id })}
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

export default DeleteReport;
