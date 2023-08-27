import type { Job } from "@prisma/client";
import DeleteJob from "./delete-job";
import Link from "next/link";

interface ManageJobCardProps {
  job: Job;
}
/**
 * Manage job card.
 */
const ManageJobCard: React.FC<ManageJobCardProps> = ({ job }) => {
  return (
    <div className="h-[275px] w-[350px] rounded-lg border border-primary bg-base-300 p-8">
      {/* Job title */}
      <div className="rounded-lg bg-primary px-12 py-1">
        <h1 className="text-center text-xl font-bold text-slate-100">
          {job.title}
        </h1>
      </div>
      {/* Job infos */}
      <div className="flex flex-col gap-2 py-4">
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Hours of work:</span>
          <span className="text-lg">{job.hoursofwork}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Salary:</span>
          <span className="text-lg">{job.salary}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Posted at:</span>
          <span className="text-lg">date</span>
        </div>
      </div>
      {/* Job actions */}
      <div className="flex justify-center gap-24 py-2">
        {/* <button className="btn-sm btn border-red-500 bg-red-500 text-slate-100 hover:border-red-600 hover:bg-red-600">
          Delete
        </button> */}
        <DeleteJob id={job.id} />
        <Link
          href={`/recruter/manage-jobs/edit/${job.id}`}
          className="btn-primary btn-sm btn text-slate-100"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ManageJobCard;
