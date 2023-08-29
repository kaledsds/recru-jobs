import type { Job } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";

interface JobCardDetailsProps {
  job: Job;
}

const JobDetails: React.FC<JobCardDetailsProps> = ({ job }) => {
  const { data: session } = useSession();
  const { data: recruter } = api.recruter.getRecruterById.useQuery({
    id: job.recruterId,
  });

  return (
    <>
      <div className="rounded-box flex-grow border border-primary bg-base-300 p-4">
        <div className="flex justify-between">
          <div className="flex items-center justify-start gap-3">
            <Image
              className="rounded-full"
              src={recruter?.user?.image || "/images/user.png"}
              alt="user"
              width={50}
              height={50}
            />
            <div>
              <h2 className="card-title">{recruter?.user.name}</h2>
            </div>
          </div>
          <p className="mr-1 flex items-center justify-end text-slate-500">
            {job?.createdAt.toLocaleString()}
          </p>
          <Link
            href="/candidate"
            className="btn-circle btn border-0 bg-transparent text-slate-500 hover:bg-base-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>
        <div className="divider"></div>
        <div className="container">
          <h1 className="rounded-lg bg-primary py-2 text-center text-xl font-bold text-slate-100">
            Job Details
          </h1>
          <div className="divider"></div>
          <div className="flex flex-col items-center space-y-5">
            <div className="flex flex-col items-start">
              {/* job title */}
              <div className="flex items-center space-x-3">
                <h2 className="card-title">Job title :</h2>
                <p> {job?.title}</p>
              </div>
              {/* Location */}
              <div className="flex items-center space-x-3">
                <h2 className="card-title">Location :</h2>
                <p>{job?.location}</p>
              </div>
              {/* job type */}
              <div className="flex items-center space-x-3">
                <h2 className="card-title">job type :</h2>
                <p>{job?.type} job</p>
              </div>
              {/* salary */}
              <div className="flex items-center space-x-3">
                <h2 className="card-title">salary :</h2>
                <p>{job?.salary}</p>
              </div>
              {/* years of Experience */}
              <div className="flex items-center space-x-3">
                <h2 className="card-title">years of Experience :</h2>
                <p>{job?.yearsOfExperience}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>
        <div className="container">
          <h1 className="card-title"> About the job :</h1>
          <p>{job.description}</p>
        </div>
        <div className="card-actions justify-end">
          {recruter?.user.id !== session?.user.id && job?.id && (
            <h1>Apply</h1>
            // <JobApply jobId={job.id} />
          )}
        </div>
      </div>
    </>
  );
};

export default JobDetails;
