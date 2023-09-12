import type { Job, Recruter, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface JobDetailsProps {
  job: Job & { recruter: Recruter & { user: User } };
}

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  return (
    <>
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id={`job-details${job.id}`}
        className="modal-toggle"
      />
      <label
        htmlFor={`job-details${job.id}`}
        className="modal cursor-pointer p-0"
      >
        <label className="modal-box relative p-0" htmlFor="">
          <div className="rounded-box flex-grow bg-base-300 p-4">
            <div className="flex justify-between">
              <div className="flex items-center justify-start gap-3">
                <Image
                  className="rounded-full"
                  src={job.recruter.user.image as string}
                  alt="user"
                  width={50}
                  height={50}
                />
                <Link href={`/admin/recruiter/${job.recruter.id}`}>
                  {job.recruter.isOrganization === true ? (
                    <h2 className="card-title text-primary">
                      {job.recruter.orgName}
                    </h2>
                  ) : (
                    <h2 className="card-title text-primary">
                      {job.recruter.fullName}
                    </h2>
                  )}
                </Link>
              </div>
              <p className="mr-1 flex items-center justify-end text-slate-500">
                {job?.createdAt.toLocaleString()}
              </p>
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
                    <p> {job.title}</p>
                  </div>
                  {/* Location */}
                  <div className="flex items-center space-x-3">
                    <h2 className="card-title">Location :</h2>
                    <p>{job.location}</p>
                  </div>
                  {/* job type */}
                  <div className="flex items-center space-x-3">
                    <h2 className="card-title">job type :</h2>
                    <p>{job.type} job</p>
                  </div>
                  {/* salary */}
                  <div className="flex items-center space-x-3">
                    <h2 className="card-title">salary :</h2>
                    <p>{job.salary}</p>
                  </div>
                  {/* Hours of work */}
                  <div className="flex items-center space-x-3">
                    <h2 className="card-title">Hours of work :</h2>
                    <p>{job.hoursofwork}</p>
                  </div>
                  {/* years of Experience */}
                  <div className="flex items-center space-x-3">
                    <h2 className="card-title">years of Experience :</h2>
                    <p>{job.yearsOfExperience}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="container">
              <h1 className="card-title"> About the job :</h1>
              <p>{job.description}</p>
            </div>
          </div>
        </label>
      </label>
    </>
  );
};

export default JobDetails;
