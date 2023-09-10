import type { Job, Recruter, User } from "@prisma/client";
import Link from "next/link";
import DeleteJob from "./delete-job";
import JobDetails from "./job-details";

interface ManageJobCardProps {
  job: Job & {
    recruter: Recruter & {
      user: User;
    };
  };
}
/**
 * Manage job card.
 */
const ManageJobCard: React.FC<ManageJobCardProps> = ({ job }) => {
  return (
    <div className="w-[350px] rounded-lg border border-primary bg-base-300 p-8">
      {/* Job title */}
      <div className="rounded-lg bg-primary px-12 py-1">
        <h1 className="text-center text-xl font-bold text-slate-100">
          {job.title}
        </h1>
      </div>
      {/* Job infos */}
      <div className="flex flex-col gap-2 py-4">
        {job.recruter.isOrganization === true ? (
          <div className="flex justify-between">
            <span className="text-lg font-semibold">Orgnazation name:</span>
            <Link
              href={`/admin/recruiter/${job.recruter.id}`}
              className="text-lg font-semibold text-primary"
            >
              {job.recruter.orgName}
            </Link>
          </div>
        ) : (
          <div className="flex justify-between">
            <span className="text-lg font-semibold">Full name:</span>
            <Link
              href={`/admin/recruiter/${job.recruter.id}`}
              className="text-lg font-semibold text-primary"
            >
              {job.recruter.fullName}
            </Link>
          </div>
        )}
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
          <span className="text-lg"> {job?.createdAt.toLocaleString()}</span>
        </div>
      </div>
      {/* Job actions */}
      <div className="flex justify-between">
        <JobDetails job={job} />
        <DeleteJob id={job.id} />
      </div>
    </div>
  );
};

export default ManageJobCard;
