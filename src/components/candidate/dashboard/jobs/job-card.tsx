import type { Job } from "@prisma/client";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Spinner } from "~/components/ui";
import { api } from "~/utils/api";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { data: recruter } = api.recruter.getRecruterById.useQuery({
    id: job.recruterId,
  });
  if (!recruter) {
    return <Spinner />;
  }

  return (
    <>
      <div className="card w-full border border-primary bg-base-200 shadow-md">
        <div className="card-body gap-5">
          <div className="flex items-center justify-start gap-3">
            <Image
              className="rounded-full"
              src={recruter?.user?.image as string}
              alt="user"
              width={50}
              height={50}
            />
            <div>
              <Link
                href={`/recruter/profile/${recruter?.user.id}`}
                className="card-title"
              >
                {recruter?.user.name}
              </Link>
              <p>is looking for</p>
            </div>
            <p className="mr-1 flex items-center justify-end text-slate-500">
              {job?.createdAt.toLocaleString()}
            </p>
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                <div className="rounded-full ">
                  <MoreVertical />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
              >
                <li>
                  <a>Report User</a>
                </li>
              </ul>
            </div>
          </div>
          <h2 className="card-title font-bold text-primary">{job.title}</h2>
          <p>
            <span className="rounded-full border-2 border-primary px-2 py-1">
              Location: {job.location}
            </span>
            <span className="mx-3 rounded-full border-2 border-primary px-2 py-1">
              Hours of work: {job.hoursofwork}
            </span>
            <span className="rounded-full border-2 border-primary px-2 py-1">
              Salary: {job.salary}
            </span>
          </p>
          <div className="card-actions justify-end">
            <Link
              href={`/candidate/job/${job.id}`}
              className="btn-primary btn-sm btn"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;
