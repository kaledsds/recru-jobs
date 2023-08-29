import type { Job } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";

interface JobCardTwoProps {
  job: Job;
}

const JobCardTwo: React.FC<JobCardTwoProps> = ({ job }) => {
  const { data: recruter } = api.recruter.getRecruterById.useQuery({
    id: job.recruterId,
  });

  return (
    <>
      {" "}
      <div className="card w-full border border-primary bg-base-200 shadow-md">
        <div className="card-body gap-5">
          <div className="flex items-center justify-start gap-3">
            <Image
              className="rounded-full"
              src={recruter?.user.image || "/images/user.png"}
              alt="user"
              width={50}
              height={50}
            />
            <div>
              <h2 className="card-title">{recruter?.user.name}</h2>
              <p>is looking for</p>
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
        </div>
      </div>
    </>
  );
};

export default JobCardTwo;
